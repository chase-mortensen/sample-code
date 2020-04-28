/*
 * Class to describe a single Person

        i. Name
        ii. Popularity
        iii. Image
        ii. Birth date
        iii. Death date (if applicable)
        iv. Place of birth
        v. Biography
        vi. Credits
            1. Image
            2. Title
            3. Year
 */

export class PersonDetail {
    constructor(id, name, popularity, profile_path, birthday, deathday, place_of_birth, biography) {
        this.id = id;
        this.name = name;
        this.popularity = popularity;
        this.profile_path = profile_path;
        this.birthday = birthday;
        this.deathday = deathday;
        this.place_of_birth = place_of_birth;
        this.biography = biography;
    }

    getId() { return this.id; }

    getName() { return this.name; }

    getPopularity() { return this.popularity; }

    getProfilePath() { return this.profile_path; }

    getBirthday() { return this.birthday; }

    getDeathday() { return this.deathday; }

    getPlaceOfBirth() { return this.place_of_birth; }

    getBiography() { return this.biography; }
}