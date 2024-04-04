"use client";

import { useEffect, useState } from "react";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/types";
import Heading from "../components/products/Heading";
import axios from "axios";
import { validatePassword } from "@/utils/passwordValidator";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import xss from "xss";

const schema = yup.object().shape<FieldValues>({
  password: yup.string().required(),
  newP: yup.string().required(),
  newPCheck: yup.string().required(),
});

interface ChangePasswordFormProps {
  currentUser: SafeUser | null;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  currentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      newP: "",
      newPCheck: "",
    },
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const sanitizedData = {
      password: xss(data.password),
      newP: xss(data.newP),
      newPCheck: xss(data.newPCheck),
    };

    if (sanitizedData.newP === sanitizedData.newPCheck) {
    } else {
      toast.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    signIn("credentials", {
      email: currentUser?.email,
      password: sanitizedData.password,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        const sub = { id: currentUser?.id, password: sanitizedData.newP };
        const validationMessage = validatePassword(sub.password);
        if (validationMessage !== "Password is valid") {
          toast.error(validationMessage);
          setIsLoading(false);
        } else {
          axios
            .put("/api/changePassword", sub)
            .then(() => {
              router.push("/");
              router.refresh();
              toast.success("Password changed successfully.");
            })
            .catch(() => toast.error("An error occurred"))
            .finally(() => setIsLoading(false));
        }
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <>
      <Heading title="Change Password" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="password"
        label="Old Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Input
        id="newP"
        label="New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Input
        id="newPCheck"
        label="New Password Confirm"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Change Password"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default ChangePasswordForm;
