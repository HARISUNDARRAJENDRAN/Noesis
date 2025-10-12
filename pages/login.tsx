import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { NextPage } from "next";
import { AuthShell } from "../components/auth/AuthShell";
import { SignInForm } from "../components/auth/forms/SignInForm";
import { useAuth } from "../context/AuthContext";

const SignInPage: NextPage = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockDelay = (duration = 1200) => new Promise((resolve) => setTimeout(resolve, duration));

  const handleSubmit = async (payload: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    await mockDelay();
    console.info("Sign in submitted", payload);
    signIn();
    setLoading(false);
    const redirectPath = typeof router.query.redirect === "string" ? router.query.redirect : "/dashboard";
    const safeRedirect = redirectPath.startsWith("/") ? redirectPath : "/dashboard";
    void router.replace(safeRedirect);
  };

  const handleForgotPassword = () => {
    router.push("/forgot");
  };

  const handleShowSignUp = () => {
    router.push("/register");
  };

  const handleSocial = async () => {
    setLoading(true);
    await mockDelay(900);
    console.info("Google sign in selected");
    signIn();
    setLoading(false);
    const redirectPath = typeof router.query.redirect === "string" ? router.query.redirect : "/dashboard";
    const safeRedirect = redirectPath.startsWith("/") ? redirectPath : "/dashboard";
    void router.replace(safeRedirect);
  };

  return (
    <>
      <Head>
        <title>Noesis — Sign In</title>
        <meta name="description" content="Sign in to your Noesis account to continue learning." />
      </Head>

      <AuthShell
        eyebrow="Noesis Insight"
        title="Welcome back!"
        subtitle="Sign in to continue your cinematic learning journey."
      >
        <SignInForm
          onSubmit={handleSubmit}
          onForgotPassword={handleForgotPassword}
          onShowSignUp={handleShowSignUp}
          onSocialSignIn={() => handleSocial()}
          loading={loading}
          error={error}
        />
      </AuthShell>
    </>
  );
};

export default SignInPage;
