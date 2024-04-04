import Container from "@/app/components/Container";
import ContactClient from "./ContactClient";
import getContacts from "@/actions/getContacts";

const ManageContacts = async () => {
  const contacts = await getContacts();

  return (
    <div className="pt-8">
      <Container>
        <ContactClient contacts={contacts} />
      </Container>
    </div>
  );
};

export default ManageContacts;
