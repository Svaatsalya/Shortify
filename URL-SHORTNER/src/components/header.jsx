import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/db/apiAuth";
import useFetch from "@/hooks/use-fetch";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LinkIcon, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";
import { UrlState } from "@/context";
import { useState } from "react";

const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName =
    user?.user_metadata?.name
      ? user.user_metadata.name.charAt(0).toUpperCase() +
        user.user_metadata.name.slice(1)
      : "User";

  const userInitial =
    (user?.user_metadata?.name?.[0] || "U").toUpperCase();

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/Shortify.png"
              alt="Shortify Logo"
              className="h-12 object-contain"
            />
          </Link>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <Button
                onClick={() => navigate("/auth")}
                className="
                  h-12 px-6 rounded-2xl
                  bg-gradient-to-br from-blue-300 via-cyan-600 to-teal-200
                  text-black font-semibold
                  shadow-lg shadow-blue-500/30
                  hover:opacity-80
                  hover:cursor-pointer
                "
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    className="
                      h-12 w-12
                      rounded-2xl
                      overflow-hidden
                      cursor-pointer
                      bg-gradient-to-br from-blue-300 via-cyan-600 to-teal-200
                      shadow-lg shadow-blue-500/30
                      hover:cursor-pointer
                      hover:opacity-80
                    "
                  >
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      alt={userName}
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback
                      className="
                        flex items-center justify-center
                        h-full w-full
                        text-white font-semibold text-xl
                      "
                    >
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="
                    w-48 rounded-xl
                    border border-white/10
                    bg-zinc-900/95 backdrop-blur-md
                    text-white
                    shadow-xl shadow-black/40
                    hover:opacity-80
                  "
                >
                  <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-zinc-200 truncate">
                    {userName}
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="mx-2 bg-white/10" />

                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="
                        flex items-center gap-2
                        px-3 py-2 rounded-md
                        text-zinc-200
                        hover:bg-white/10 hover:text-white
                      "
                    >
                      <LinkIcon className="h-4 w-4 text-blue-400" />
                      My Links
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="mx-2 bg-white/10" />

                  <DropdownMenuItem
                    className="
                      flex items-center gap-2
                      px-3 py-2 rounded-md
                      text-red-400
                      hover:bg-red-500/10 hover:text-red-300
                      cursor-pointer
                    "
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/auth");
                      });
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden rounded-lg p-2 text-white hover:bg-white/10"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black px-4 py-6">
            {!user ? (
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/auth");
                }}
                className="
                  w-full h-12 rounded-2xl
                  bg-gradient-to-br from-blue-300 via-cyan-600 to-teal-200
                  text-black font-semibold
                  shadow-lg shadow-blue-500/30
                  hover:cursor-pointer
                  hover:opacity-80
                "
              >
                Login
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-6">
                {/* USER CARD */}
                <div className="w-full max-w-sm rounded-2xl bg-white/5 px-5 py-4 flex flex-col items-center gap-3">
                  <Avatar
                    className="
                      h-14 w-14
                      rounded-2xl
                      overflow-hidden
                      bg-gradient-to-br from-blue-300 via-cyan-600 to-teal-200
                      shadow-lg shadow-blue-500/30
                      hover:cursor-pointer
                      hover:opacity-80
                    "
                  >
                    <AvatarImage
                      src={user?.user_metadata?.profile_pic}
                      alt={userName}
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback
                      className="
                        flex items-center justify-center
                        h-full w-full
                        text-white font-semibold text-xl
                      "
                    >
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">
                      {userName}
                    </p>
                    <p className="text-xs text-zinc-400">Logged in</p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex w-full max-w-sm flex-col gap-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-zinc-200 hover:bg-white/10"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/dashboard");
                    }}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-center text-red-400 hover:bg-red-500/10"
                    onClick={() => {
                      setMenuOpen(false);
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/auth");
                      });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* LOADER */}
      {loading && <BarLoader width="100%" color="#34d399" />}
    </>
  );
};

export default Header;
