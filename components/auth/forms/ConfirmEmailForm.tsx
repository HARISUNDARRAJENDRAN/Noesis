import { FormEvent, useState } from "react";
import type { ReactElement } from "react";
import styles from "../../../styles/Auth.module.css";

type ConfirmEmailFormProps = {
  onSubmit: (payload: { email: string; code: string }) => void;
  onResendCode: (email: string) => void;
  onShowSignIn: () => void;
  loading?: boolean;
  error?: string | null;
  initialEmail?: string;
  message?: string | null;
};

export function ConfirmEmailForm({
  onSubmit,
  onResendCode,
  onShowSignIn,
  loading = false,
  error = null,
  initialEmail = "",
  message = null,
}: ConfirmEmailFormProps): ReactElement {
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email: email.trim(), code: code.trim() });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="confirm-email">
          Email
        </label>
        <input
          id="confirm-email"
          name="email"
          type="email"
          required
          className={styles.input}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={loading}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel} htmlFor="confirm-code">
          Verification Code
        </label>
        <input
          id="confirm-code"
          name="code"
          type="text"
          inputMode="numeric"
          required
          className={styles.input}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          disabled={loading}
        />
      </div>

      {error ? <div className={styles.errorMessage}>{error}</div> : null}
      {message ? <div className={styles.successMessage}>{message}</div> : null}

      <button type="submit" className={styles.primaryButton} disabled={loading}>
        {loading ? "Confirming..." : "Confirm Email"}
      </button>

      <div className={styles.formFooter}>
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => onResendCode(email.trim())}
          disabled={loading || email.trim() === ""}
        >
          Resend code
        </button>
        <button type="button" className={styles.linkButton} onClick={onShowSignIn}>
          Return to Sign In
        </button>
      </div>
    </form>
  );
}
