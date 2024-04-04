"use client";
import { useRouter } from "next/navigation";
import { MdContactSupport } from "react-icons/md";

const ContactBtn = () => {
  const router = useRouter();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/contact")}
    >
      <div className="flex flex-col items-center">
        <MdContactSupport size={24} />
        Contact Us
      </div>
    </div>
  );
};

export default ContactBtn;
