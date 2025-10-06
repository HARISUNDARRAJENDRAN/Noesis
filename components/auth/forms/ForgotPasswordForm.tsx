import { FormEvent, useState } from "react";
import type { ReactElement } from "react";
import styles from "../../../styles/Auth.module.css";

type ForgotPasswordFormProps = {
  onSubmit: (payload: { email: string }) => void;
  onBackToSignIn: () => void;
  loading?: boolean;
  error?: string | null;
  message?: string | null;
};

export function ForgotPasswordForm({
  onSubmit,
  onBackToSignIn,
  loading = false,
  error = null,
  message = null,
}: ForgotPasswordFormProps): ReactElement {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email: email.trim() });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="forgot-email">
          Email
        </label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          required
          className={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />
      </div>

      {error ? <div className={styles.errorMessage}>{error}</div> : null}
      {message ? <div className={styles.successMessage}>{message}</div> : null}

      <button type="submit" className={styles.primaryButton} disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <div className={styles.formFooter}>
        <button type="button" className={styles.linkButton} onClick={onBackToSignIn}>
          Back to Sign In
        </button>
      </div>
    </form>
  );
}
