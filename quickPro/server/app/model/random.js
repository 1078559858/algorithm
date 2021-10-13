module.exports = app => {
  const mongoose = app.mongoose

  const AttachmentSchema = new mongoose.Schema({
    id: { type: String },
    data: {  type: Array  },
    createdAt: { type: Date, default: Date.now }
  })
  
  return mongoose.model('random', AttachmentSchema)
}