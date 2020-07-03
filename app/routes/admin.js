const express = require('express');
const router = express.Router();
const fs = require('fs');
const Movie = require('./../models/movies');
const path = require('path');
const persinDate = require('persian-date');
persinDate.toLocale('en');
const date = new persinDate().format('YYYY/M/DD');
router.post('/create-movie', async (req, res) => {
    try {
        if (req.files) {
            req.files.file.name = req.body.name;
            const pathMovie = await path.resolve(
                __dirname,
                `../resource/${req.files.file.name}.png`
            );
            await fs.writeFile(pathMovie, req.files.file.data, function (err) {
                if (err) {
                    res.status(400).send('something went wrong');
                }
            });
            const newMovie = await {
                nameMovie: req.body.name,
                movieImage: pathMovie,
                sectionPlay: req.body.sectionPlay,
                creator: 'admin',
                dateMovie: date,
            };
            const movie = await new Movie(newMovie).save();
            await res.status(200).send(movie);
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;
