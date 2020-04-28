/*
 * Class to describe a Credit
    image
    title
    year
 */

export class Credit {
    constructor(poster_path, title, release_date) {
        this.poster_path = poster_path;
        this.title = title;
        this.release_date = release_date;
    }

    getPosterPath() {
        return this.poster_path;
    }

    getTitle() {
        return this.title;
    }

    getReleaseDate() {
        return this.release_date;
    }
}