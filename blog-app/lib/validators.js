// Zentrale Validatoren, damit API-Routen sauber bleiben
export function validatePostPayload (payload) {
  const errors = {}

  if (!payload.title || payload.title.trim().length < 5) {
    errors.title = 'Titel muss mindestens 5 Zeichen haben.'
  }

  if (!payload.excerpt || payload.excerpt.trim().length < 10) {
    errors.excerpt = 'Excerpt benötigt mindestens 10 Zeichen.'
  }

  if (!payload.content || payload.content.trim().length < 50) {
    errors.content = 'Inhalt muss mindestens 50 Zeichen umfassen.'
  }

  if (!payload.category) {
    errors.category = 'Kategorie ist erforderlich.'
  }

  if (payload.tags && !Array.isArray(payload.tags)) {
    errors.tags = 'Tags müssen als Array übergeben werden.'
  }

  return buildValidationResult(errors)
}

export function validateCategoryPayload (payload) {
  const errors = {}

  if (!payload.name || payload.name.trim().length < 3) {
    errors.name = 'Kategorie benötigt mindestens 3 Zeichen.'
  }

  if (payload.slug && !/^[-a-z0-9]+$/.test(payload.slug)) {
    errors.slug = 'Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.'
  }

  return buildValidationResult(errors)
}

export function validateCommentPayload (payload) {
  const errors = {}

  if (!payload.content || payload.content.trim().length < 3) {
    errors.content = 'Kommentar benötigt mindestens 3 Zeichen.'
  }

  if (!payload.postId) {
    errors.postId = 'Ziel-Post ist erforderlich.'
  }

  return buildValidationResult(errors)
}

export function validateNewsletterPayload (payload) {
  const errors = {}

  if (!payload.email || !/^\S+@\S+\.\S+$/.test(payload.email)) {
    errors.email = 'Bitte eine gültige Email-Adresse angeben.'
  }

  return buildValidationResult(errors)
}

function buildValidationResult (errors) {
  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}
