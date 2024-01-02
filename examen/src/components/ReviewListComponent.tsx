import { Table } from "react-bootstrap";
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
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {reviews && reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.userEmail}</td>
                <td>{review.text}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No reviews on this game yet</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ReviewListComponent;
