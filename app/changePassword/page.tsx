import getCurrentUser from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import ChangePasswordForm from "./ChangePasswordForm";
import NullData from "../components/NullData";
import { redirect } from "next/navigation";

const ChangePassword = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    <NullData title="Access denied" />;
    return redirect("/");
  }

  return (
    <Container>
      <FormWrap>
        <ChangePasswordForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default ChangePassword;
