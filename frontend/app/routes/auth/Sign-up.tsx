import AuthPage from "@/components/auth/AuthPage";
import type { Route } from "../+types/home";
import images from "@/constants/images";
import Form from "@/components/auth/Form";
import { useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Welcome to Registration Page" },
  ];
}

export const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      <Form isLoading={isLoading} setIsLoading={setIsLoading} />
    </AuthPage>
  );
};

export default SignUp;
