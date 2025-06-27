const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');


exports.listJobs = async (req, res) => {
  const jobs = await Job.find().populate('postedBy');
  res.render('jobs/list', { jobs });
};

exports.getNewJob = (req, res) => {
  res.render('jobs/new'); 
};

exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, postedBy: req.session.userId });
    await job.save();
    req.session.success = 'Job posted successfully.';
    res.redirect('/jobs');
  } catch (err) {
    console.error('Job creation error:', err);
    req.session.error = 'Failed to create job.';
    res.redirect('/jobs/new');
  }
};


exports.viewJob = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('postedBy');
  res.render('jobs/detail', { job });
};

exports.applyForJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.session.userId;

  if (!userId) {
    req.session.error = 'You must be logged in to apply.';
    return res.redirect('/login');
  }

  try {
    const alreadyApplied = await Application.findOne({ job: jobId, applicant: userId });

    if (alreadyApplied) {
      req.session.error = 'You have already applied to this job.';
      return res.redirect(`/jobs/${jobId}`);
    }

    await Application.create({
      job: jobId,
      applicant: userId
    });

    req.session.success = 'Application submitted successfully.';
    res.redirect(`/jobs/${jobId}`);
  } catch (err) {
    console.error('Application error:', err);
    req.session.error = 'Failed to apply.';
    res.redirect(`/jobs/${jobId}`);
  }
};