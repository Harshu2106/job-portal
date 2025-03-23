import Job from "../models/jobsModel.js";

// Create a new job
export const createJobController = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

// Get all jobs
export const getAllJobsController = async (req, res, next) => {
  try {
    const jobs = await Job.find({});
    res.status(200).json({ jobs });
  } catch (error) {
    next(error);
  }
};

// Update a job
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!job) {
      return next("Job not found");
    }
    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

// Delete a job
export const deleteJobController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return next("Job not found");
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Get job statistics
export const jobStatsController = async (req, res, next) => {
  try {
    const stats = await Job.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    res.status(200).json({ stats });
  } catch (error) {
    next(error);
  }
};
