import createdError from "../utils/createdError.js";

export async function createGig(req, res, next) {
  if (!req.isSeller)
    return next(createdError(404, "only sellers can create gig"));
  const newGig = new getGig({
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
export async function deleteGig(req, res, next) {}
export async function getGig(req, res, next) {}
export async function getGigs(req, res, next) {}
