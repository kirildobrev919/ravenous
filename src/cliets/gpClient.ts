import { MappedBusiness, YelpSearchType } from "../dtos/gpTypes";

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

type GoogleTextSearchResponse = {
  results?: GooglePlaceResult[];
  status?: string;
  error_message?: string;
};

type GooglePlaceResult = {
  place_id: string;
  name: string;
  vicinity?: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
};

type GooglePlaceDetailsResponse = {
  result?: GooglePlaceDetailsResult;
  status?: string;
  error_message?: string;
};

type GooglePlaceDetailsResult = {
  place_id: string;
  name: string;
  formatted_address?: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  address_components?: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>;
};

function buildPhotoUrl(photoReference: string) {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`;
}

function extractAddressParts(address_components?: GooglePlaceDetailsResult["address_components"]) {
  const getPart = (type: string) =>
    address_components?.find((component) => component.types.includes(type))?.long_name ?? "";

  return {
    city: getPart("locality"),
    state: getPart("administrative_area_level_1"),
    zipCode: getPart("postal_code"),
  };
}

async function fetchPlaceDetails(placeId: string) {
  const detailsUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json"
  );

  detailsUrl.search = new URLSearchParams({
    place_id: placeId,
    fields: "place_id,name,formatted_address,rating,user_ratings_total,types,photos,address_components",
    key: apiKey,
  }).toString();

  const response = await fetch(detailsUrl.toString());

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Google Place Details request failed: ${response.status} ${response.statusText} ${text || "n/a"}`
    );
  }

  const json: GooglePlaceDetailsResponse = await response.json();

  if (json.status && json.status !== "OK") {
    throw new Error(
      `Google Place Details API error: ${json.status}${json.error_message ? ` - ${json.error_message}` : ""}`
    );
  }

  return json.result;
}

export async function search({
  term,
  location,
}: YelpSearchType): Promise<MappedBusiness[]> {
  const url = new URL(
    "https://maps.googleapis.com/maps/api/place/textsearch/json"
  );

  url.search = new URLSearchParams({
    query: `${term} in ${location}`,
    key: apiKey,
  }).toString();

  const response = await fetch(url.toString());

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Google Places request failed: ${response.status} ${response.statusText} ${text || "n/a"}`
    );
  }

  const jsonResponse: GoogleTextSearchResponse = await response.json();

  if (jsonResponse.status && jsonResponse.status !== "OK" && jsonResponse.status !== "ZERO_RESULTS") {
    throw new Error(
      `Google Places API error: ${jsonResponse.status}${jsonResponse.error_message ? ` - ${jsonResponse.error_message}` : ""}`
    );
  }

  const results = jsonResponse.results ?? [];

  const mapped = await Promise.all(
    results.map(async (place) => {
      const details = await fetchPlaceDetails(place.place_id);
      const address = details?.formatted_address ?? place.formatted_address ?? place.vicinity ?? "";
      const { city, state, zipCode } = extractAddressParts(details?.address_components);

      return {
        id: place.place_id,
        imageSrc: details?.photos?.[0]?.photo_reference
          ? buildPhotoUrl(details.photos[0].photo_reference)
          : place.photos?.[0]?.photo_reference
            ? buildPhotoUrl(place.photos[0].photo_reference)
            : "",
        name: details?.name ?? place.name,
        address,
        city,
        state,
        zipCode,
        category: details?.types?.[0] ?? place.types?.[0] ?? "",
        rating: details?.rating ?? place.rating ?? 0,
        reviewCount: details?.user_ratings_total ?? place.user_ratings_total ?? 0,
      };
    })
  );

  return mapped;
}

export default search;