import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import { AuthShell } from "../components/auth/AuthShell";
import { SignUpForm } from "../components/auth/forms/SignUpForm";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockDelay = (duration = 1400) => new Promise((resolve) => setTimeout(resolve, duration));

  const handleSubmit = async (payload: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError(null);
    await mockDelay();
    console.info("Sign up submitted", payload);
    setLoading(false);
    router.push({ pathname: "/confirm", query: { email: payload.email } });
  };

  const handleSocial = async () => {
    setLoading(true);
    await mockDelay(900);
    console.info("Google sign up selected");
    setLoading(false);
  };

  const handleShowSignIn = () => {
    router.push("/login");
  };

  return (
    <>
      <Head>
        <title>Noesis — Create your account</title>
        <meta name="description" content="Create your Noesis account to unlock immersive learning." />
      </Head>

      <AuthShell eyebrow="Learning in Motion" title="Create your account" subtitle="Craft a profile that grows smarter with every session.">
        <SignUpForm
          onSubmit={handleSubmit}
          onShowSignIn={handleShowSignIn}
          onSocialSignUp={() => handleSocial()}
          loading={loading}
          error={error}
        />
      </AuthShell>
    </>
  );
};

export default RegisterPage;
