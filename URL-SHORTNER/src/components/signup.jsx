import { useEffect, useState } from "react";
import Error from "./error";
import { Input } from "./ui/input";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";

const Signup = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const { loading, error, fn: fnSignup, data } = useFetch(signup, formData);

  // 
  const { fetchUser } = UrlState();

useEffect(() => {
  if (!error && data) {
    fetchUser(); // 🔥 THIS updates isAuthenticated
    navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`);
  }
}, [error, data]);

  // 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSignup = async () => {
    setErrors({});
    try {
      await Yup.object({
        name: Yup.string().required("Name required"),
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string().min(6).required("Password required"),
      }).validate(formData, { abortEarly: false });

      await fnSignup(formData);
    } catch (err) {
      const newErrors = {};
      err?.inner?.forEach((e) => (newErrors[e.path] = e.message));
      setErrors(newErrors);
    }
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Create Account</CardTitle>
        <CardDescription className="text-zinc-400">
          Get started with Shortify
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          name="name"
          placeholder="Full name"
          onChange={handleChange}
          className="bg-black/50 border-white/10 focus:border-blue-400"
        />
        {errors.name && <Error message={errors.name} />}

        <Input
          name="email"
          placeholder="Email address"
          onChange={handleChange}
          className="bg-black/50 border-white/10 focus:border-blue-400"
        />
        {errors.email && <Error message={errors.email} />}

        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="bg-black/50 border-white/10 focus:border-blue-400"
        />
        {errors.password && <Error message={errors.password} />}

        {/* File Upload */}
        <div className="relative">
          <input
            type="file"
            name="profile_pic"
            accept="image/*"
            onChange={handleChange}
            className="
              w-full text-sm text-zinc-400
              file:mr-4 file:rounded-lg
              file:border-0
              file:bg-blue-500/20
              file:px-4 file:py-2
              file:text-blue-300
              hover:file:bg-blue-500/30
            "
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          onClick={handleSignup}
          className="
            w-full max-w-xs
            bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400
            text-black font-semibold
            hover:opacity-90
          "
        >
          {loading ? <BeatLoader size={10} color="#000" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
