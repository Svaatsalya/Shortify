import Login from "@/components/login";
import Signup from "@/components/signup";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UrlState } from "@/context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(
        `/dashboard${longLink ? `?createNew=${longLink}` : ""}`
      );
    }
  }, [isAuthenticated, loading, navigate, longLink]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 bg-cyan-500/10 blur-3xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          className="
            w-full max-w-md
            rounded-2xl
            border border-white/10
            bg-white/5 backdrop-blur-md
            p-6 sm:p-8
          "
        >
          {/* HEADING */}
          <h1 className="mb-2 text-center text-2xl sm:text-3xl font-extrabold">
            {longLink ? (
              <>
                Hold up!
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Login first
                </span>
              </>
            ) : (
              <>
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Shortify
                </span>
              </>
            )}
          </h1>

          <p className="mb-6 text-center text-sm text-zinc-400">
            Shorten links, track analytics, and manage everything in one place.
          </p>

          {/* TABS */}
          <Tabs defaultValue="login" className="w-full">
            {/* FULL WIDTH TAB BUTTONS */}
            <TabsList
              className="
                grid grid-cols-2
                h-12
                w-full
                rounded-xl
                bg-black/40
                border border-white/10
                p-1
              "
            >
              <TabsTrigger
                value="login"
                className="
                  w-full
                  rounded-lg
                  transition-all duration-300
                  data-[state=active]:bg-gradient-to-br
                  data-[state=active]:from-blue-400
                  data-[state=active]:via-cyan-400
                  data-[state=active]:to-teal-400
                  data-[state=active]:text-black
                "
              >
                Login
              </TabsTrigger>

              <TabsTrigger
                value="signup"
                className="
                  w-full
                  rounded-lg
                  transition-all duration-300
                  data-[state=active]:bg-gradient-to-br
                  data-[state=active]:from-blue-400
                  data-[state=active]:via-cyan-400
                  data-[state=active]:to-teal-400
                  data-[state=active]:text-black
                "
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* SLIDING CONTENT */}
            <div className="relative overflow-hidden">
              <TabsContent
                value="login"
                className="
                  mt-6
                  animate-in slide-in-from-left-6 fade-in
                  [&_button]:mx-auto
                "
              >
                <Login />
              </TabsContent>

              <TabsContent
                value="signup"
                className="
                  mt-6
                  animate-in slide-in-from-right-6 fade-in
                  [&_button]:mx-auto
                "
              >
                <Signup />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Auth;
