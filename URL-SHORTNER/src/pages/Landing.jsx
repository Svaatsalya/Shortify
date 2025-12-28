import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  const handleShorten = (e) => {
    e.preventDefault();
    if (longUrl) navigate(`/auth?createNew=${longUrl}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-80 w-80 bg-cyan-500/10 blur-3xl" />
      </div>

      {/* HERO */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-16 sm:pt-24">
        <h1 className="text-center text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight">
          The only URL shortener
          <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            you’ll ever need
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-center text-sm sm:text-base text-zinc-400">
          Shorten long links instantly, track performance, and share with
          confidence — built for speed, security, and simplicity.
        </p>

        {/* INPUT + BUTTON */}
        <form
          onSubmit={handleShorten}
          className="
            mt-10 w-full max-w-2xl
            relative
            rounded-2xl
            bg-white/5 backdrop-blur-md
            border border-white/10
            p-3
            flex flex-col sm:flex-row items-stretch gap-3
          "
        >
          <Input
            type="url"
            placeholder="Paste your long URL here..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            className="
              h-12 flex-1
              rounded-xl
              bg-black/50
              text-white
              placeholder:text-zinc-400
              border border-white/10
              focus:border-blue-400
              focus:ring-2 focus:ring-blue-400/20
              transition-all
            "
          />


          {/* GRADIENT BUTTON */}
          <Button
            type="submit"
            className="
              h-12 sm:w-40
              cursor-pointer
              rounded-xl
              bg-gradient-to-br from-blue-300 via-cyan-600 to-teal-200
                          text-white/90 font-semibold text-xl
              hover:opacity-90
              active:scale-[0.97]
              shadow-lg shadow-blue-500/30

            "
          >
            Shorten
          </Button>
        </form>

       {/* HERO IMAGE SHOWCASE */}
<div className="mt-16 w-full max-w-5xl mx-auto">
  <div className="
    relative rounded-3xl p-[1.5px]
    bg-gradient-to-br from-blue-400/50 via-cyan-400/30 to-teal-400/50
  ">
    <div className="
      rounded-3xl bg-black/90
      border border-white/10
      backdrop-blur-md
    ">
      <img
        src="/ShortifyHome.png"
        alt="Shortify preview"
        className="
          w-full rounded-3xl
          object-cover
          shadow-2xl shadow-blue-500/20
        "
      />
    </div>
  </div>
</div>

      </div>

      {/* FAQ SECTION */}
      <div className="relative z-10 mx-auto mt-28 max-w-4xl px-4 pb-24">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl font-bold">
          Frequently Asked Questions
        </h2>

        <Accordion type="multiple" className="space-y-4">
          <AccordionItem
            value="item-1"
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <AccordionTrigger className="px-4 text-left text-white">
              Is Shortify free to use?
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm text-zinc-400">
              Yes, Shortify offers a completly free tier that allows you to shorten URLs
              without limits. You can start instantly without providing
              payment details, making it perfect for personal and small-scale use.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <AccordionTrigger className="px-4 text-left text-white">
              Can I track clicks and analytics?
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm text-zinc-400">
              Absolutely. Shortify provides detailed analytics including click
              counts, device type, and location insights so you can understand
              how your links are performing in real time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <AccordionTrigger className="px-4 text-left text-white">
              Is my data secure?
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm text-zinc-400">
              Security is a top priority. All links are generated using secure
              protocols, and your data is protected using modern encryption
              standards to ensure privacy and safety.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-4"
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <AccordionTrigger className="px-4 text-left text-white">
              Does Shortify work on mobile devices?
            </AccordionTrigger>
            <AccordionContent className="px-4 text-sm text-zinc-400">
              Yes. Shortify is fully responsive and works seamlessly across
              mobile phones, tablets, and desktops, allowing you to shorten
              and manage links anytime, anywhere.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
