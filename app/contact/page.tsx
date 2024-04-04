import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import ContactForm from "./ContactForm";

const AddProducts = async () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <ContactForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
