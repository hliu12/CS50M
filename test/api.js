export const fetchMovies = async () => {
    const response = await fetch('http://omdbapi.com/?apikey=4c3128ae&s&t=21');
    const {results} = await response.json();
    return results.map(formatMovies);
}

const formatMovies = movie => ({
    // Figure out json response format
    Title = movie.title;
    Year = ;
})