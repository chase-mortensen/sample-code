//-------------------------------------------------------------------
//
// The purpose of this class is to provide a single location that the
// rest of the application can use to obtain URL routes for working with
// the backend API.
//
//-------------------------------------------------------------------
import apiService from './api.service';
import { MovieExample } from '../models/movieExample';
import { Genre } from '../models/genre';
import { MovieSummary } from '../models/movieSummary';
import { MovieDetail } from '../models/movieDetail';
import { PersonSummary } from '../models/personSummary';
import { PersonDetail } from '../models/personDetail';
import { Credit } from '../models/credit';

let MovieService = class MovieService {
	constructor() {
	}
    
    // getMovies() {
    //     return new Promise((resolve, reject) => {
    //         fetch(apiService.getMovieList())
    //         .then((response) => response.json())
    //         .then((response) => {
    //             let items = [];
    //             response.movies.forEach(element => {
    //                 items.push(new MovieExample(element.title, element.releaseYear));
    //             });
    //             resolve(items);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             reject(error);
    //         });
    //     });
    // }

    // MovieDetail constructor(id, title, popularity, release_date, overview, poster_path, genres, budget, revenue, status)
    getMovieDetails(movieId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieDetails(movieId))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                items.push(new MovieDetail(response.id, response.title, response.popularity,
                    response.release_date, response.overview, response.poster_path, response.genres,
                    response.budget, response.revenue, response.status));
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    // PersonSummary constructor(id, cast_id, name, popularity, profile_path, character)
    getCastOfMovie(movieId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getCastOfMovie(movieId))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.cast.forEach(element => {
                    items.push(new PersonSummary(element.id, element.cast_id, element.name, element.popularity, element.profile_path, element.character));
                    console.log("movie.service: name=" + element.name);
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getGenresOfMovie(movieId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getMovieDetails(movieId))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.genres.forEach(element => {
                    items.push(new Genre(element.id, element.name));
                    console.log("movie.service: id=" + element.id + ", name=" + element.name);
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getGenres() {
        return new Promise((resolve, reject) => {
            fetch(apiService.getGenreList())
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.genres.forEach(element => {
                    items.push(new Genre(element.id, element.name));
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    // MovieSummary constructor(id, title, popularity, release_date, overview, poster_path)
    getSpecificGenre(page, genreId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getSpecificGenreList(page, genreId))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.results.forEach(element => {
                    items.push(new MovieSummary(element.id, element.title, element.popularity, element.release_date, element.overview, element.poster_path));
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    // PersonSummary constructor(id, cast_id, name, popularity, profile_path, character)
    searchPeople(searchString) {
        return new Promise((resolve, reject) => {
            fetch(apiService.searchPeople(searchString))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.results.forEach(element => {
                    items.push(new PersonSummary(element.id, element.cast_id, element.name, element.popularity, element.profile_path, element.character));
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    // MovieSummary constructor(id, title, popularity, release_date, overview, poster_path)
    searchMovie(searchString) {
        return new Promise((resolve, reject) => {
            fetch(apiService.searchMovie(searchString))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.results.forEach(element => {
                    items.push(new MovieSummary(element.id, element.title, element.popularity, element.release_date, element.overview, element.poster_path));
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    // PersonDetail constructor(id, name, popularity, profile_path, birthday, deathday, place_of_birth, biography)
    getPersonDetail(personId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getPersonDetails(personId))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                items.push(new PersonDetail(response.id, response.name, response.popularity,
                    response.profile_path, response.birthday, response.deathday, 
                    response.place_of_birth, response.biography));
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

    getPersonCredits(personId) {
        return new Promise((resolve, reject) => {
            fetch(apiService.getPersonCredits(personId))
            .then((response) => response.json())
            .then((response) => {
                let items = [];
                response.cast.forEach(element => {
                    items.push(new Credit(element.poster_path, element.title, element.release_date));
                });
                resolve(items);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
        });
    }

};

// Create a Singleton
const movieService = new MovieService();
export default movieService;
