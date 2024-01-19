import { where } from "firebase/firestore";
import { reviewsCol } from "../services/firebase";
import { Review } from "../types/Review.types";
import useStreamCollection from "./useStreamCollection";

const useGetReviews = (gameId: number) => {
  const { data: reviewsData } = useStreamCollection<Review>(
    reviewsCol,
    where("gameId", "==", gameId)
  );

  const reviews = reviewsData || [];

  const reviewsWithUser = reviews.map((review) => ({
    ...review,
  }));
  return { data: reviewsWithUser };
};

export default useGetReviews;
