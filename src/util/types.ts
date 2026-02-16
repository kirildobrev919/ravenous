
export type SortByOptionKey = keyof typeof sortByOptions; // "Best Match" | "Highest Rated" | "Most Reviewed"
export type SortByOptionValue = (typeof sortByOptions)[SortByOptionKey]; // "best_match" | "rating" | "review_count"

export type YelpSearchType = {
  term: string;
  location: string;
  sortBy: "best_match" | "rating" | "review_count";
};

export type YelpBusiness = {
  id: string;
  image_url: string;
  name: string;
  rating: number;
  review_count: number;
  categories: Array<{ title: string }>;
  location: {
    address1: string;
    city: string;
    state: string;
    zip_code: string;
  };
};

export type YelpSearchResponse = {
  businesses: YelpBusiness[];
};

export type MappedBusiness = {
  id: string;
  imageSrc: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  category: string;
  rating: number;
  reviewCount: number;
};

export const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count",
} as const;