import Gig from "../models/gigSchema.js";
import createdError from "../utils/createdError.js";

export async function createGig(req, res, next) {
  if (!req.isSeller) {
    return next(createdError(404, "only sellers can create gig"));
  }
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const saveGig = await newGig.save();
    res.status(201).send(saveGig);
  } catch (err) {
    next(err);
  }
}
export async function deleteGig(req, res, next) {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.userId)
      return next(createdError(404, "you can delete only you gig"));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(201).send("gig was deleted successfully");
  } catch (err) {
    next(err);
  }
}
export async function getGig(req, res, next) {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createdError(404, "Gig was not found"));
    res.status(201).send(gig);
  } catch (err) {
    next(err);
  }
}
export async function getGigs(req, res, next) {
  try {
    const gigs = await Gig.find();
    res.status(201).send(gigs);
  } catch (err) {
    next(err);
  }
}
