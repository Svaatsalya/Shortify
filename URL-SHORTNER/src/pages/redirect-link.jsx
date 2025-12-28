import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { getLongUrl } from "@/db/apiUrls";
import { storeClicks } from "@/db/apiClicks";

const Redirect = () => {
  const { id } = useParams();

  useEffect(() => {
    async function run() {
      try {
        const link = await getLongUrl(id);

        if (!link?.original_url) {
          console.error("Invalid short link");
          return;
        }

        // 🔹 Fire-and-forget analytics (DO NOT await)
        storeClicks({
          id: link.id,
          originalUrl: link.original_url,
        }).catch((err) => {
          console.warn("Click tracking failed:", err);
        });

        // 🔹 ALWAYS redirect
        window.location.href = link.original_url;
      } catch (err) {
        console.error("Redirect failed:", err);
      }
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
      <BarLoader
        width={220}
        color="#34d399"
        className="mb-6"
      />
      <p className="text-sm sm:text-base text-zinc-400 tracking-wide">
        Redirecting you safely…
      </p>
    </div>
  );
};

export default Redirect;
