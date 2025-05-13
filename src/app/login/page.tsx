import Image from "next/image";
import React from "react";
import AuthImage from "@public/Abstract Curves and Colors.jpeg";
import Logo from "@/components/logo";
import AuthForm from "@/components/authentication/AuthForm";

const Authentication = () => {
  return (
    <main className="h-screen grid grid-cols-2">
      <div className="relative p-10 bg-muted flex flex-col w-full h-full text-primary-foreground">
        <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10 " />
        <div className="w-full h-[40%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10 " />
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
            <p className="text-sm">
              &ldquo;Pictoria AI is a game changer for me. I have been able to
              generate high quality professional headshots within minutes. It
              has saved me countless hours of work and cost as well.&rdquo;{" "}
            </p>
            <footer className="text-xs">David S.</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col justify-center items-center p-8 w-full">
         <div className="max-w-xl mx-auto w-[350px]">
           <AuthForm/>
         </div>
        </div>
      </div>
    </main>
  );
};

export default Authentication;
