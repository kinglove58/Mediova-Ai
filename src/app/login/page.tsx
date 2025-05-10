import Image from "next/image";
import React from "react";
import AuthImage from "@public/Abstract Curves and Colors.jpeg";
import Logo from "@/components/logo";

const Authentication = () => {
  return (
    <main className="h-screen grid grid-cols-2">
      <div className="relative p-10 bg-muted flex flex-col w-full h-full text-primary-foreground">
        <Image
          src={AuthImage}
          alt="wallpaper image for login"
          fill
          className="object-cover"
        />
        <div className="relative items-center flex z-20 ">
          <Logo />
        </div>
        <div className="z-20 relative mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Pictoria AI is a game changer for me. I have been able to
              generate high quality professional headshots within minutes. It
              has saved me countless hours of work and cost as well.&rdquo;{" "}
            </p>
            <footer className="text-sm">David S.</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-3/4">log in</div>
      </div>
    </main>
  );
};

export default Authentication;
