"use client";
import React, { useState } from "react";

const AuthForm = () => {
  const [mode, setMode] = useState("login");
  return (
    <div className="space-y-6">
      <div className="space-y-2 tracking-tight">
        <h1 className="font-semibold text-lg">
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
      <div></div>
    </div>
  );
};

export default AuthForm;
