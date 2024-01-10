import { Container, Col, Button } from "react-bootstrap";
import useGetReviews from "../hooks/useGetReviews";
import useAuth from "../hooks/useAuth";

interface ReviewListProps {
  gameId: number | undefined;
  onDeleteGame: (reviewId: string) => Promise<void>
}

const ReviewListComponent = ({ gameId, onDeleteGame }: ReviewListProps) => {
  if (gameId === undefined) {
    return
  }

  const { data: reviews } = useGetReviews(gameId);
  const { currentUser } = useAuth()

  console.log(reviews)

  return (
    <>
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className="review-box d-flex">
            <Container>
              <Col className="review-box border border-light">
                <div className="review-email d-flex fw-bold fs-5">
                  {review.userEmail}
                </div>
                <div className="review-area">{review.text}</div>
                {currentUser && currentUser.uid === review.uid && (
                  <Button
                    variant="danger"
                    onClick={() => onDeleteGame(review._id)}
                  >
                    Delete
                  </Button>
                )}
              </Col>
            </Container>
          </div>
        ))
      ) : (
        <p>No reviews on this game yet</p>
      )}
    </>
  );
};

export default ReviewListComponent;
