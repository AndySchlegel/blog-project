import mongoose from 'mongoose'

// Schema kapselt Kommentare inklusive geschachtelter Antworten
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Kommentar benötigt einen Inhalt'],
    minlength: [3, 'Kommentar muss mindestens 3 Zeichen haben'],
    maxlength: [2000, 'Kommentar darf höchstens 2000 Zeichen haben']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Kommentar benötigt einen Autor']
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'Kommentar benötigt einen Ziel-Post']
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'spam'],
    default: 'approved'
  }
}, {
  timestamps: true
})

// Indexe erleichtern häufige Abfragen (z.B. alle Kommentare eines Posts)
commentSchema.index({ post: 1, createdAt: -1 })
commentSchema.index({ parentComment: 1 })

// Virtuelles Feld listet Antworten auf (wird via populate() geladen)
commentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
  match: { status: 'approved' }
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment
