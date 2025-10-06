import { useRef } from "react";
import type { ReactElement, ReactNode } from "react";
import styles from "../../styles/Carousel.module.css";

type CarouselProps<TItem> = {
  title: string;
  eyebrow?: string;
  items: TItem[];
  renderItem: (item: TItem, index: number) => ReactElement;
  action?: ReactNode;
  id?: string;
};

export function Carousel<TItem>({
  title,
  eyebrow,
  items,
  renderItem,
  action,
  id,
}: CarouselProps<TItem>): ReactElement {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: "prev" | "next") => {
    const container = listRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    const nextPosition = direction === "next" ? container.scrollLeft + scrollAmount : container.scrollLeft - scrollAmount;
    container.scrollTo({ left: nextPosition, behavior: "smooth" });
  };

  return (
    <section className={styles.carousel} aria-labelledby={id}>
      <div className={styles.header}>
        <div className={styles.headingGroup}>
          {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          <h2 id={id} className={styles.title}>
            {title}
          </h2>
        </div>
        <div className={styles.actions}>
          {action}
          <div className={styles.scrollers}>
            <button type="button" className={styles.scrollButton} onClick={() => scrollBy("prev")} aria-label="Scroll back">
              ‹
            </button>
            <button type="button" className={styles.scrollButton} onClick={() => scrollBy("next")} aria-label="Scroll forward">
              ›
            </button>
          </div>
        </div>
      </div>

      <div className={styles.track} ref={listRef}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </section>
  );
}
