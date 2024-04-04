import Container from "@/app/components/Container";
import Summary from "./Summary";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import { redirect } from "next/navigation";

const ManageOrders = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    <NullData title="Access denied" />;
    return redirect("/");
  }

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
};

export default ManageOrders;
