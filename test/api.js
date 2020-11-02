
export const fetchMovies = async (query) => {
    let url = `http://omdbapi.com/?apikey=4c3128ae&s=${query}&page=1`
    try {
        const response = await fetch(url);
        const results = await response.json();
        const movieArray = results.Search
        return movieArray;
    } catch(err) {
        console.log(err);
    }
}

export const fetchById = async (id) => {
    let url = `https://www.omdbapi.com/?apikey=4c3128ae&i=${id}`
    try {
        const response = await fetch(url);
        const results = await response.json();
        console.log(results);
        return results;
    } catch(err) {
        console.log(err);
    }
}
