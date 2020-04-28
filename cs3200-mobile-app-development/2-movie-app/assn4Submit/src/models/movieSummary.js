/*
 * Class to describe a single Movie
  
      i. Poster image
      ii. Title
      iii. Popularity
      iv. Release Date
      v. Overview (Not the entire thing, just the first bit)
 */

export class MovieSummary {
    constructor(id, title, popularity, release_date, overview, poster_path) {
        this.id = id;
        this.title = title;
        this.popularity = popularity;
        this.release_date = release_date;
        this.overview = overview;
        this.poster_path = poster_path;
    }

    getId() { return this.id; }

    getTitle() { return this.title; }

    getPopularity() { return this.popularity; }

    getReleaseDate() { return this.release_date; }

    getOverview() { return this.overview; }

    getPosterPath() { return this.poster_path; }
}