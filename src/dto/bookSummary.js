class BookSummary {
    constructor(
        image = null,
        title = null,
        synopsis = null,
        authorName = null,
        googleAverageRating = null
    ) {
        this.image = image;
        this.title = title;
        this.synopsis = synopsis;
        this.authorName = authorName;
        this.googleAverageRating = googleAverageRating;
    }

    /**
     * Creates a BookSummary instance from a JSON object
     * @param {Object} json - JSON object containing the book summary data
     * @returns {BookSummary} - Instance of BookSummary class
     */
    static fromJSON(json) {
        return new BookSummary(
            json.image || null,
            json.title || null,
            json.synopsis || null,
            json.authorName || null,
            json.googleAverageRating || null
        );
    }
}

export default BookSummary;
