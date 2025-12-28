import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";

const Redirect = () => {
  const { id } = useParams();

  useEffect(() => {
    async function run() {
      const link = await getLongUrl(id);

      if (!link) {
        console.error("Invalid short link");
        return;
      }

      await storeClicks({
        id: link.id,
        originalUrl: link.original_url,
      });

      // Actual redirect (in case your backend doesn't auto-redirect)
      window.location.href = link.original_url;
    }

    run();
  }, [id]);

  return (
    <div className="
      min-h-screen
      flex flex-col
      items-center justify-center
      bg-black text-white
      px-4
    ">
      {/* Loader */}
      <BarLoader
        width={220}
        color="#34d399"
        className="mb-6"
      />

      {/* Text */}
      <p className="text-sm sm:text-base text-zinc-400 tracking-wide">
        Redirecting you safely…
      </p>
    </div>
  );
};

export default Redirect;
