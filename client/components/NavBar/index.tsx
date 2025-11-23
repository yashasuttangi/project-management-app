import React from 'react';
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';

type Props = {}

const NavBar = () => {

    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className='flex items-center justify-between bg-white px-4 py-3 dark:bg-black'>
        { /* Search Bar */ }
        <div className='flex items-center gap-8'>
            { /* Toggle Sidebar Button */ }
            {!isSidebarCollapsed ? null : (
                <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}>
                    <Menu className='h-8 w-8 cursor-pointer dark:text-white'/>
                </button>
            )}
            <div className='relative flex h-min w-[300px]'>
                <Search className="absolute left-1 top-1/2 mr-2 h-5 w-5 -translate-y-1/2 cursor-pointer dark:text-white"/>
                <input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded border border-none bg-gray-100 px-8 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
                />
            </div>
        </div>
        { /* Icons */ }
        <div className='flex items-center gap-4'>
            <button 
                onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
                className={isDarkMode ? `rounded p-2 dark:hover:bg-gray-700 hover:bg-gray-200` : `rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800`}
            >
                { isDarkMode 
                    ? <Sun className='h-6 w-6 cursor-pointer text-yellow-400'/>
                    : <Moon className='h-6 w-6 cursor-pointer dark:text-white'/>
                }
            </button>
            <Link 
                href='/settings'
                className='h-min w-min rounded p-2 hover:bg-gray-100'
            >
                <Settings className='h-6 w-6 cursor-pointer dark:text-white'/>
            </Link>
            <div className='ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block'></div>
        </div>
    </div>
  )
};

export default NavBar;