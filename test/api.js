
// Makes a call to the open movie database API based off query and page num
export const fetchMovies = async (query, page) => {
    let url = `http://omdbapi.com/?apikey=4c3128ae&s=${query}&page=${page}`
    try {
        const response = await fetch(url);
        const results = await response.json();
        const movieArray = results.Search
        return movieArray;
    } catch(err) {
        console.log(err);
    }
}

// Makes an API call based off of imdb movie ID
export const fetchById = async (id) => {
    let url = `https://www.omdbapi.com/?apikey=4c3128ae&i=${id}`
    try {
        const response = await fetch(url);
        const results = await response.json();
        return results;
    } catch(err) {
        console.log(err);
    }
}
