"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";

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
          <span>
            <LoginForm />
          </span>
        )}{" "}
        {mode === "reset" && (
          <span>
            <LoginForm />
          </span>
        )}{" "}
        {mode === "signup" && (
          <span>
            <LoginForm />
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
