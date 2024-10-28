"use client";
import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import Link from "next/link";
export default function LoginForm() {
    return (
        <form className="space-y-4 md:space-y-6" action="#">
            <TextField
                name="email"
                label="Email address"
                value=""
                onChange={(event) => console.log(event?.target.value)}
            />
            <TextField
                name="password"
                label="Password"
                type="password"
                value=""
                onChange={(event) => console.log(event?.target.value)}
            />
            <div className="flex items-center justify-between">
                <Checkbox
                    name="remember_me"
                    label="Remember me"
                    value=""
                    onChange={(event) => console.log(event?.target.value)}
                />
                <Link
                    href="/auth/forgot-password"
                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                >
                    Forgot password?
                </Link>
            </div>
            <Button type="submit" className="w-full">
                Sign In
            </Button>
            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link href="/register" className="text-primary dark:text-primary font-bold hover:underline">
                    Sign up
                </Link>
            </p>
        </form>
    );
}
