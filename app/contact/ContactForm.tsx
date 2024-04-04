"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/products/Heading";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import xss from "xss";

const schema = yup.object().shape<FieldValues>({
  name: yup.string().required(),
  email: yup.string().email().required(),
  description: yup.string().required(),
});

const ContactForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const sanitizedData = {
      name: xss(data.name),
      email: xss(data.email),
      description: xss(data.description),
    };
    axios
      .post("/api/contact", sanitizedData)
      .then(() => {
        router.push("/");
        router.refresh();
        toast.success("Contact form submitted successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong. Try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Contact Us" center />
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
      <TextArea
        id="description"
        label="Tell us what you need help with"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        label={isLoading ? "Loading..." : "Submit Contact Form"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default ContactForm;
