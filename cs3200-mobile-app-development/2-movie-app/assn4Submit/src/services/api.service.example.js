/*
 * A single location to obtain routes for the web API
 */

// THIS CODE STARTS A GUEST SESSION
// var data = "{}";

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("GET", "https://api.themoviedb.org/3/authentication/guest_session/new?api_key=07abbf429f10e2832a1fe5978d84f746");

// xhr.send(data);

// GET GENRES

// xhr.open("GET", "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=07abbf429f10e2832a1fe5978d84f746");

// GET MOVIE BY ID

// xhr.open("GET", "https://api.themoviedb.org/3/movie/%7Bmovie_id%7D?language=en-US&api_key=%3C%3Capi_key%3E%3E");


// let ApiService = class ApiService {
// 	constructor() {
// 		this.apiProtocol = 'https:';
// 		this.apiHost = 'facebook.github.io/react-native';
// 	}

let ApiService = class ApiService {
	constructor() {
		this.apiProtocol = 'https:';
		this.apiHost = 'facebook.github.io/react-native';
	}

	/*
	* Utility methods/properties
	*/
	get apiLocation() {
		return `${this.apiProtocol}//${this.apiHost}`;
	}

	/*
	* API addresses
	*/
	getMovieList() {
		return `${this.apiLocation}/movies.json`;
	}
};

// Create a Singleton
const apiService = new ApiService();
export default apiService;
