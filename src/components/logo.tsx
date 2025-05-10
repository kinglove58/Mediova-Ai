import React from "react";
import Image from "next/image";
import LogoImage from "@public/next.svg";
import { Sparkle } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-primary-foreground">
      <Sparkle className="size-8" strokeWidth={1.5} />
      <span className="ml-2 text-lg font-bold">Mediova-Ai</span>
    </Link>
  );
};

export default Logo;
