import Container from "@/app/components/Container";
import OrdersClient from "./OrderClient";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { redirect } from "next/navigation";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <NullData title="Access denied" />;
    return redirect("/");
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No orders yet." />;
  }

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
