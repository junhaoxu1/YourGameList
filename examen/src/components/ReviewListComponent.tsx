import { Container, Col } from "react-bootstrap";
import useGetReviews from "../hooks/useGetReviews";

interface ReviewListProps {
  gameId: number | undefined;
}

const ReviewListComponent = ({ gameId }: ReviewListProps) => {
  if (gameId === undefined) {
    return <p>No game selected.</p>;
  }

  const { data: reviews } = useGetReviews(gameId);

  return (
    <>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
                <div key={index} className="review-box d-flex">
              <Container>
                <Col>
                <div className="review-email d-flex fw-bold fs-5">{review.userEmail}</div>
                <div className="review-area">{review.text}</div>
                </Col>

              </Container>
                </div>
            ))
          ) : (
            <p>
              No reviews on this game yet
            </p>
          )}
    </>
  );
};

export default ReviewListComponent;
