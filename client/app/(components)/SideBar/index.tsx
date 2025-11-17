"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDownCircle, ChevronUpCircle, Home, Icon, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import Link from "next/link";
import { setIsSidebarCollapsed } from "@/state";

type Props = {};

const SideBar = (props: Props) => {
    const [showProjects, setShowProjects] = useState(true);
    const [showPriority, setShowPriority] = useState(true);

    const dispatch = useAppDispatch();
    const isSideBarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);

  const sideBarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all 
    duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white w-64
    ${isSideBarCollapsed ? "w-0 hidden" : "w-64 "}`;

  return <div className={sideBarClassNames}>
    <div className="flex h-full flex-col w-full justify-start">
        { /* Logo */ }
        <div className="z-50 flex min-h-14 w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black" >
            <div className="text-xl font-bold text-gray-800 dark:text-white">
                Project Manager
            </div>
            { isSideBarCollapsed ? null : (
                <button
                    className="py-3"
                    onClick={() => {
                        dispatch(setIsSidebarCollapsed(!isSideBarCollapsed))
                    }}
                >
                    <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                </button>
            )}
        </div>
        { /* Teams Section */ }
        <div className="flex items-center gap-5 border-gray-200 px-8 py-4 dark:border-gray-700">
            <Image src="/logo.png" alt="logo" width={40} height={40} className="h-10 w-10 rounded-full"/>
            <div>
                <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                    Yashas's Team
                </h3>
                <div className="mt-1 flex items-start gap-2">
                    <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                    <p className='text-xs text-gray-500'> Private </p>
                </div>
            </div>
        </div>
        { /* NavBar Links */ }
        <nav className="z-10 w-full">
            <SideBarLink icon={Home} label="Home" href='/'/>
            <SideBarLink icon={Briefcase} label="Timeline" href='/timeline'/>
            <SideBarLink icon={Search} label="Search" href='/search'/>
            <SideBarLink icon={Settings} label="Settings" href='/settings'/>
            <SideBarLink icon={User} label="Users" href='/users'/>
            <SideBarLink icon={Users} label="Teams" href='/teams'/>
        </nav>
        { /* PROJECTS LINKS */ }
        <button
            className='flex w-full items-center justify-between px-8 py-3 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
            onClick = {() => {setShowProjects(!showProjects)}}        
        >
            <span className="">Projects</span>
            { showProjects ? (
                <ChevronUpCircle className="h-5 w-5" />
            ) : ( <ChevronDownCircle className="h-5 w-5" /> )}
        </button>
        { /* PROJECTS LIST */ }

        { /* PRIORITY LIST */ }
         <button
            className='flex w-full items-center justify-between px-8 py-3 text-gray-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
            onClick = {() => {setShowPriority(!showPriority)}}        
        >
            <span className="">Priority</span>
            { showPriority ? (
                <ChevronUpCircle className="h-5 w-5" />
            ) : ( <ChevronDownCircle className="h-5 w-5" /> )}
        </button>

        { /* PRIORITY LIST ITEMS */ }
        <SideBarLink icon={AlertCircle} label="Urgent" href='/priority/urgent'/>
        <SideBarLink icon={ShieldAlert} label="High" href='/priority/high'/>
        <SideBarLink icon={AlertTriangle} label="Medium" href='/priority/medium'/>
        <SideBarLink icon={AlertOctagon} label="Low" href='/priority/low'/>
        <SideBarLink icon={Layers3} label="Backlog" href='/priority/backlog'/>

    </div>
  </div>;
};

interface SideBarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
}

const SideBarLink = ({ 
    href, 
    icon: Icon, 
    label, 
}: SideBarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname === '/' && href === '/dashboard');

    return (
        <Link href={href} className="w-full">
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors
                hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700
                ${isActive ? 'bg-gray-100 text-white dark:bg-gray-600' : ''}
                justify-start px-8 py-3`}
            >
                {isActive && (
                    <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200"/>
                )}
                <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                <span className="font-medium text-gray-800 dark:text-gray-100" >
                    {label}
                </span>
            </div>
        </Link>
    )
}

export default SideBar;
