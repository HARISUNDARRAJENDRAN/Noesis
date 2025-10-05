import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactElement } from "react";
import styles from "../../styles/AboutPage.module.css";

interface FeatureStep {
  id: string;
  title: string;
  description: string;
  render: (isActive: boolean) => ReactElement;
}

export function InteractiveDemo(): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const features: FeatureStep[] = useMemo(
    () => [
      {
        id: "ai",
        title: "AI-Powered Learning",
        description:
          "Transform any topic into structured learning paths with AI-generated playlists, mind maps, and personalized recommendations.",
        render: (isActive) => <AiLearningMock key="ai-feature" active={isActive} />,
      },
      {
        id: "chat",
        title: "Ask Anything, Instantly",
        description:
          "Drop into any moment and ask our retrieval-augmented chatbot for clarity. Noesis surfaces precise answers grounded in the video context.",
        render: (isActive) => <ChatbotMock key="chat-feature" active={isActive} />,
      },
      {
        id: "map",
        title: "See the Big Picture",
        description:
          "Watch concepts resolve into a living mind map. Connections, branches, and supporting evidence expand in real time as you explore.",
        render: (isActive) => <MindMapMock key="map-feature" active={isActive} />,
      },
      {
        id: "analytics",
        title: "Progress Analytics",
        description:
          "Track your learning journey with detailed analytics, completion rates, and personalized insights.",
        render: (isActive) => <AnalyticsMock key="analytics-feature" active={isActive} />,
      },
      {
        id: "collaboration",
        title: "Collaborative Workspace",
        description:
          "Share highlights, align with peers, and keep collective momentum with synced notes and action items.",
        render: (isActive) => <CollaborationMock key="collab-feature" active={isActive} />,
      },
    ],
    []
  );

  return (
    <section className={styles.solutionSection}>
      <div className={styles.solutionInner}>
        <div className={styles.mockColumn}>
          <VideoMockup activeId={features[activeIndex]?.id ?? ""}>{features[activeIndex]?.render(true)}</VideoMockup>
        </div>
        <div className={styles.stepsColumn}>
          {features.map((feature, index) => (
            <FeatureNarrative
              key={feature.id}
              index={index}
              title={feature.title}
              description={feature.description}
              onActivate={() => setActiveIndex(index)}
              isActive={activeIndex === index}
              isPast={activeIndex > index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureNarrativeProps {
  index: number;
  title: string;
  description: string;
  onActivate: () => void;
  isActive: boolean;
  isPast: boolean;
}

function FeatureNarrative({
  index,
  title,
  description,
  onActivate,
  isActive,
  isPast,
}: FeatureNarrativeProps): ReactElement {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) {
      onActivate();
    }
  }, [inView, onActivate]);

  return (
    <div ref={ref} className={styles.featureWrapper}>
      <motion.article
        className={styles.featureCard}
        initial={{ opacity: 0, y: 48, scale: 0.94 }}
        animate={{
          opacity: isActive ? 1 : isPast ? 0.55 : inView ? 0.7 : 0.4,
          y: isActive ? 0 : isPast ? -24 : 24,
          scale: isActive ? 1 : isPast ? 0.95 : 0.97,
          boxShadow: isActive
            ? "0 36px 72px rgba(15, 23, 42, 0.22)"
            : "0 22px 52px rgba(15, 23, 42, 0.15)",
          borderColor: isActive ? "rgba(15, 23, 42, 0.12)" : "rgba(148, 163, 184, 0.18)",
        }}
        transition={{ duration: 0.55, ease: [0.2, 0.7, 0.4, 1] }}
        style={{ zIndex: 30 - index }}
      >
        <div className={styles.featureHeading}>
          <span className={styles.featureBadge}>{index + 1}</span>
          <div className={styles.featureTextGroup}>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDescription}>{description}</p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

interface VideoMockupProps {
  children: ReactElement | undefined;
  activeId: string;
}

function VideoMockup({ children, activeId }: VideoMockupProps): ReactElement {
  return (
    <div className={styles.videoMockup}>
      <div className={styles.videoFrame}>
        <div className={styles.videoHeader}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.videoBody}>
          <div className={styles.videoEmpty} aria-hidden />
          <div className={styles.videoOverlay}>
            <div className={styles.videoTimeline}>
              <div className={styles.videoProgress} />
            </div>
            <div className={styles.videoControls}>
              <div className={styles.controlLeft}>
                <span className={styles.playPill} />
                <div className={styles.controlInfo}>
                  <span />
                  <span />
                </div>
              </div>
              <span className={styles.controlTime} />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {children ? (
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.2, 0.7, 0.4, 1] }}
            className={styles.featureOverlay}
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

interface ChatbotMockProps {
  active: boolean;
}

function ChatbotMock({ active }: ChatbotMockProps): ReactElement {
  const question = "What were the key arguments against this proposal?";
  const [typedQuestion, setTypedQuestion] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (!active) {
      setTypedQuestion("");
      setShowAnswer(false);
      return;
    }

    let frame = 0;
    const total = question.length;

    const frameTyping = () => {
      frame += 1;
      const nextLength = Math.min(total, Math.round(frame / 2));
      setTypedQuestion(question.slice(0, nextLength));

      if (nextLength < total) {
        animationRef = requestAnimationFrame(frameTyping);
      } else {
        setTimeout(() => setShowAnswer(true), 450);
      }
    };

    let animationRef = requestAnimationFrame(frameTyping);

    return () => {
      cancelAnimationFrame(animationRef);
    };
  }, [active, question]);

  return (
    <motion.div
      className={styles.chatMock}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.2, 0.6, 0.4, 1] }}
    >
      <div className={styles.chatHeader}>Ask Anything, Instantly</div>
      <div className={styles.chatBubbleUser}>
        <span className={styles.chatAvatar} aria-hidden />
        <p>{typedQuestion}</p>
        <span className={styles.cursor} aria-hidden />
      </div>
      <motion.div
        className={styles.chatBubbleBot}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: showAnswer ? 1 : 0, y: showAnswer ? 0 : 18 }}
        transition={{ duration: 0.5, ease: [0.2, 0.6, 0.4, 1], delay: 0.1 }}
      >
        <span className={styles.chatAvatarBot} aria-hidden />
        <p>
          Noesis surfaces the three dominant rebuttals: cost overruns, the missing pilot data, and the environmental risk
          flagged by the independent review panel.
        </p>
      </motion.div>
    </motion.div>
  );
}

