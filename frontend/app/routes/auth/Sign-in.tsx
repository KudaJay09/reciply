import AuthPage from "@/components/auth/AuthPage";
import { images } from "@/constants";
import type { Route } from "../+types/home";
import Form from "@/components/auth/Form";
import { useState } from "react";
import { useLocation } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Welcome to Login Page" },
  ];
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathName = useLocation().pathname;
  const isSignUp = pathName === "/register";

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
      <Form isLoading={isLoading} setIsLoading={setIsLoading} />
    </AuthPage>
  );
};

export default SignIn;
