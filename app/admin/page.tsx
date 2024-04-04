import getProducts from "@/actions/getProducts";
import Summary from "./summary/Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "../components/NullData";
import { redirect } from "next/navigation";

const Admin = async () => {
  return (
    <div className="pt-8">
      <Container>
        <div className="mt-4 mx-auto max-w-[1150px]">
          {redirect("/admin/add-products")}
        </div>
      </Container>
    </div>
  );
};

export default Admin;
