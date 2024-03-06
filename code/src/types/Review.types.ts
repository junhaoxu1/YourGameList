export type Review = {
  id?: number;
  uid: string;
  _id: string;
  text: string;
  userEmail: string;
  gameId: number;
};

export type Reviews = {
  results: Review[];
};
