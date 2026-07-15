import AuthPage from "@/components/auth/AuthPage";
import type { Route } from "../+types/home";
import images from "@/constants/images";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Welcome to Registration Page" },
  ];
}

const SignUp = () => {
  return (
    <AuthPage
      badge="Join Our Table"
      title="Create your guest profile"
      description="Open an account to book faster, save favorite experiences, and manage every reservation with the same refined feel as the rest of the site."
      formTitle="Register"
      formDescription="Set up your guest profile in a few quick steps."
      submitLabel="Create Account"
      switchText="Already have an account?"
      switchLinkLabel="Sign in"
      switchLinkTo="/login"
      heroImage={images.sign}
    >
      <label className="auth__field" htmlFor="register-name">
        <span className="auth__field-label">Full Name</span>
        <input
          className="auth__field-input"
          id="register-name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
        />
      </label>
      <label className="auth__field" htmlFor="register-email">
        <span className="auth__field-label">Email Address</span>
        <input
          className="auth__field-input"
          id="register-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
        />
      </label>
      <label className="auth__field" htmlFor="register-password">
        <span className="auth__field-label">Password</span>
        <input
          className="auth__field-input"
          id="register-password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
      </label>
      <label className="auth__field" htmlFor="register-confirm-password">
        <span className="auth__field-label">Confirm Password</span>
        <input
          className="auth__field-input"
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
        />
      </label>
      <div className="auth__checkbox-row">
        <input id="terms" name="terms" type="checkbox" />
        <label htmlFor="terms" className="auth__note">
          I agree to receive reservation updates and special offers.
        </label>
      </div>
      {/* <Socials isLoading={false} setIsLoading={() => {}} /> */}
    </AuthPage>
  );
};

export default SignUp;
