import mongoose from 'mongoose'

// Newsletter-Abonnenten separat speichern, um spätere Kampagnen zu ermöglichen
const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Newsletter benötigt eine Email-Adresse'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Bitte eine gültige Email hinterlegen']
  },
  name: {
    type: String,
    maxlength: [80, 'Name darf höchstens 80 Zeichen haben']
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  confirmedAt: {
    type: Date,
    default: null
  },
  unsubscribedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

const NewsletterSubscriber = mongoose.models.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema)

export default NewsletterSubscriber
