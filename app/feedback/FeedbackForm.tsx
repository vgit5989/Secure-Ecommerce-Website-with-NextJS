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
  rating: yup.number().required(),
  subject: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  description: yup.string().required(),
});

const FeedbackForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      rating: "",
      subject: "",
      email: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const sanitizedData = {
      rating: parseInt(xss(data.rating)),
      subject: xss(data.subject),
      email: xss(data.email),
      description: xss(data.description),
    };

    if (sanitizedData.rating < 0 || sanitizedData.rating > 10) {
      toast.error("Invalid Rating");
      setIsLoading(false);
      return;
    }

    axios
      .post("/api/feedback", sanitizedData)
      .then(() => {
        router.push("/");
        router.refresh();
        toast.success("Feedback form submitted successfully!");
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
      <Heading title="Feedback Form" center />
      <Input
        id="rating"
        label="Rate our services from 0-10"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="number"
      />
      <Input
        id="email"
        label="Email (Optional)"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="subject"
        label="Subject (Optional)"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <TextArea
        id="description"
        label="We'd love to hear your suggestions"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        label={isLoading ? "Loading..." : "Submit Feedback Form"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default FeedbackForm;
