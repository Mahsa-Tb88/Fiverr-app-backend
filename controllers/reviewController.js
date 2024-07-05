import Gig from "../models/gigSchema.js";
import Review from "../models/reviewSchema.js";
import createdError from "../utils/createdError.js";

export async function createReview(req, res, next) {
  if (req.isSeller)
    return next(createdError(404, "Seller can not create a review"));

  const newReview = new Review({
    gigId: req.body.gigId,
    userId: req.userId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      userId: req.userId,
      gigId: req.body.gigId,
    });
    if (review)
      return next(createdError(403, "You have already created review"));

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, numberStar: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    return next(err);
  }
}

export async function getReviews(req, res, next) {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    return next(err);
  }
}
export async function deleteReviews(req, res, next) {
  try {
  } catch (err) {
    return next(err);
  }
}
