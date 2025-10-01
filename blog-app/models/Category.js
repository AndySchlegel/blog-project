import mongoose from 'mongoose'

// Schema beschreibt eine Kategorie-Hierarchie für Posts
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Kategorie benötigt einen Namen'],
    maxlength: [60, 'Kategorie darf höchstens 60 Zeichen haben']
  },
  slug: {
    type: String,
    required: [true, 'Kategorie benötigt einen Slug'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten']
  },
  description: {
    type: String,
    maxlength: [240, 'Beschreibung darf höchstens 240 Zeichen haben']
  },
  icon: {
    type: String,
    default: 'category-default'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index erleichtert Suchen nach Namen (case-insensitive)
categorySchema.index({ name: 1 })

// Virtueller Helfer für lesbare Breadcrumbs
categorySchema.virtual('breadcrumb').get(function getBreadcrumb () {
  return [this.name]
})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category
