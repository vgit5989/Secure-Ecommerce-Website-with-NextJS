"use client";

import { Contact, User } from "@prisma/client";
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

interface ContactClientProps {
  contacts: ExtendedContact[];
}

type ExtendedContact = Contact;

const ContactClient: React.FC<ContactClientProps> = ({ contacts }) => {
  const router = useRouter();
  let rows: any = [];

  if (contacts) {
    rows = contacts.map((contact) => {
      return {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        description: contact.description,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Customer Name", width: 130 },
    { field: "email", headerName: "Customer Email", width: 200 },
    { field: "description", headerName: "Reason for Contact", width: 500 },
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

export default ContactClient;
