import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="
        w-full
        border-t border-white/10
        bg-black/80 backdrop-blur-md
      ">
        <div className="
          mx-auto max-w-7xl
          px-4 py-6
          text-center
          text-sm text-zinc-400
        ">
          <span className="block sm:inline">
            Made with
            <span className="mx-1 text-blue-400">💙</span>
            by
          </span>
          <span className="
            ml-1 font-medium
            bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400
            bg-clip-text text-transparent
          ">
            Vaatsalya
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
