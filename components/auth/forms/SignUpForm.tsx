import { FormEvent, useState } from "react";
import type { ReactElement } from "react";
import styles from "../../../styles/Auth.module.css";

type SignUpFormProps = {
  onSubmit: (payload: { name: string; email: string; password: string }) => void;
  onShowSignIn: () => void;
  onSocialSignUp: (provider: "google") => void;
  loading?: boolean;
  error?: string | null;
};

export function SignUpForm({
  onSubmit,
  onShowSignIn,
  onSocialSignUp,
  loading = false,
  error = null,
}: SignUpFormProps): ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    onSubmit({ name: name.trim(), email: email.trim(), password });
  };

  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.socialButtons}>
        <button
          type="button"
          className={styles.socialButton}
          onClick={() => onSocialSignUp("google")}
          disabled={loading}
        >
          Continue with Google
        </button>
      </div>

      <div className={styles.divider}>or create with email</div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signup-name">
          Full Name
        </label>
        <input
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signup-email">
          Email
        </label>
        <input
          id="signup-email"
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
        <label className={styles.fieldLabel} htmlFor="signup-password">
          Password
        </label>
        <input
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={styles.input}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="signup-confirm-password">
          Confirm Password
        </label>
        <input
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className={styles.input}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          disabled={loading}
        />
      </div>

      {passwordsMismatch ? <div className={styles.errorMessage}>Passwords do not match.</div> : null}
      {error ? <div className={styles.errorMessage}>{error}</div> : null}

      <button type="submit" className={styles.primaryButton} disabled={loading || passwordsMismatch}>
        {loading ? "Creating..." : "Create Account"}
      </button>

      <div className={styles.formFooter}>
        <span>Already with Noesis?</span>
        <button type="button" className={styles.linkButton} onClick={onShowSignIn}>
          Sign In
        </button>
      </div>
    </form>
  );
}
