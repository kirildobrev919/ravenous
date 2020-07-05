const apiKey = 'UZNVWNXu_jzZtwbRVzaS1XX2Rnt3cm53cGD5T8jjwsx8WzRLK5aSwbspP68Whx62tVs45RjUQWZe6X1D_9YhFHYoCJ74s8KHgQ5iOe2qgbAP1FgdruA1MjAFskYCX3Yx';

const Yelp = {

}

let search = (term, location, sortBy) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`)
}