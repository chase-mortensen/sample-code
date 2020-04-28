/*
 * A single location to obtain routes for the web API
 */

let ApiService = class ApiService {
	constructor() {
		// this.apiProtocol = 'https:';
		// this.apiHost = 'facebook.github.io/react-native';
		this.apiProtocol = 'https:';
		this.apiHost = 'api.themoviedb.org/3';
		this.apiKey = '07abbf429f10e2832a1fe5978d84f746';
	}

	/*
	* Utility methods/properties
	*/
	get apiLocation() {
		return `${this.apiProtocol}//${this.apiHost}`;
	}

	//https://image.tmdb.org/t/p/w300_and_h450_bestv2
	getPosterPath() {
		return `https://image.tmdb.org/t/p/w300_and_h450_bestv2`;
	}

	// https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=07abbf429f10e2832a1fe5978d84f746
	getGenreList() {
		return `${this.apiLocation}/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
	}

	// https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&with_genres=##&api_key=07abbf429f10e2832a1fe5978d84f746");
	getSpecificGenreList(page, genreId) {
		console.log("Genre ID: " + genreId + ", Page: " + page);
		return `${this.apiLocation}/discover/movie?include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&with_genres=${genreId}&page=1&api_key=${this.apiKey}`;
	}

	getMovieDetails(movieId) {
		console.log("Movie ID: " + movieId);
		return `${this.apiLocation}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
	}

	// CAST: https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
	getCastOfMovie(movieId) {
		return `${this.apiLocation}/movie/${movieId}/credits?api_key=${this.apiKey}`;
	}

	// https://api.themoviedb.org/3/search/person?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
	searchPeople(searchString) {
		return `${this.apiLocation}/search/person?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${searchString}`;
	}

	// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
	searchMovie(searchString) {
		return `${this.apiLocation}/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${searchString}`;
	}

	// https://api.themoviedb.org/3/person/{personId}?api_key=07abbf429f10e2832a1fe5978d84f746&language=en-US
	// ^ get details for a cast member
	getPersonDetails(personId) {
		return `${this.apiLocation}/person/${personId}?api_key=${this.apiKey}&language=en-US`;
	}

	//https://api.themoviedb.org/3/person/1821863/movie_credits?api_key=07abbf429f10e2832a1fe5978d84f746&language=en-US
	// ^ example movie credits for a cast member
	getPersonCredits(personId) {
		console.log("api service... personId: " + personId);
		return `${this.apiLocation}/person/${personId}/movie_credits?api_key=${this.apiKey}&language=en-US`;
	}
};

// Create a Singleton
const apiService = new ApiService();
export default apiService;
