import BookSummary from './bookSummary';

class Profile {
    constructor(
        name = null,
        lastname = null,
        email = null,
        username = null,
        role = null,
        favGenre = null,
        description = null,
        id = null,
        image = null,
        coverImage = null,
        post = [],
        books = []
    ) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.role = role;
        this.favGenre = favGenre;
        this.description = description;
        this.id = id;
        this.image = image;
        this.coverImage = coverImage;

        // Asignar `post` o `books` según el rol
        if (role === "reader") {
            this.post = post || [];
            this.books = [];
        } else if (role === "writer") {
            this.books = (books || []).map(book => BookSummary.fromJSON(book));
            this.post = [];
        } else {
            this.post = [];
            this.books = [];
        }
    }

    /**
     * Creates a Profile instance from a JSON object
     * @param {Object} json - JSON object containing the profile data
     * @returns {Profile} - Instance of Profile class
     */
    static fromJSON(json) {
        return new Profile(
            json.name || null,
            json.lastname || null,
            json.email || null,
            json.username || null,
            json.role || null,
            json.favGenre || null,
            json.description || null,
            json.id || null,
            json.image || null,
            json.coverImage || null,
            json.post || [],
            json.books || []
        );
    }
}

export default Profile;
