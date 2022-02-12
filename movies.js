
const searchBtn = document.querySelector("#submitButton");
const outputMovies = document.querySelector("#outputMovies");


// create and modify elements to display the movies
const showMovies = (movieList) => {
    movieList.forEach(movie => {
        let section = document.createElement("section");
        let movieTitle = document.createElement("h3");
        let releaseDate = document.createElement("p");
        let overview = document.createElement("p");
        let voteAverage = document.createElement("p");
        let img = document.createElement("img");

        movieTitle.textContent = `${movie.title}`;
        releaseDate.textContent = `Release Date: ${movie.release_date}`;
        overview.textContent = `Overview: ${movie.overview}`;
        voteAverage.textContent = `Vote Average: ${movie.vote_average}`;
        img.setAttribute("src", `https://image.tmdb.org/t/p/original//${movie.poster_path}`);
        img.setAttribute("alt", movie.title);

        section.appendChild(img);
        section.appendChild(movieTitle);
        section.appendChild(releaseDate);
        section.appendChild(overview);
        section.appendChild(voteAverage);

        document.querySelector("#outputMovies").appendChild(section);

    });
        
}

// Fetch Upcoming movies
const fetchUpcoming = () => {
    let upcomingAPI = "https://api.themoviedb.org/3/movie/upcoming?api_key=bd041fa2e256f45d9d1276c86351c5fe";

    fetch(upcomingAPI)
        .then((response) => response.json())
        .then(movieUpcoming => {
            const upcomingList = movieUpcoming.results;
            //console.log(upcomingList);
            showMovies(upcomingList);
        });
}

// Fetch popular movies
const fetchPopular = () => {
    let popularAPI = "https://api.themoviedb.org/3/movie/popular?api_key=bd041fa2e256f45d9d1276c86351c5fe";

    fetch(popularAPI)
        .then((response) => response.json())
        .then(moviePopular => {
            const popularList = moviePopular.results;
            //console.log(popularList);
            showMovies(popularList);
        });
}

// Fetch now playing movies
const fetchNowPlaying = () => {
    let nowPlayingAPI = "https://api.themoviedb.org/3/movie/now_playing?api_key=bd041fa2e256f45d9d1276c86351c5fe";

    fetch(nowPlayingAPI)
        .then((response) => response.json())
        .then(movieNowPlaying => {
            const nowPlayingList = movieNowPlaying.results;
            showMovies(nowPlayingList);
        });
}

// Fetch top-rated movies
const fetchTopRated = () => {
    let topRatedAPI = "https://api.themoviedb.org/3/movie/top_rated?api_key=bd041fa2e256f45d9d1276c86351c5fe";

    fetch(topRatedAPI)
        .then((response) => response.json())
        .then(movieTopRated => {
            const topRatedList = movieTopRated.results;
            showMovies(topRatedList);
        });
}

const searchForMovies = () => {
    reset();
    const movieSearch = document.querySelector("#searchMovies").value;
    const urlAPI = "https://api.themoviedb.org/3/search/movie?api_key=bd041fa2e256f45d9d1276c86351c5fe&include_adult=false";
    const searchMoviesAPI = `${urlAPI}&query=${movieSearch}`;

    fetch(searchMoviesAPI)
        .then((response) => response.json())
        .then(searchMovies => {
            const searchMoviesList = searchMovies.results;
            console.log(searchMoviesList);
            if (searchMoviesList.length == 0){
                outputMovies.textContent = `No results for "${movieSearch}"`;
           }
            else {
            showMovies(searchMoviesList);
        }
        }).catch((error) => {
            console.log(error);
        });

}

// clears all elements in the output
const reset = () => {
    document.querySelector('#outputMovies').innerHTML = "";

}

// check which category is checked
const chooseCategory = () => {
    reset ();

    let movieCategory = document.getElementsByName("movie");

    if (movieCategory[0].checked) {
        fetchUpcoming();
    }

    else if (movieCategory[1].checked) {
        fetchPopular();
    }

    else if (movieCategory[2].checked) {
        fetchNowPlaying();
    }

    else if (movieCategory[3].checked) {
        fetchTopRated();

    }

}

// add event listener
document.querySelector('#categories').addEventListener('click', chooseCategory);
document.querySelector("#submitButton").addEventListener('click', searchForMovies);





  