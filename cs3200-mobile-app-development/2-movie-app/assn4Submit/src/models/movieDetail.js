/*
 * Class to describe a single Movie
    i. All items from list page
        1. Poster image
        2. Title
        3. Popularity
        4. Release Date
    ii. Genres
    iii. Full overview
    iv. Budget
    v. Revenue
    vi. Status
    vii. Cast
        1. Image
        2. Person name
        3. Character name
 */

export class MovieDetail {
    constructor(id, title, popularity, release_date, overview, poster_path, genres, budget, revenue, status) {
        this.id = id;
        this.title = title;
        this.popularity = popularity;
        this.release_date = release_date;
        this.overview = overview;
        this.poster_path = poster_path;
        this.genres = genres;
        this.budget = budget;
        this.revenue = revenue;
        this.status = status;
    }

    getId() { return this.id; }

    getTitle() { return this.title; }

    getPopularity() { return this.popularity; }

    getReleaseDate() { return this.release_date; }

    getOverview() { return this.overview; }

    getPosterPath() { return this.poster_path; }

    getGenres() { return this.genres; }

    getBudget() { return this.budget; }

    getRevenue() { return this.revenue; }

    getStatus() { return this.status; }
}