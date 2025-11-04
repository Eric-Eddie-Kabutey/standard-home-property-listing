"use client";

import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../../multi-step-search-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Mail, Lock } from "lucide-react";
import Link from "next/link";

interface Step3Props {
  form: UseFormReturn<FormValues>;
  onBack: () => void;
}

const Step3SignUp: FC<Step3Props> = ({ form, onBack }) => {
  return (
    <Form {...form}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#0A2540] text-white p-6 rounded-t-xl text-center">
            <h2 className="text-2xl font-bold">Receive matches directly in your inbox!</h2>
        </div>
        <div className="bg-white p-8 rounded-b-xl shadow-lg border border-gray-200">
             <div className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><Input placeholder="Enter your name" className="pl-10" {...field} /></div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><Input type="email" placeholder="your@email.com" className="pl-10" {...field} /></div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" /><Input type="password" placeholder="Password" className="pl-10" {...field} /></div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <p className="text-xs text-slate-500">By creating an account, you accept our <Link href="#" className="text-[#FF4F00] underline">terms and conditions</Link></p>
                <div className="flex justify-between items-center pt-4">
                    <Button type="button" variant="ghost" onClick={onBack}>&larr; Back</Button>
                    {/* This button is now type="submit" and triggers the main form's onSubmit */}
                    <Button type="submit" className="bg-[#FF4F00] hover:bg-[#FF4F00]/90">Send me all matches &rarr;</Button>
                </div>
             </div>
        </div>
      </div>
    </Form>
  );
};

export default Step3SignUp;