import SummaryRatings from './SummaryRatings';

class BookDetails {
    constructor(
        ISBN,
        title,
        language = null,
        published = null,
        edition = null,
        image = null,
        synopsis = null,
        genres = [],
        authorName = null,
        coauthorName = null,
        authorDescription = null,
        goodReadsMeanRating = 0,
        goodReadsNumberRating = 0,
        goodReadsSummaryRatings = null
    ) {
        // Obligatorios
        this.ISBN = ISBN;
        this.title = title;

        // Opcionales con valores predeterminados
        this.language = language;
        this.published = published;
        this.edition = edition;
        this.image = image;
        this.synopsis = synopsis;
        this.genres = genres;
        this.authorName = authorName;
        this.coauthorName = coauthorName;
        this.authorDescription = authorDescription;
        this.goodReadsMeanRating = goodReadsMeanRating;
        this.goodReadsNumberRating = goodReadsNumberRating;

        this.goodReadsSummaryRatings = goodReadsSummaryRatings instanceof SummaryRatings
            ? goodReadsSummaryRatings
            : goodReadsSummaryRatings ? SummaryRatings.fromJSON(goodReadsSummaryRatings) : SummaryRatings();
    }

    static fromJSON(json) {
        const summaryRatings = json.good_reads_summary_ratings
            ? SummaryRatings.fromJSON(json.good_reads_summary_ratings)
            : SummaryRatings();

        return new BookDetails(
            json.ISBN,
            json.title,
            json.language,
            json.published,
            json.edition,
            json.image,
            json.synopsis,
            json.genres || [],
            json.author,
            json.coauthor_name,
            json.author_description,
            json.good_reads_mean_rating || 0,
            json.good_reads_number_rating || 0,
            summaryRatings
        );
    }
}

export default BookDetails;
