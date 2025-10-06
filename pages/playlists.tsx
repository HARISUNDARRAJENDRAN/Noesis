import { ChangeEvent, FormEvent, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { AppLayout } from "../components/app/AppLayout";
import { ProtectedRoute } from "../components/app/ProtectedRoute";
import { PlaylistCard } from "../components/app/PlaylistCard";
import { mockPlaylists } from "../lib/mock-data";
import styles from "../styles/Playlists.module.css";

type CreatePlaylistFormState = {
  title: string;
  theme: string;
  description: string;
};

const initialFormState: CreatePlaylistFormState = {
  title: "",
  theme: "",
  description: "",
};

const PlaylistsPage: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState<CreatePlaylistFormState>(initialFormState);
  const [submitting, setSubmitting] = useState(false);

  const openModal = () => {
    setFormState(initialFormState);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (submitting) return;
    setModalOpen(false);
  };

  const handleChange = (field: keyof CreatePlaylistFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    console.info("Create playlist", formState);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setSubmitting(false);
    setModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Noesis — My Playlists</title>
        <meta name="description" content="Manage your Noesis playlists and assemble new cinematic learning journeys." />
      </Head>

      <ProtectedRoute>
        <AppLayout>
          <div className={styles.page}>
            <header className={styles.header}>
              <div className={styles.titleGroup}>
                <h1 className={styles.title}>My Playlists</h1>
                <p className={styles.subtitle}>Curate modular journeys that match your creative and professional flow.</p>
              </div>
              <button type="button" className={styles.createButton} onClick={openModal}>
                + Create Playlist
              </button>
            </header>

            <div className={styles.grid}>
              <button type="button" className={styles.createCard} onClick={openModal}>
                <span className={styles.createIcon}>＋</span>
                <span>Start a new cinematic journey</span>
              </button>
              {mockPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist.playlistId}
                  title={playlist.title}
                  thumbnail={playlist.thumbnail}
                  description={playlist.description}
                  videoCount={playlist.videoCount}
                  progress={playlist.progress}
                />
              ))}
            </div>
          </div>
        </AppLayout>
      </ProtectedRoute>

      {modalOpen ? (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="create-playlist-title">
          <div className={styles.modal}>
            <h2 className={styles.modalTitle} id="create-playlist-title">
              Create new playlist
            </h2>
            <form className={styles.modalForm} onSubmit={handleSubmit}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="playlist-title">
                  Title
                </label>
                <input
                  id="playlist-title"
                  className={styles.input}
                  type="text"
                  value={formState.title}
                  onChange={handleChange("title")}
                  required
                  autoFocus
                  disabled={submitting}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="playlist-theme">
                  Theme or intent
                </label>
                <input
                  id="playlist-theme"
                  className={styles.input}
                  type="text"
                  value={formState.theme}
                  onChange={handleChange("theme")}
                  placeholder="e.g. Venture storytelling, AI for product teams"
                  disabled={submitting}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="playlist-description">
                  Description
                </label>
                <textarea
                  id="playlist-description"
                  className={styles.textarea}
                  value={formState.description}
                  onChange={handleChange("description")}
                  placeholder="Outline the arc of this playlist so collaborators know why it matters."
                  disabled={submitting}
                />
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryButton} onClick={closeModal} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryButton} disabled={submitting || formState.title.trim() === ""}>
                  {submitting ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PlaylistsPage;
