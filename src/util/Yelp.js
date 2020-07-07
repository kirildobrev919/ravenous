const apiKey = 'UZNVWNXu_jzZtwbRVzaS1XX2Rnt3cm53cGD5T8jjwsx8WzRLK5aSwbspP68Whx62tVs45RjUQWZe6X1D_9YhFHYoCJ74s8KHgQ5iOe2qgbAP1FgdruA1MjAFskYCX3Yx';

const Yelp = {
    async search (term, location, sortBy) {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            });
        const jsonResponse = await response.json();
        if (jsonResponse.businesses) {
            jsonResponse.businesses.map(business => {
                console.log(business);
                return {
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zipCode,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.reviewCount
                };
            });
        }
    }
}

export default Yelp;