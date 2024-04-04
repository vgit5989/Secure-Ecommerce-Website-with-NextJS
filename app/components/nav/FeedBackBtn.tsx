"use client";
import { useRouter } from "next/navigation";
import { MdFeedback } from "react-icons/md";

const FeedbackBtn = () => {
  const router = useRouter();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => router.push("/feedback")}
    >
      <div className="flex flex-col items-center">
        <MdFeedback size={24} />
        Give us Feedback
      </div>
    </div>
  );
};

export default FeedbackBtn;
