import { Input } from "./ui/input";
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
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./error";
import { login } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { UrlState } from "@/context";

const Login = () => {
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const navigate = useNavigate();
  const { fetchUser } = UrlState();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { loading, error, fn: fnLogin, data } = useFetch(login, formData);

  useEffect(() => {
    if (!error && data) {
      fetchUser();
      navigate(`/dashboard${longLink ? `?createNew=${longLink}` : ""}`);
    }
  }, [error, data]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setErrors({});
    try {
      await Yup.object({
        email: Yup.string().email("Invalid email").required("Email required"),
        password: Yup.string().min(6).required("Password required"),
      }).validate(formData, { abortEarly: false });

      await fnLogin();
    } catch (err) {
      const newErrors = {};
      err?.inner?.forEach((e) => (newErrors[e.path] = e.message));
      setErrors(newErrors);
    }
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-md">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">Welcome Back</CardTitle>
        <CardDescription className="text-zinc-400">
          Login to continue shortening links
        </CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          name="email"
          type="email"
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
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button
          onClick={handleLogin}
          className="
            w-full max-w-xs
            bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400
            text-black font-semibold
            hover:opacity-90
          "
        >
          {loading ? <BeatLoader size={10} color="#000" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
