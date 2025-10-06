import { useState, FormEvent } from "react";
import type { ReactElement } from "react";
import styles from "../../../styles/Auth.module.css";

type SignInFormProps = {
  onSubmit: (payload: { email: string; password: string }) => void;
  onForgotPassword: () => void;
  onShowSignUp: () => void;
  onSocialSignIn: (provider: "google") => void;
  loading?: boolean;
  error?: string | null;
};

export function SignInForm({
  onSubmit,
  onForgotPassword,
  onShowSignUp,
  onSocialSignIn,
  loading = false,
  error = null,
}: SignInFormProps): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email: email.trim(), password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.socialButtons}>
        <button
          type="button"
          className={styles.socialButton}
          onClick={() => onSocialSignIn("google")}
          disabled={loading}
        >
          Continue with Google
        </button>
      </div>

      <div className={styles.divider}>or sign in with email</div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signin-email">
          Email
        </label>
        <input
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signin-password">
          Password
        </label>
        <input
          id="signin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
        />
      </div>

      {error ? <div className={styles.errorMessage}>{error}</div> : null}

      <button type="submit" className={styles.primaryButton} disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className={styles.formFooter}>
        <button type="button" className={styles.linkButton} onClick={onForgotPassword}>
          Forgot password?
        </button>
        <button type="button" className={styles.linkButton} onClick={onShowSignUp}>
          Don&apos;t have an account? Sign Up
        </button>
      </div>
    </form>
  );
}
