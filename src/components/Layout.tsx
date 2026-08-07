import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-x-clip font-sans">
      <Header />
      
      <Outlet />
      
      <Footer />
      
      {/* Global styles for hiding scrollbar in Webkit browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
