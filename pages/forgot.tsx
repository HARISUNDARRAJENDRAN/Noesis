import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import { AuthShell } from "../components/auth/AuthShell";
import { ForgotPasswordForm } from "../components/auth/forms/ForgotPasswordForm";

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const mockDelay = (duration = 1200) => new Promise((resolve) => setTimeout(resolve, duration));

  const handleSubmit = async (payload: { email: string }) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    if (!payload.email) {
      setLoading(false);
      setError("Please enter your email address.");
      return;
    }
    await mockDelay();
    console.info("Forgot password submitted", payload);
    setLoading(false);
    setMessage(`If an account exists for ${payload.email}, a reset link has been sent.`);
  };

  const handleBackToSignIn = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Noesis — Reset your password</title>
        <meta name="description" content="Reset your Noesis password to get back on track." />
      </Head>

      <AuthShell eyebrow="Security First" title="Reset your password" subtitle="We'll email you a secure link to set a new password.">
        <ForgotPasswordForm
          onSubmit={handleSubmit}
          onBackToSignIn={handleBackToSignIn}
          loading={loading}
          error={error}
          message={message}
        />
      </AuthShell>
    </>
  );
};

export default ForgotPasswordPage;
