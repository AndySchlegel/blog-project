import mongoose from 'mongoose'

// Schema für Blog-Posts inkl. Validierung, Kategorisierung und Metadaten
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Titel ist erforderlich'],
    maxlength: [160, 'Titel darf höchstens 160 Zeichen haben']
  },

  // Slug wird vor dem Speichern generiert und muss eindeutig sein
  slug: {
    type: String,
    required: [true, 'Slug ist erforderlich'],
    unique: true,
    lowercase: true,
    trim: true
  },

  excerpt: {
    type: String,
    required: [true, 'Excerpt ist erforderlich'],
    maxlength: [400, 'Excerpt darf höchstens 400 Zeichen haben']
  },

  // Hauptinhalt des Beitrags
  content: {
    type: String,
    required: [true, 'Inhalt ist erforderlich']
  },

  coverImage: {
    type: String,
    default: '/images/default-post.jpg'
  },

  // Autor verweist auf das User-Modell
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Autor ist erforderlich']
  },

  // Kategorie via Referenz, damit Metadaten gepflegt werden können
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Kategorie ist erforderlich']
  },

  // Tags erleichtern thematische Gruppierung
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],

  status: {
    type: String,
    enum: ['draft', 'review', 'published', 'archived'],
    default: 'draft'
  },

  featured: {
    type: Boolean,
    default: false
  },

  publishedAt: {
    type: Date,
    default: null
  },

  metrics: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  },

  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

// Indexe für häufige Abfragen (Status, Kategorie, Tags)
postSchema.index({ status: 1, publishedAt: -1 })
postSchema.index({ category: 1, status: 1 })
postSchema.index({ tags: 1 })

// Middleware zum automatischen Slug-Bau
postSchema.pre('validate', function buildSlug (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200)
  }
  next()
})

// Instanz-Methode, um einen Post zu veröffentlichen
postSchema.methods.publish = async function publish () {
  this.status = 'published'
  this.publishedAt = new Date()
  return this.save()
}

// Statische Hilfsmethode für Listings
postSchema.statics.findPublished = function findPublished () {
  return this.find({ status: 'published' })
}

// Virtuelle Kurzfassung für Listing-Komponenten
postSchema.virtual('summary').get(function getSummary () {
  if (this.excerpt) return `${this.excerpt}...`
  if (!this.content) return ''
  return `${this.content.substring(0, 160)}...`
})

// Virtuelle Beziehung zu Kommentaren für schnelles Counting
postSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true
})

// Hot Reload Fix: benutze bereits registriertes Modell, falls vorhanden
const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

export default Post
