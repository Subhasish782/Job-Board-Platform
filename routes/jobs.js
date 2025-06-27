// const express = require('express');
// const router = express.Router();
// const Job = require('../models/Job');
// const { isEmployer } = require('../middleware/auth');
// const jobController = require('../controllers/jobController');


// // GET all jobs
// router.get('/', async (req, res) => {
//   const jobs = await Job.find().populate('postedBy');
//   res.render('jobs/list', { jobs });
// });

// // GET job form
// router.get('/new', isEmployer, (req, res) => {
//   res.render('jobs/new');
// });

// // POST create job
// router.post('/', isEmployer, async (req, res) => {
//   const job = new Job({ ...req.body, postedBy: req.session.userId });
//   await job.save();
//   res.redirect('/jobs');
// });

// // GET single job
// router.get('/:id', async (req, res) => {
//   const job = await Job.findById(req.params.id).populate('postedBy');
//   res.render('jobs/detail', { job });
// });

// router.post('/:id/apply', jobController.applyForJob);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const jobController = require('../controllers/jobController');
// const Application = require('../models/Application');


// // Route to list jobs
// router.get('/', jobController.listJobs);

// // Route to view job detail
// router.get('/:id', jobController.viewJob);

// // Route to render job creation form
// router.get('/new', jobController.getNewJob);

// // Route to create job
// router.get('/new', jobController.getNewJob);
// router.post('/', jobController.createJob);

// // Route to apply to a job
// router.get('/:id', jobController.viewJob); 
// router.post('/:id/apply', jobController.applyForJob);

// module.exports = router;
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');


router.get('/new', jobController.getNewJob);       
router.post('/', jobController.createJob);         

// 
router.get('/:id', jobController.viewJob);         
router.post('/:id/apply', jobController.applyForJob); 

// 
router.get('/', jobController.listJobs);           

module.exports = router;
