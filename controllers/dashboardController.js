const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  const userId = req.session.userId;
  const role = req.session.role;

  if (!userId) return res.redirect('/login');

  if (role === 'admin') {
    const users = await User.find();
    const jobs = await Job.find();
    res.render('dashboard/admin', { users, jobs });
  } else if (role === 'employer') {
    const jobs = await Job.find({ postedBy: userId });
    res.render('dashboard/employer', { jobs });
  } else {
    const applications = await Application.find({ applicant: userId }).populate('job');
    res.render('dashboard/seeker', { applications });
  }
};
