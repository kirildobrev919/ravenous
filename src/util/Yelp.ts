import { MappedBusiness, YelpSearchResponse, YelpSearchType } from "./types";

const apiKey = '';
const cors = 'https://cors-anywhere.herokuapp.com/';

export async function search({
  term,
  location,
  sortBy,
}: YelpSearchType): Promise<MappedBusiness[]> {
  const url = new URL("https://api.yelp.com/v3/businesses/search");
  url.search = new URLSearchParams({
    term,
    location,
    sort_by: sortBy,
  }).toString();

  const response = await fetch(`${cors}${url.toString()}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Yelp request failed: ${response.status} ${response.statusText}${text ?? "n/a"}`
    );
  }

  const jsonResponse: YelpSearchResponse = await response.json();

  return (jsonResponse.businesses ?? []).map((business) => ({
    id: business.id,
    imageSrc: business.image_url,
    name: business.name,
    address: business.location?.address1 ?? "",
    city: business.location?.city ?? "",
    state: business.location?.state ?? "",
    zipCode: business.location?.zip_code ?? "",
    category: business.categories?.[0]?.title ?? "",
    rating: business.rating,
    reviewCount: business.review_count,
  }));
}

export default search;