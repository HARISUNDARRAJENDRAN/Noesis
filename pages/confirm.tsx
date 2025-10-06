import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import { AuthShell } from "../components/auth/AuthShell";
import { ConfirmEmailForm } from "../components/auth/forms/ConfirmEmailForm";

const ConfirmEmailPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const emailFromQuery = typeof router.query.email === "string" ? router.query.email : "";

  const mockDelay = (duration = 1200) => new Promise((resolve) => setTimeout(resolve, duration));

  const handleSubmit = async (payload: { email: string; code: string }) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    await mockDelay();
    console.info("Email confirmation submitted", payload);
    setLoading(false);
    setMessage("Email confirmed successfully. You can now sign in.");
  };

  const handleResend = async (email: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    await mockDelay(900);
    console.info("Resend confirmation code triggered", email);
    setLoading(false);
    setMessage(`A new code has been sent to ${email}.`);
  };

  const handleShowSignIn = () => {
    router.push({ pathname: "/login", query: { email: emailFromQuery } });
  };

  return (
    <>
      <Head>
        <title>Noesis — Confirm your email</title>
        <meta name="description" content="Confirm your email to activate your Noesis account." />
      </Head>

      <AuthShell eyebrow="One Step Away" title="Confirm your email" subtitle="Enter the code we just sent to your inbox to activate your account.">
        <ConfirmEmailForm
          onSubmit={handleSubmit}
          onResendCode={handleResend}
          onShowSignIn={handleShowSignIn}
          loading={loading}
          error={error}
          initialEmail={emailFromQuery}
          message={message}
        />
      </AuthShell>
    </>
  );
};

export default ConfirmEmailPage;
