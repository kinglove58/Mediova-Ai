"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import SignUp from "./SignUp";
import Link from "next/link";
import ResetPassword from "./ResetPassword";

const AuthForm = () => {
  const [mode, setMode] = useState("login");
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center flex flex-col">
        <h1 className="font-semibold text-2xl tracking-tight">
          {" "}
          {mode === "reset"
            ? "Reset Password"
            : mode === "login"
            ? "Login"
            : "Signup"}
        </h1>
        <p>
          {" "}
          {mode === "reset"
            ? "Please reset your password here"
            : mode === "login"
            ? "please enter your email and password"
            : "please input your correct details"}{" "}
        </p>
      </div>
      <div>
        {/* {mode === "login" ? <LoginForm /> : mode === "reset" ? } */}
        {mode === "login" && (
          <>
            <LoginForm />
            <div className="flex justify-between items-center">
              <Button variant={"link"} onClick={() => setMode("signup")}>
                Need an Account? SignUp
              </Button>
              <Button variant={"link"} onClick={() => setMode("reset")}>
                Reset your Password
              </Button>
            </div>
          </>
        )}{" "}
        {mode === "reset" && (
          <>
            <ResetPassword />
            <div className="text-center mt-10">
              <Button variant={"link"} onClick={() => setMode("login")}>
                Back to Login
              </Button>
            </div>
          </>
        )}{" "}
        {mode === "signup" && (
          <>
            <SignUp />
            <div className="text-center mb-10">
              <Button variant={"link"} onClick={() => setMode("login")}>
                Already have an Account? Login
              </Button>
            </div>
            <p className="px-8 text-muted-foreground text-center text-sm mt-10">
              By clicking the signUp button, you agree to our{" "}
              <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and <Link
                href="#"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>{" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
