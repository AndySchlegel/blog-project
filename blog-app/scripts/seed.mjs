#!/usr/bin/env node

import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config({ path: '.env.local' })

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI ist nicht gesetzt. Bitte .env.local prüfen.')
  process.exit(1)
}

const [{ default: dbConnect }, { default: Category }, { default: User }, { default: Post }, { default: Comment }, { default: NewsletterSubscriber }] = await Promise.all([
  import('../lib/mongodb.js'),
  import('../models/Category.js'),
  import('../models/User.js'),
  import('../models/Post.js'),
  import('../models/Comment.js'),
  import('../models/NewsletterSubscriber.js')
])

/**
 * Seed-Skript legt einige Beispiel-Datensätze für Workshops an.
 * Für produktive Nutzung bitte durch dedizierte Migrationen ersetzen.
 */

const CATEGORIES = [
  { name: 'Technology', slug: 'technology', description: 'Aktuelle Entwicklungen aus Tech & IT', icon: 'cpu' },
  { name: 'Programming', slug: 'programming', description: 'Code, Patterns und Best Practices', icon: 'code' },
  { name: 'Design', slug: 'design', description: 'UI/UX, Tools und Inspiration', icon: 'palette' }
]

const USERS = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    hobbies: ['Schreiben', 'Lesen'],
    adresse: { stadt: 'Berlin', land: 'Deutschland' },
    kategorie: 'admin'
  },
  {
    name: 'Author Annie',
    email: 'annie@example.com',
    password: 'author123',
    hobbies: ['Programmieren', 'Design'],
    adresse: { stadt: 'Hamburg', land: 'Deutschland' },
    kategorie: 'author'
  }
]

const SAMPLE_POSTS = [
  {
    title: 'Warum Next.js 15 den App Router noch besser macht',
    excerpt: 'Ein Blick auf Streaming, Server Actions und bessere DX.',
    content: 'Next.js 15 liefert signifikante Verbesserungen für den App Router...\n\nWir schauen uns an, wie Streaming-Routen, Server Actions und das neue File-System zusammenspielen.',
    coverImage: '/images/default-post.jpg',
    tags: ['nextjs', 'react', 'javascript'],
    status: 'published',
    featured: true
  },
  {
    title: 'Design Systeme skalieren: Von Komponenten zu Token',
    excerpt: 'Was passiert, wenn UI-Bibliotheken auf 10+ Teams treffen?',
    content: 'Design Systeme helfen Teams, konsistent zu arbeiten...\n\nDieser Artikel zeigt Best Practices für Token, Governance und Dokumentation.',
    coverImage: '/images/default-post.jpg',
    tags: ['design', 'ux', 'system'],
    status: 'published',
    featured: false
  },
  {
    title: 'MongoDB Aggregations: 5 Muster die du kennen solltest',
    excerpt: 'Aggregation Pipelines sind mächtig – hier sind fünf Muster für deinen Alltag.',
    content: 'Aggregation Pipelines bieten Map-Reduce-Funktionalitäten direkt in MongoDB...\n\nWir beleuchten Bucket, Facet, Lookup, GraphLookup und Search.',
    coverImage: '/images/default-post.jpg',
    tags: ['mongodb', 'database', 'nosql'],
    status: 'draft',
    featured: false
  }
]

const SAMPLE_COMMENTS = [
  {
    content: 'Super hilfreich, danke für die Übersicht!',
    status: 'approved'
  },
  {
    content: 'Kannst du nochmal genauer auf Server Actions eingehen?',
    status: 'approved'
  }
]

const SAMPLE_SUBSCRIBERS = [
  { email: 'newsletter@example.com', name: 'Newsletter Nora', tags: ['workshop'] },
  { email: 'community@example.com', name: 'Community Chris', tags: ['community', 'events'] }
]

async function seed () {
  await dbConnect()

  console.log('🧹 Lösche bestehende Workshop-Datensätze…')
  await Promise.all([
    Category.deleteMany({}),
    User.deleteMany({}),
    Post.deleteMany({}),
    Comment.deleteMany({}),
    NewsletterSubscriber.deleteMany({})
  ])

  console.log('🌱 Lege Kategorien an…')
  const categories = await Category.insertMany(CATEGORIES)

  console.log('👥 Lege Benutzer an…')
  const users = await User.insertMany(
    await Promise.all(USERS.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 12)
    })))
  )
  const author = users[1]

  console.log('📝 Lege Posts an…')
  const posts = []
  for (const [index, postData] of SAMPLE_POSTS.entries()) {
    const post = await Post.create({
      ...postData,
      author: author._id,
      category: categories[index % categories.length]._id,
      publishedAt: postData.status === 'published' ? new Date() : null
    })
    posts.push(post)
  }

  console.log('💬 Erstelle Beispiel-Kommentare…')
  await Comment.create([
    {
      ...SAMPLE_COMMENTS[0],
      author: users[0]._id,
      post: posts[0]._id
    },
    {
      ...SAMPLE_COMMENTS[1],
      author: users[1]._id,
      post: posts[0]._id,
      parentComment: null
    }
  ])

  console.log('📬 Lege Newsletter-Abonnenten an…')
  await NewsletterSubscriber.insertMany(SAMPLE_SUBSCRIBERS)

  console.log('✅ Seed abgeschlossen!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed fehlgeschlagen:', error)
  process.exit(1)
})
