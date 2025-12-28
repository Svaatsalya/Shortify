/* eslint-disable react/prop-types */
import { Copy, Download, LinkIcon, Trash, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { useState } from "react";

const LinkCard = ({ url = {}, fetchUrls }) => {
  const APP_URL = window.location.origin;
  const [copied, setCopied] = useState(false);

  const shortPath = url?.custom_url || url?.short_url;
  const shortLink = `${APP_URL}/${shortPath}`;

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url.id);

  const downloadImage = () => {
    const anchor = document.createElement("a");
    anchor.href = url?.qr;
    anchor.download = url?.title || "qr-code";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className="
        group
        flex flex-col gap-4
        rounded-2xl
        border border-white/10
        bg-black/40 backdrop-blur-md
        p-4 sm:p-5
        transition hover:border-blue-400/40
      "
    >
      {/* TOP SECTION */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
        {/* QR */}
        <div
          className="
            shrink-0
            self-center sm:self-start
            rounded-xl
            bg-white p-3
            shadow-lg shadow-blue-500/20
          "
        >
          <img
            src={url?.qr}
            alt="QR Code"
            className="h-28 w-28 object-contain"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 gap-2 min-w-0">
          {/* TITLE */}
          <Link
            to={`/link/${url?.id}`}
            className="
              text-xl sm:text-2xl font-extrabold text-white
              hover:underline truncate
            "
          >
            {url?.title}
          </Link>

          {/* SHORT LINK */}
          <a
            href={shortLink}
            target="_blank"
            rel="noreferrer"
            className="
              text-base sm:text-lg
              font-semibold
              bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400
              bg-clip-text text-transparent
              hover:underline
              truncate
            "
          >
            {shortLink}
          </a>

          {/* ORIGINAL URL */}
          <div className="flex items-center gap-2 text-sm text-zinc-400 truncate">
            <LinkIcon className="h-4 w-4 shrink-0" />
            <span className="truncate">{url?.original_url}</span>
          </div>

          {/* DATE */}
          <div className="text-xs text-zinc-500 mt-1">
            Created on {new Date(url?.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
          flex justify-between items-center
          gap-3
          pt-3
          border-t border-white/10
        "
      >
        <div className="flex gap-2">
          {/* COPY */}
          <Button
            variant="ghost"
            className="
              flex items-center gap-2
              hover:bg-blue-200/10
            "
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-400" />
                <span className="text-xs text-green-400">Copied</span>
              </>
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>

          {/* DOWNLOAD */}
          <Button
            variant="ghost"
            className="hover:bg-blue-200/10"
            onClick={downloadImage}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* DELETE */}
        <Button
          variant="ghost"
          className="hover:bg-red-200/10 text-red-400"
          onClick={() => fnDelete().then(() => fetchUrls())}
          disabled={loadingDelete}
        >
          {loadingDelete ? (
            <BeatLoader size={6} color="white" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
