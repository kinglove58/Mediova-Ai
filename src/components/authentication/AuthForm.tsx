"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import SignUp from "./SignUp";

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
            <LoginForm />
            <div className="items-center">
              <Button variant={"link"} onClick={() => setMode("login")}>
                Already have an Account? Login
              </Button>
            </div>
          </>
        )}{" "}
        {mode === "signup" && (
          <>
            <SignUp />
            <div className="text-center">
              <Button variant={"link"} onClick={() => setMode("login")}>
                Already have an Account? Login
              </Button>
            </div>
            <span>By clicking sign Up, you agree to our Terms of Service and Privacy Policy</span>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
