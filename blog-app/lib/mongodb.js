import mongoose from 'mongoose'

// Globale Konstante für die Verbindungs-URL; fällt auf lokale DB zurück, wenn keine ENV-Variable gesetzt ist
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mein-blog'

if (!MONGODB_URI) {
  // Frühzeitiger Abbruch, damit wir beim Start sofort merken, dass die Verbindungskette fehlt
  throw new Error('Bitte setze die Umgebungsvariable MONGODB_URI für MongoDB Verbindungen.')
}

// Connection-Caching beugt Mehrfachverbindungen im Next.js App Router vor (Hot Reloading)
let cached = global._mongooseCached

if (!cached) {
  cached = {
    conn: null,
    promise: null
  }
  global._mongooseCached = cached
}

mongoose.set('strictQuery', true) // Entfernt Warnungen und sorgt für explizite Query-Felder

async function connectDB () {
  if (cached.conn) {
    // Bereits bestehende Verbindung wiederverwenden
    return cached.conn
  }

  if (!cached.promise) {
    // Einmaliges Promise, das für parallele Verbindungsversuche wiederverwendet wird
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        autoIndex: true, // Indizes automatisch anlegen (für Entwicklungszwecke praktisch)
        serverSelectionTimeoutMS: 5000
      })
      .then((mongooseInstance) => {
        console.log('✅ Mit MongoDB verbunden!')
        return mongooseInstance
      })
      .catch((error) => {
        console.error('❌ MongoDB Verbindung fehlgeschlagen:', error)
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    // Falls das Promise fehlschlägt, unbedingt zurücksetzen, damit ein neuer Versuch möglich ist
    cached.promise = null
    throw error
  }

  return cached.conn
}

export default connectDB
