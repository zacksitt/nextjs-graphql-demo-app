import React from 'react';
import Link from 'next/link';
export default function Layout({ children }) {
  return (
    <div className='flex flex-col h-screen'>
      <header className="flex shadow-lg p-4 bg-yellow-500 text-white">
        <Link href="/">
           Home
        </Link>
      </header>
      <div className='flex-1 p-16 flex justify-center items-center'> 
        {children}
      </div>
    </div>
  );
}
