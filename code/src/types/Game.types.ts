export type GameTitle = {
  id: number;
  _id: string;
  uid: string;
  name: string;
  deck: string;
  description: string;
  developers: {
    id?: number;
    name: string;
  }[];
  released: number;
  background_image: string;
  genres: {
    id?: number;
    name: string;
  }[];
  score: string;
};

export type GameTitles = {
  results: GameTitle[];
  page: number;
  count: number;
};

export type Genre = {
  id?: number;
  name: string;
};

export type Genres = Genre[];
