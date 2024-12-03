class BookSummary {
    constructor(
        id,
        image = null,
        title = null,
        synopsis = null,
        authorName = null,
        googleAverageRating = null
    ) {
        if (id === null || id === undefined) {
            throw new Error("The 'id' field is required and cannot be null or undefined.");
        }

        this.id = id;
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
     * @throws {Error} - If the ID is missing or invalid
     */
    static fromJSON(json) {
        if (!json.id && json.id !== 0) {
            throw new Error("The 'id' field is required in the JSON data.");
        }

        return new BookSummary(
            json.id,
            json.image_url || null,
            json.title || null,
            json.shortSynopsis || json.synopsis || null,
            `${json.author?.firstName || ""} ${json.author?.lastName || ""}`.trim(),
            json.reviewValue || null
        );
    }
}

export default BookSummary;
