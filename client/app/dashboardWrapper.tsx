"use client";

import React, { useEffect } from "react";
import NavBar from "@/app/(components)/NavBar";
import SideBar from "@/app/(components)/SideBar";
import StoreProvider, { useAppSelector } from "./redux";

type Props = {};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    useEffect(() => {
        if (isDarkMode) {
            console.log("dark mode enabled");
            document.documentElement.classList.add("dark");
        } else {
            console.log("dark mode disabled");
            document.documentElement.classList.remove("dark");
        }
    });

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans">
        { /* Sidebar */ }
        <SideBar />
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${isSidebarCollapsed ? "" : "md:pl-64"}`}>
            { /* Navbar */ }
            <NavBar />
            { children }
        </main>
    </div>
  );
};


const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <DashboardLayout>
                { children }
            </DashboardLayout>
        </StoreProvider>
    );
}

export default DashboardWrapper;
