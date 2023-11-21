const Review = require('../models/reviews')

class ReviewController {
    // GET /
    index(req, res, next) {
        Review.find({}).limit(10).sort({})
            .then(reviews => res.status(200).json(reviews))
            .catch(next);
    }

    // GET /:id
    show(req, res, next) {
        Review.find({
            userId: req.params.id
        })
            .limit(10)
            .exec()
            .then((reviews) => {
                res.status(200).json(reviews)
            })
            .catch(next);
    }

    // POST /
    review(req, res, next) {
        // validation
        
        const newReview = new Review(
            req.body
        )
        newReview.save();

        return res.status(200).json(data);
    }
}

module.exports = new ReviewController;