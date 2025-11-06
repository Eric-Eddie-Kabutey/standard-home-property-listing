"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/lib/searchSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckCircle2, Mail, User, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

interface Step3Props {
  form: UseFormReturn<FormValues>;
  onBack: () => void;
}

const Step3Signup: FC<Step3Props> = ({ form, onBack }) => {
  const router = useRouter();

  const handleSubmit = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => router.push("/plan"), 800);
  };

  return (
    <Form {...form}>
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-orange-500 p-8 text-white text-center">
          <CheckCircle2 className="mx-auto h-16 w-16" />
          <h2 className="mt-4 text-3xl font-bold">You&apos;re all set!</h2>
          <p className="mt-2 text-lg opacity-90">
            We&apos;ll send matches directly to your inbox
          </p>
        </div>

        <div className="mt-8 space-y-6 rounded-b-2xl bg-white p-8 shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-indigo-600" />
              <input
                placeholder="Your name"
                className="w-full rounded-lg border px-4 py-3"
                {...form.register("name")}
              />
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-indigo-600" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border px-4 py-3"
                {...form.register("email")}
              />
            </div>
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-indigo-600" />
              <input
                type="password"
                placeholder="Create password"
                className="w-full rounded-lg border px-4 py-3"
                {...form.register("password")}
              />
            </div>
          </div>

          <p className="text-xs text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-orange-600 underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-600 underline">
              Privacy Policy
            </a>
            .
          </p>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="ghost" onClick={onBack}>
              Back
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-orange-500 px-8 py-6 text-lg font-bold hover:bg-orange-600"
            >
              Start Receiving Matches
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Step3Signup;