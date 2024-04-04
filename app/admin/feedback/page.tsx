import Container from "@/app/components/Container";
import getFeedbacks from "@/actions/getFeedbacks";
import FeedbackClient from "./FeedbackClient";

const ManageFeedback = async () => {
  const feedbacks = await getFeedbacks();

  return (
    <div className="pt-8">
      <Container>
        <FeedbackClient feedbacks={feedbacks} />
      </Container>
    </div>
  );
};

export default ManageFeedback;
