import { useEffect } from "react"
import { Image, Table } from "react-bootstrap"
import useGetReviews from "../hooks/useGetReviews"
import useAuth from "../hooks/useAuth"

interface ReviewListProps {
    gameId: number | undefined
}

const ReviewListComponent = ({ gameId }: ReviewListProps) => {

    if (gameId === undefined) {
        return <p>No game selected.</p>;
    }

    const {
        data: reviews,
    } = useGetReviews(gameId)
    
  return (
    <>
        <Table>
            <tbody>
            {reviews && reviews.map((review, index) => (
                    <tr key={index}>
                        <td>{review.userEmail}</td>
                        <td>{review.text}</td>
                    </tr>
        ))}
            </tbody>
        </Table>
    </>
  )
}

export default ReviewListComponent