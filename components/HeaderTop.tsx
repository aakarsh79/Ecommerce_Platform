// *********************
// Role of the component: Topbar of the header
// Name of the component: HeaderTop.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeaderTop />
// Input parameters: no input parameters
// Output: topbar with phone, email and login and register links
// *********************

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }
  return (
    <div className="h-auto min-h-[40px] sm:h-10 text-white bg-orange-600 px-4 sm:px-6 md:px-8 lg:px-12 py-2 sm:py-0">
      <div className="flex justify-between h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:gap-y-2 max-w-screen-2xl mx-auto">
        <ul className="flex items-center h-full gap-x-3 sm:gap-x-5 text-xs sm:text-sm md:text-base">
          <li className="flex items-center gap-x-1 sm:gap-x-2 font-semibold">
            <FaHeadphones className="text-white text-sm sm:text-base" />
            <span className="whitespace-nowrap">+91 98738 92872</span>
          </li>
          <li className="flex items-center gap-x-1 sm:gap-x-2 font-semibold">
            <FaRegEnvelope className="text-white text-sm sm:text-base md:text-xl" />
            <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">aakarsh123@gmail.com</span>
          </li>
        </ul>
        <ul className="flex items-center gap-x-3 sm:gap-x-5 h-full text-xs sm:text-sm md:text-base font-semibold">
          {!session ? ( 
          <>
          <li className="flex items-center">
            <Link href="/login" className="flex items-center gap-x-2 font-semibold">
              <FaRegUser className="text-white" />
              <span>Login</span>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/register" className="flex items-center gap-x-2 font-semibold">
              <FaRegUser className="text-white" />
              <span>Register</span>
            </Link>
          </li>
          </>
          ) :  (<>
          <span className="ml-2 sm:ml-4 md:ml-10 text-xs sm:text-sm md:text-base truncate max-w-[150px] sm:max-w-none">{session.user?.email}</span>
          <li className="flex items-center">
            <button onClick={() => handleLogout()} className="flex items-center gap-x-1 sm:gap-x-2 font-semibold">
              <FaRegUser className="text-white text-sm sm:text-base" />
              <span>Log out</span>
            </button>
          </li>
          </>)}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
