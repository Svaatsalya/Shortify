import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { UrlState } from "@/context";
import { QRCode } from "react-qrcode-logo";

export function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  const APP_URL = window.location.origin;

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink || "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, {
    ...formValues,
    user_id: user.id,
  });

  useEffect(() => {
    if (!error && data) {
      navigate(`/link/${data[0].id}`);
    }
  }, [error, data]);

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current?.canvasRef?.current;
      const blob = await new Promise((resolve) =>
        canvas?.toBlob(resolve)
      );

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={!!longLink}
      onOpenChange={(open) => {
        if (!open) setSearchParams({});
      }}
    >
      {/* TRIGGER */}
      <DialogTrigger asChild>
        <Button
          className="
            w-full sm:w-auto
            h-11
            rounded-xl
            bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-200
            text-black font-semibold
            shadow-lg shadow-blue-500/30
            hover:cursor-pointer
            hover:opacity-80 transition
          "
        >
          Create New Link
        </Button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent
        className="
          w-[95vw] max-w-md
          rounded-2xl
          bg-black/80 backdrop-blur-xl
          border border-white/10
          text-white
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-center">
            Create New Link
          </DialogTitle>
          <p className="text-center text-sm text-zinc-400">
            Shorten your URL and track clicks instantly
          </p>
        </DialogHeader>

        {/* QR PREVIEW */}
        {formValues.longUrl && (
          <div className="flex justify-center py-3">
            <div className="rounded-2xl bg-white p-3 shadow-md">
              <QRCode
                ref={ref}
                size={180}
                value={formValues.longUrl}
              />
            </div>
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">
          <Input
            id="title"
            placeholder="Short link title"
            value={formValues.title}
            onChange={handleChange}
            className="
              h-12 rounded-xl
              bg-black/60
              border border-white/10
              focus:border-blue-400
            "
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Paste your long URL here"
            value={formValues.longUrl}
            onChange={handleChange}
            className="
              h-12 rounded-xl
              bg-black/60
              border border-white/10
              focus:border-blue-400
            "
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          {/* CUSTOM URL */}
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <Card
              className="
                px-3 py-2
                rounded-xl
                bg-black/60
                border border-white/10
                text-sm text-zinc-300
                w-full sm:w-auto
              "
            >
              {APP_URL.replace(/^https?:\/\//, "")}
            </Card>
            <Input
              id="customUrl"
              placeholder="custom-path (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
              className="
                h-12 rounded-xl
                bg-black/60
                border border-white/10
                focus:border-blue-400
              "
            />
          </div>
        </div>

        {error && <Error message={error.message} />}

        {/* FOOTER */}
        <DialogFooter className="pt-6">
          <Button
            type="button"
            onClick={createNewLink}
            disabled={loading}
            className="
              w-full h-12
              rounded-xl
              bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400
              text-black font-semibold
              shadow-lg shadow-blue-500/30
              hover:opacity-80 transition
              hover:cursor-pointer
            "
          >
            {loading ? (
              <BeatLoader size={10} color="#000" />
            ) : (
              "Create Link"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
