const apiKey = 'UZNVWNXu_jzZtwbRVzaS1XX2Rnt3cm53cGD5T8jjwsx8WzRLK5aSwbspP68Whx62tVs45RjUQWZe6X1D_9YhFHYoCJ74s8KHgQ5iOe2qgbAP1FgdruA1MjAFskYCX3Yx';
const cors = 'https://cors-anywhere.herokuapp.com/';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`${cors}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        let mappedResult = jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
        return mappedResult;
      }
    });
  }
};

export default Yelp;