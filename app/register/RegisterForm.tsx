"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Heading from "../components/products/Heading";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";
import { validatePassword } from "@/utils/passwordValidator";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import xss from "xss";

const schema = yup.object().shape<FieldValues>({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required()
    .matches(
      /^[a-zA-Z0-9@.-]*$/,
      "Email can only contain letters, numbers, @, and - symbols"
    ),
  password: yup.string().required(),
});

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const sanitizedData = {
      name: xss(data.name),
      email: xss(data.email),
      password: xss(data.password),
    };
    const validationMessage = validatePassword(sanitizedData.password);
    if (validationMessage !== "Password is valid") {
      toast.error(validationMessage);
      setIsLoading(false);
    } else {
      axios
        .post("/api/register", sanitizedData)
        .then(() => {
          toast.success("Account created successfully");

          signIn("credentials", {
            email: sanitizedData.email,
            password: sanitizedData.password,
            redirect: false,
          }).then((callback) => {
            if (callback?.ok) {
              router.push("/cart");
              router.refresh();
              toast.success("Logged in successfully");
            }

            if (callback?.error) {
              toast.error(callback.error);
            }
          });

          setIsLoading(false);
        })
        .catch(() => toast.error("An error occurred"))
        .finally(() => setIsLoading(false));
    }
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  return (
    <>
      <Heading title="Sign Up" />

      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?
        <Link className="underline" href="/login">
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
