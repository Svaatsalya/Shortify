import DeviceStats from "@/components/device-stats";
import Location from "@/components/location-stats";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

const Link = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const { id } = useParams();
  const APP_URL = window.location.origin;

  const { loading, data: url, fn, error } = useFetch(getUrl, {
    id,
    user_id: user?.id,
  });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && !error && url) {
      fnStats();
    }
  }, [loading, error, url]);

  if (error) {
    navigate("/dashboard");
    return null;
  }

  if (!url) return null;

  const shortPath = url.custom_url || url.short_url;
  const shortLink = `${APP_URL}/${shortPath}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadImage = () => {
    const anchor = document.createElement("a");
    anchor.href = url.qr;
    anchor.download = url.title;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width="100%" color="#34d399" />
      )}

      <div className="w-full px-4 sm:px-6 lg:px-12 py-10">
  <div
    className="
      grid grid-cols-1
      xl:grid-cols-[42%_58%]
      gap-10 xl:gap-14
      items-start
    "
  >
    {/* LEFT PANEL */}
    <div className="w-full space-y-8 sm:space-y-10">
      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white break-words text-center xl:text-left">
        {url.title}
      </h1>

      {/* SHORT LINK */}
      <a
        href={shortLink}
        target="_blank"
        rel="noreferrer"
        className="
          block text-base sm:text-lg lg:text-xl font-bold
          bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400
          bg-clip-text text-transparent
          hover:underline break-all
          text-center xl:text-left
        "
      >
        {shortLink}
      </a>

      {/* ORIGINAL URL */}
      <a
        href={url.original_url}
        target="_blank"
        rel="noreferrer"
        className="
          flex items-start gap-2
          text-sm text-zinc-400
          hover:underline break-all
          justify-center xl:justify-start
        "
      >
        <LinkIcon className="h-4 w-4 mt-0.5 shrink-0" />
        <span>{url.original_url}</span>
      </a>

      {/* DATE */}
      <p className="text-xs text-zinc-500 text-center xl:text-left">
        Created on {new Date(url.created_at).toLocaleString()}
      </p>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap justify-center xl:justify-start gap-3 pt-2">
        <Button variant="ghost" onClick={handleCopy}>
          {copied ? "Copied ✓" : <Copy />}
        </Button>

        <Button variant="ghost" onClick={downloadImage}>
          <Download />
        </Button>

        <Button
          variant="ghost"
          className="text-red-400 hover:bg-red-500/10"
          onClick={() => fnDelete().then(() => navigate("/dashboard"))}
          disabled={loadingDelete}
        >
          {loadingDelete ? (
            <BeatLoader size={6} color="white" />
          ) : (
            <Trash />
          )}
        </Button>
      </div>

      {/* QR CARD */}
      <div className="flex justify-center xl:justify-start pt-2">
        <div
          className="
            w-56 sm:w-64
            rounded-2xl
            bg-white p-4
            shadow-xl shadow-blue-500/20
          "
        >
          <img
            src={url.qr}
            alt="QR code"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>

    {/* RIGHT PANEL */}
    <Card
      className="
        w-full
        bg-black/40
        border border-white/10
        backdrop-blur-md
        rounded-2xl
      "
    >
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl font-extrabold text-white text-center">
          Statistics
        </CardTitle>
      </CardHeader>

      {stats && stats.length ? (
        <CardContent className="space-y-10">
          {/* TOTAL CLICKS */}
          <Card
            className="
              bg-gradient-to-br from-blue-300 via-cyan-400 to-teal-300
              border border-white/10
              rounded-xl
              text-center
            "
          >
            <CardHeader>
              <CardTitle className="text-zinc-700 text-lg sm:text-xl">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl sm:text-5xl font-extrabold text-white">
                {stats.length}
              </p>
            </CardContent>
          </Card>

          {/* LOCATION */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
              Location Data
            </h3>
            <Location stats={stats} />
          </div>

          {/* DEVICE */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
              Device Info
            </h3>
            <DeviceStats stats={stats} />
          </div>
        </CardContent>
      ) : (
        <CardContent className="text-zinc-400 text-center py-12">
          {loadingStats
            ? "Loading statistics..."
            : "No statistics available yet"}
        </CardContent>
      )}
    </Card>
  </div>
</div>

    </>
  );
};

export default Link;
