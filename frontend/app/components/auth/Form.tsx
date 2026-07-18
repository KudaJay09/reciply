import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import * as z from "zod";
import { CustomInput } from "../CustomInput";
import { Button } from "../ui/button";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import type { SignUp } from "@/routes/auth/Sign-up";

const Form = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const pathName = useLocation().pathname;
  const isSignUp = pathName === "/register";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formSchema = z
    .object({
      email: z.string().email("Please enter a valid email address"),
      name: isSignUp
        ? z.string().min(8, {
            message: "Password must be at least 8 characters.",
          })
        : z.string().optional(),
      password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
      }),
      confirmPassword: isSignUp
        ? z.string().min(8, {
            message: "Password must be at least 8 characters.",
          })
        : z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (isSignUp && data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      }
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      if (isSignUp) {
        await authClient.signUp.email(
          {
            email: data.email,
            password: data.password,
            name: data.name || "",
          },
          {
            onSuccess: () => {
              toast.success("Account created successfully!");
              navigate("/");
              setIsLoading(false);
            },
            onError: (ctx) => {
              if (
                ctx.error.message.includes(
                  "customer with this email address already exists",
                )
              ) {
                toast.error(
                  "This email is already registered with Polar. Please login instead.",
                );
              } else {
                toast.error(ctx.error.message);
              }
            },
          },
        );
      } else {
        await authClient.signIn.email(
          {
            email: data.email,
            password: data.password,
            callbackURL: "/",
          },
          {
            onSuccess: () => {
              toast.success("Logged in successfully!");
              navigate("/dashboard");
            },
            onError: (ctx: any) => {
              console.log("❌ Auth error:", ctx);
              toast.error(ctx.error.message);
            },
          },
        );
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error submitting form:", error);
    }
  }

  const pending = form.formState.isSubmitting || isLoading;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {isSignUp && (
        <CustomInput
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          type="text"
          startIcon={<User size={18} />}
          disabled={pending}
        />
      )}
      <CustomInput
        control={form.control}
        name="email"
        label="Email Address"
        placeholder="name@restaurant.com"
        type="email"
        startIcon={<Mail size={18} />}
        disabled={pending || isLoading}
      />
      <div className="relative">
        <CustomInput
          control={form.control}
          name="password"
          label="Password"
          placeholder="••••••••"
          type={showPassword ? "text" : "password"}
          startIcon={<Lock size={18} />}
          disabled={pending || isLoading}
        />
        <Button
          size="icon"
          variant="ghost"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-[66%] -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
          disabled={pending || isLoading}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      </div>

      {isSignUp && (
        <div className="relative">
          <CustomInput
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            startIcon={<Lock size={18} />}
            disabled={pending || isLoading}
          />
          <Button
            size="icon"
            variant="ghost"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-[66%] -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
            disabled={pending || isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
      )}
      {isSignUp && (
        <div className="auth__checkbox-row mt-4">
          <input id="terms" name="terms" type="checkbox" />
          <label htmlFor="terms" className="auth__note">
            I agree to receive reservation updates and special offers.
          </label>
        </div>
      )}
      <button
        type="submit"
        className="custom__button auth__submit"
        disabled={pending || isLoading}
      >
        {isSignUp ? "Create Account" : "Sign In"}
      </button>
    </form>
  );
};

export default Form;
