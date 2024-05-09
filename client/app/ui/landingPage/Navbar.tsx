"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import Container from "../../../components/ui/container";
import { Button } from "../../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
// import ProfileButton from "./ui/ProfileButton";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const routes = [
    {
      href: "/register",
      label: "SignUp",
    },
    {
      href: "/login",
      label: "SignIn",
    },
    {
      href: "/dashboard",
      label: "Dasboard",
    },
  ];

  return (


    <header className="sm:flex sm:justify-center py-3 px-4 border-b top-0 right-0 left-0 bottom-0">
      <Container>

    {/* ------------------- Mobile View ----------------- */}
        <div className="px-2 sm:px-2 lg:px-2 flex h-12 items-center justify-between w-full">
          <div className="flex">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      key={i}
                      href={route.href}
                      className="block px-2 py-1 text-lg focus:bg-blue-600"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="ml-4 lg:ml-0">
              <h1 className="text-3xl font-bold text-blue-600">StockBuddy</h1>
            </Link>
          </div>

        {/* ------------------ Desktop View ------------- */}
          <nav className="flex hidden mx-6 space-x-4 lg:space-x-8 md:block">
            {routes.map((route, i) => (
              <Button asChild variant="ghost" size="lg" className="hover:bg-blue-600">
                <Link
                  key={i}
                  href={route.href}
                  className="text-[16px] font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
         
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Theme"
              className="mr-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            {/* <ProfileButton /> */}
          </div>
        </div>
        </Container>
    </header>
  );
};

export default Navbar