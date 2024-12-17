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
        const author = json.author || {};
        return new Review(
            json.rating,
            json.book,
            json.comment || null,
            author.name || null,
            author.image || null,
            author.username || null,
            json.creationDate ? new Date(json.creationDate) : new Date()
        );
    }
}

export default Review;
