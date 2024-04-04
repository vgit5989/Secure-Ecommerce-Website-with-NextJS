import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import FeedbackForm from "./FeedbackForm";

const AddProducts = async () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <FeedbackForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
