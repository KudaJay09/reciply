import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Navigate } from "react-router";

type SocialsProps = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const Socials = ({ isLoading, setIsLoading }: SocialsProps) => {
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "http://localhost:5173",
        errorCallbackURL: "http://localhost:5173/login?error=true",
      },
      {
        onSuccess: () => {
          toast.success("Redirecting to Google Sign In...");
          setIsLoading(false);
          <Navigate to={"/"} />;
        },
        onError(error) {
          toast.error("Google Sign In failed. Please try again.");
          setIsLoading(false);
          console.error("Google Sign In failed:", error);
        },
      },
    );
  };

  return (
    <div className="auth__socials">
      <button
        type="button"
        className="custom__button auth__social-button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="auth__social-icon"
        >
          <path
            fill="#4285F4"
            d="M21.35 11.1H12v2.9h5.35c-.23 1.4-.9 2.58-1.97 3.38v2.81h3.18c1.86-1.72 2.93-4.26 2.93-7.28 0-.67-.06-1.32-.14-1.81z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.7 0 4.97-.9 6.63-2.45l-3.18-2.81c-.88.59-2 .94-3.45.94-2.64 0-4.88-1.78-5.68-4.18H2.99v2.88A10 10 0 0 0 12 22z"
          />
          <path
            fill="#FBBC05"
            d="M6.32 13.5A6 6 0 0 1 6 12c0-.53.09-1.04.24-1.5V7.62H2.99A10 10 0 0 0 2 12c0 1.61.38 3.13 1 4.5l3.32-3z"
          />
          <path
            fill="#EA4335"
            d="M12 6.38c1.47 0 2.78.51 3.82 1.5l2.87-2.87C16.96 3.34 14.7 2.4 12 2.4A10 10 0 0 0 2.99 7.62l3.33 2.88C7.12 8.16 9.36 6.38 12 6.38z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
};

export default Socials;
