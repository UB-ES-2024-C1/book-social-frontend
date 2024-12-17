class Review {
    constructor(rating, book, comment = null, authorName = null, authorImage = null, authorUsername = null, creationDate = new Date()) {
        this.rating = rating;
        this.book = book;
        this.comment = comment;
        this.authorName = authorName;
        this.authorImage = authorImage;
        this.authorUsername = authorUsername;
        this.creationDate = creationDate; // Fecha de creación
    }

    // Método estático para crear una instancia de Review a partir de un objeto JSON
    static fromJSON(json) {
        const author = json.user || {};
        return new Review(
            json.rating,
            json.book,
            json.comment || null,
            `${author.firstName} ${author.lastName}` || null,
            author.image || null,
            author.username || null,
            json.creation_date ? new Date(json.creation_date) : new Date()
        );
    }
}

export default Review;
