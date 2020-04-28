/*
 * Class to describe a single Movie
    d. People
        i. Name
        ii. Popularity
        iii. Image
        3. Character name
 */

export class PersonSummary {
    constructor(id, cast_id, name, popularity, profile_path, character) {
        this.id = id;
        this.cast_id = cast_id;
        this.name = name;
        this.popularity = popularity;
        this.profile_path = profile_path;
        this.character = character;
    }

    getId() { return this.id; }

    getCastId() { return this.cast_id; }

    getName() { return this.name; }

    getPopularity() { return this.popularity; }

    getProfilePath() { return this.profile_path; }

    getCharacter() { return this.character; }
}