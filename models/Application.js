// const mongoose = require('mongoose');

// const applicationSchema = new mongoose.Schema({
//   job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
//   applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   resumeLink: String,
//   coverLetter: String,
//   appliedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Application', applicationSchema);

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
