"use client";
import { logout } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const handleButton = async () => {
    await logout();
    redirect("/login");
  };

  return (
    <span
      onClick={handleButton}
      className="cursor-pointer w-full text-destructive inline-block"
    >
      Logout
    </span>
  );
};

export default LogoutButton;
