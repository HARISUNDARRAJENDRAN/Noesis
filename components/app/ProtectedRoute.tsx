import { useRouter } from "next/router";
import { useEffect, type ReactElement, type ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../styles/AppLayout.module.css";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps): ReactElement {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirect = encodeURIComponent(router.asPath);
      void router.replace(`/login?redirect=${redirect}`);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className={styles.guard}>
        <div className={styles.guardInner}>
          <span className={styles.guardPulse} />
          Preparing your workspace…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.guard} aria-live="polite">
        Redirecting to login…
      </div>
    );
  }

  return <>{children}</>;
}
