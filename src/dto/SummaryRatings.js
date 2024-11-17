class SummaryRatings {
    constructor(fiveStarts = 0, fourStarts = 0, threeStarts = 0, twoStarts = 0, oneStarts = 0) {
        this.fiveStarts = fiveStarts;
        this.fourStarts = fourStarts;
        this.threeStarts = threeStarts;
        this.twoStarts = twoStarts;
        this.oneStarts = oneStarts;
    }

    static fromJSON(json) {
        return new SummaryRatings(
            json.five_starts || 0,
            json.four_starts || 0,
            json.three_starts || 0,
            json.two_starts || 0,
            json.one_starts || 0
        );
    }
}

export default SummaryRatings;
