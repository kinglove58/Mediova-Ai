"use client";
import React, { useState } from "react";

const AuthForm = () => {
  const [mode, setMode] = useState("login");
  return (
    <div className="space-y-6">
      <div className="space-y-2 tracking-tight ">
        {mode === "reset"
          ? "Please reset your password"
          : mode === "login"
          ? "Please login to your account"
          : "Singup for your account"}
      </div>
    </div>
  );
};

export default AuthForm;
