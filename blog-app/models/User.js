import mongoose from 'mongoose'

// Schema beschreibt die Form eines Benutzer-Dokuments
const userSchema = new mongoose.Schema({
  // Pflichtfeld: sichtbarer Name des Users
  name: {
    type: String,
    required: [true, 'Name ist erforderlich'],
    minlength: [2, 'Name muss mindestens 2 Zeichen haben']
  },

  // Pflichtfeld: E-Mail Adresse inkl. Validierung und Normalisierung
  email: {
    type: String,
    required: [true, 'Email ist erforderlich'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Bitte gültige Email eingeben']
  },

  password: {
    type: String,
    required: [true, 'Passwort ist erforderlich'],
    minlength: [6, 'Passwort muss mindestens 6 Zeichen haben'],
    select: false
  },

  // Optionale Altersangabe mit Plausibilitätsgrenzen
  alter: {
    type: Number,
    min: [0, 'Alter kann nicht negativ sein'],
    max: [120, 'Alter muss realistisch sein']
  },

  // Automatisches Registrierungsdatum (Default = Jetzt)
  registriertAm: {
    type: Date,
    default: Date.now
  },

  // Einfache Liste von Hobbys als Strings
  hobbies: [String],

  avatar: {
    type: String,
    default: '/images/default-avatar.png'
  },

  // Verschachtelte Adresse; ASCII-Felder, damit Deployment-Umgebungen keine Probleme bekommen
  adresse: {
    strasse: String,
    plz: String,
    stadt: String,
    land: {
      type: String,
      default: 'Deutschland'
    }
  },

  // Optionale Klassifizierung, z.B. aus Batch-Updates
  kategorie: String,

  // Referenzen auf Lieblings-Posts für spätere Population
  lieblingsPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true // Erstellt automatisch createdAt und updatedAt
})

// Bereits existierende Modelle wiederverwenden (Hot Reload Fix)
const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
