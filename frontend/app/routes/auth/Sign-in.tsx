import AuthPage from "@/components/auth/AuthPage";
import { images } from "@/constants";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Login Page" },
  ];
}

const SignIn = () => {
  return (
    <AuthPage
      badge="Private Access"
      title="Welcome back to Gericht"
      description="Return to your table, review your reservations, and continue the experience with a polished sign in that feels at home in the restaurant."
      formTitle="Sign In"
      formDescription="Use the email and password tied to your reservation profile."
      submitLabel="Sign In"
      switchText="New to Gericht?"
      switchLinkLabel="Create an account"
      switchLinkTo="/register"
      heroImage={images.welcome}
    >
      <label className="auth__field" htmlFor="login-email">
        <span className="auth__field-label">Email Address</span>
        <input
          className="auth__field-input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
        />
      </label>

      <label className="auth__field" htmlFor="login-password">
        <span className="auth__field-label">Password</span>
        <input
          className="auth__field-input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />
      </label>

      <div className="auth__checkbox-row">
        <input id="remember-me" name="rememberMe" type="checkbox" />
        <label htmlFor="remember-me" className="auth__note">
          Keep me signed in on this device
        </label>
      </div>
    </AuthPage>
  );
};

export default SignIn;
