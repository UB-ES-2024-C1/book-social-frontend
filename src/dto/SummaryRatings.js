class SummaryRatings {
    constructor(fiveStars = 0, fourStars = 0, threeStars = 0, twoStars = 0, oneStars = 0) {
        this.fiveStars = fiveStars;
        this.fourStars = fourStars;
        this.threeStars = threeStars;
        this.twoStars = twoStars;
        this.oneStars = oneStars;
    }

    static fromJSON(json) {
        return new SummaryRatings(
            json.five_stars || 0,
            json.four_stars || 0,
            json.three_stars || 0,
            json.two_stars || 0,
            json.one_stars || 0
        );
    }
}

export default SummaryRatings;
