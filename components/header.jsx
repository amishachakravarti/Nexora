import React from "react";
import Button from "@/components/Button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import DropdownMenu from "@/components/DropdownMenu";
import DropdownItem from "@/components/DropdownItem";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header
      className="fixed top-0 w-full border-b  bg-white/5 backdrop-blur-md

 text-whitebackdrop-blur-md z-50 hover:from-orange-500 hover:to-pink-500
 "
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-1">
          <Image
            src={"/logo.png"}
            alt="Sensai Logo"
            width={200}
            height={60}
            className="h-12 py-1 w-auto object-contain"
          />
          <h1 className="text-4xl font-bold italic text-white font-[cursive]">
            Nexora
          </h1>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4  ">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2 border rounded-xl border-gray-500"
              >
                <LayoutDashboard className="h-4 w-4 " />
                Industry Insights
              </Button>
              <Button
                variant="ghost"
                className="md:hidden w-13 h-13 p-0 m-0   flex items-center justify-center"
              >
                <LayoutDashboard className="w-5 h-5 text-white  " />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}

            <DropdownMenu
              button={
                <div
                  className="flex items-center gap-2 px-4 py-2 text-black bg-gray-300  border rounded-xl  border-gray-500 hover:bg-gray-100 cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-haspopup="true"
                >
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
              }
            >
              <DropdownItem
                href="/resume"
                icon={FileText}
                label="Build Resume"
              />
              <DropdownItem
                href="/ai-cover-letter"
                icon={PenBox}
                label="Cover Letter"
              />
              <DropdownItem
                href="/interview"
                icon={GraduationCap}
                label="Interview Prep"
              />
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              {/* <Button variant="outline" className="border rounded-xl">Sign In</Button> */}
              <Button
                variant="outline"
                className="rounded-xl border border-white px-6 py-2 text-white hover:bg-white hover:text-black transition duration-300 ease-in-out shadow-sm"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
