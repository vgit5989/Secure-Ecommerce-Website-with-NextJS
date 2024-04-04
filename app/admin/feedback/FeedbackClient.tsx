"use client";

import { Feedback, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

interface FeedbackClientProps {
  feedbacks: ExtendedFeedback[];
}

type ExtendedFeedback = Feedback;

const FeedbackClient: React.FC<FeedbackClientProps> = ({ feedbacks }) => {
  const router = useRouter();
  let rows: any = [];

  if (feedbacks) {
    rows = feedbacks.map((feedback) => {
      return {
        id: feedback.id,
        rating: feedback.rating,
        email: feedback.email,
        subject: feedback.subject,
        description: feedback.description,
      };
    });
  }

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 220 },
    { field: "email", headerName: "Customer Email", width: 200 },
    { field: "rating", headerName: "Customer Rating", width: 130 },
    { field: "subject", headerName: "Subject", width: 200 },
    { field: "description", headerName: "Feedback", width: 500 },
  ];

  return (
    <div className="max-w-[1000px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Contact Information" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default FeedbackClient;
