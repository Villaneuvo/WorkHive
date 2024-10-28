"use client";
import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import Link from "next/link";
export default function RegisterForm() {
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
            <TextField
                name="password_confirm"
                label="Confirm Password"
                type="password"
                value=""
                onChange={(event) => console.log(event?.target.value)}
            />
            <div className="flex items-center justify-between">
                <Checkbox
                    name="remember_me"
                    label={
                        <p>
                            I accept the{" "}
                            <a className="text-primary-dark cursor-pointer font-bold hover:underline">
                                Terms and Conditions
                            </a>
                        </p>
                    }
                    value=""
                    onChange={(event) => console.log(event?.target.value)}
                />
            </div>
            <Button type="submit" className="w-full">
                Create an account
            </Button>
            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-primary font-bold hover:underline">
                    Login here
                </Link>
            </p>
        </form>
    );
}
