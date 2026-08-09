export type YelpSearchType = {
  term: string;
  location: string;
  sortBy?: string;
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

export type GoogleTextSearchResponse = {
  results?: GooglePlaceResult[];
  status?: string;
  error_message?: string;
};

export type GooglePlaceResult = {
  place_id: string;
  name: string;
  formatted_address?: string;
  vicinity?: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  geometry?: {
    location?: {
      lat: number;
      lng: number;
    };
  };
};