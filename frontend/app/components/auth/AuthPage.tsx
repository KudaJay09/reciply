import React from "react";
import { Link } from "react-router";

import { SubHeading } from "@/components";
import { images } from "@/constants";
import Socials from "./Socials";

import "./Auth.css";

type SignInProps = {
  badge: string;
  title: string;
  description: string;
  formTitle: string;
  formDescription: string;
  submitLabel: string;
  switchText: string;
  switchLinkLabel: string;
  switchLinkTo: string;
  heroImage: string;
  children: React.ReactNode;
};

const AuthPage = ({
  badge,
  title,
  description,
  formTitle,
  formDescription,
  submitLabel,
  switchText,
  switchLinkLabel,
  switchLinkTo,
  heroImage,
  children,
}: SignInProps) => (
  <main className="app__bg auth__page">
    <div className="auth__page-top">
      <img src={images.gericht} alt="Gericht" className="auth__page-logo" />
      <Link to="/" className="p__opensans auth__back-link">
        Back to home
      </Link>
    </div>

    <section className="auth__brand-panel">
      <div className="auth__brand-copy">
        <SubHeading title={badge} />
        <h1 className="headtext__cormorant auth__brand-title">{title}</h1>
        <p className="p__opensans auth__brand-description">{description}</p>
        <div className="auth__brand-actions">
          <Link to="/login" className="custom__button auth__brand-button">
            Sign In
          </Link>
          <Link to="/register" className="auth__brand-link p__opensans">
            Create account
          </Link>
        </div>
      </div>
      <div className="auth__brand-visual">
        <img src={heroImage} alt={title} />
      </div>
    </section>

    <section className="auth__form-panel">
      <SubHeading title={badge} />
      <h2 className="headtext__cormorant auth__form-title">{formTitle}</h2>
      <p className="p__opensans auth__form-description">{formDescription}</p>

      <div className="auth__div mt-10">
        {children}
        <Socials isLoading={false} setIsLoading={() => {}} />
      </div>

      <p className="p__opensans auth__switch">
        {switchText} <Link to={switchLinkTo}>{switchLinkLabel}</Link>
      </p>
    </section>
  </main>
);

export default AuthPage;
