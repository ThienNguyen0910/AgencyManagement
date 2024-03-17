import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/global/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  return (
    <div className="flex-between p-4 relative z-10">
      <aside className="flex items-center">
        <Image
          src={"/assets/plura-logo.svg"}
          width={40}
          height={40}
          alt="logo"
        />
        <span className="text-xl font-bold">Plura.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <ul className="flex-center gap-8">
          <Link href={"#"}>Pricing</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Documentation</Link>
          <Link href={"#"}>Features </Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link href="/agency" className={buttonVariants({ size: "sm" })}>
          Login
        </Link>
        <UserButton />
        <ThemeToggle />
      </aside>
    </div>
  );
};

export default Navigation;
