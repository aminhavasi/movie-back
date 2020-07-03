const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema(
    {
        nameMovie: {
            type: String,
            required: true,
        },
        movieImage: {
            type: String,
            required: true,
        },
        sectionPlay: {
            type: String,
            required: true,
        },
        creator: {
            type: String,
        },
        dateMovie: {
            type: String,
        },
    },
    { timestamps: true }
);

const movie = mongoose.model('Movie', movieSchema);
module.exports = movie;
