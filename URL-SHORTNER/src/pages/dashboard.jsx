// can add sonner from shadcn ui after link created

import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Filter, Link as LinkIcon, MousePointerClick } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreateLink } from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { getClicksForUrls } from "@/db/apiClicks";
import { UrlState } from "@/context";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClicksForUrls, urls?.map((url) => url.id));

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10 space-y-16">

      {/* LOADER */}
      {(loading || loadingClicks) && (
        <BarLoader width="100%" color="#34d399" />
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[{
          title: "Links Created",
          value: urls?.length || 0,
          icon: <LinkIcon size={18} />
        }, {
          title: "Total Clicks",
          value: clicks?.length || 0,
          icon: <MousePointerClick size={18} />
        }].map((item, idx) => (
          <div
            key={idx}
            className="
              rounded-2xl p-[1.5px]
              bg-gradient-to-br from-blue-300 via-cyan-600 to-teal-200
            "
          >
            <Card className="bg-black/50 border-none backdrop-blur-md">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="
                  h-12 w-12 rounded-xl
                  bg-gradient-to-br from-blue-300 via-cyan-400 to-teal-300
                  flex items-center justify-center
                  text-black
                ">
                  {item.icon}
                </div>
                <CardTitle className="text-2xl text-zinc-300">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-extrabold text-white">
                  {item.value}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* HEADER + CTA */}
      <div className="flex items-center justify-between w-full gap-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          My Links
        </h1>
        <div className="shrink-0">
          <CreateLink />
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full flex justify-center">
        <div className="relative w-full max-w-xl">

          {/* Glow */}
          <div
            className="
              absolute inset-0 rounded-2xl
              bg-gradient-to-r from-blue-300/30 via-cyan-600/20 to-teal-300/30
              blur-xl
            "
          />

          <Input
            type="text"
            placeholder="Search links by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              relative z-10
              w-full h-14
              rounded-2xl
              bg-black/60
              border border-white/10
              px-6
              text-white
              placeholder:text-zinc-400
              focus:border-blue-400
              focus:ring-2 focus:ring-blue-400/30
              transition-all
            "
          />

          <Filter className="absolute right-5 top-4 h-5 w-5 text-zinc-400 z-10" />
        </div>
      </div>

      {/* ERROR */}
      {error && <Error message={error?.message} />}

      {/* LINKS LIST */}
      <div className="space-y-6">
        {(filteredUrls || []).length === 0 && !loading && (
          <div
            className="
              text-center text-zinc-400
              py-20 rounded-2xl
              border border-white/10
              bg-gradient-to-br from-blue-300/5 via-cyan-600/5 to-teal-200/5
            "
          >
            No links found. Create your first one 🚀
          </div>
        )}

        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
