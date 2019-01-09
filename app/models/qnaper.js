let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//Qnap schema definition
let QnaperSchema = new Schema(
  {
      name: { type: String, required: true },
      job: { type: String, required: true },
      age: { type: Number, required: true, min: 1 },
      createdAt: { type: Date, default: Date.now },
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
QnaperSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});


module.exports = mongoose.model('qnaper', QnaperSchema);