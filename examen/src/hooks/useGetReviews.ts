import { where } from 'firebase/firestore'
import { reviewsCol } from '../services/firebase'
import { Review } from '../types/Review.types'
import useStreamCollection from './useStreamCollection'
import useAuth from './useAuth'

const useGetReviews = (gameId: number) => {
    const { userEmail, userName, userPhotoUrl } = useAuth();

    const { data: reviewsData} = useStreamCollection<Review>(
        reviewsCol,
        where("gameId", "==", gameId)
    )

    const reviews = reviewsData || []

    const reviewsWithUser = reviews.map(review => ({
        ...review,
        userName: userName,
        userEmail: userEmail,
        userPhotoUrl: userPhotoUrl,
    }));
    return {data: reviewsWithUser};
}

export default useGetReviews