interface MindMapMockProps {
  active: boolean;
}

function MindMapMock({ active }: MindMapMockProps): ReactElement {
  return (
    <motion.div
      className={styles.mindMapMock}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.17, 0.55, 0.55, 1] }}
    >
      <div className={styles.placeholderFrame}>
        <span className={styles.placeholderBadge} aria-hidden />
        <div className={styles.placeholderCopy}>
          <strong>Mind map preview</strong>
          <p>The interactive network will appear here.</p>
        </div>
      </div>
    </motion.div>
  );
}

interface AiLearningMockProps {
  active: boolean;
}

function AiLearningMock({ active }: AiLearningMockProps): ReactElement {
  return (
    <motion.div
      className={styles.aiMock}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 18 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.4, 1] }}
    >
      <header className={styles.aiMockHeader}>
        <span className={styles.aiMockBadge} aria-hidden />
        <div>
          <h4>Create a custom path</h4>
          <p>Noesis analyses your goal, prerequisites, and time horizon to suggest a tailored route.</p>
        </div>
      </header>
      <div className={styles.aiMockGrid}>
        <div>
          <strong>Playlist</strong>
          <span>8 chapter journey</span>
        </div>
        <div>
          <strong>Mind Map</strong>
          <span>Key themes connected</span>
        </div>
        <div>
          <strong>Recommendations</strong>
          <span>Refined as you progress</span>
        </div>
      </div>
    </motion.div>
  );
}

interface AnalyticsMockProps {
  active: boolean;
}

function AnalyticsMock({ active }: AnalyticsMockProps): ReactElement {
  const metrics = [
    { label: "Completion rate", value: "82%" },
    { label: "Active streak", value: "7 days" },
    { label: "Focus minutes", value: "128" },
  ];

  return (
    <motion.div
      className={styles.analyticsMock}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 16 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.17, 0.55, 0.55, 1] }}
    >
      <header className={styles.analyticsHeader}>
        <span className={styles.analyticsBadge} aria-hidden />
        <div>
          <h4>Progress Analytics</h4>
          <p>Understand pace, retention, and energy so each climb compounds.</p>
        </div>
      </header>
      <div className={styles.analyticsGrid}>
        {metrics.map((metric) => (
          <motion.div
            key={metric.label}
            className={styles.analyticsCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0.2, y: active ? 0 : 10 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.4, 1] }}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

interface CollaborationMockProps {
  active: boolean;
}

function CollaborationMock({ active }: CollaborationMockProps): ReactElement {
  const agendaItems = [
    { label: "Topic", value: "Policy debate wrap-up" },
    { label: "Highlights", value: "Cost concerns, missing pilot data" },
    { label: "Next steps", value: "Draft mitigation memo" },
  ];

  return (
    <motion.div
      className={styles.collabMock}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 18 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.4, 1] }}
    >
      <header className={styles.collabHeader}>
        <div>
          <h4>Shared Space</h4>
          <p>Hand off context and decisions without replaying the entire session.</p>
        </div>
        <span className={styles.collabBadge} aria-hidden />
      </header>
      <div className={styles.collabChecklist}>
        {agendaItems.map((item) => (
          <div key={item.label} className={styles.collabItem}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <footer className={styles.collabFooter}>
        <div className={styles.collabAvatars} aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <em>Auto-syncs with your team’s workspace.</em>
      </footer>
    </motion.div>
  );
}
