import { describe, expect, it } from 'vitest'
import { createExampleDraft, validateApplication } from '../../resources/js/lib/application.js'

const validDraft = () => ({
  name: 'Pelamar Contoh',
  email: 'pelamar@example.com',
  phone: '0812 0000 0000',
  portfolio: 'https://example.com/portfolio',
  cv: { name: 'CV-contoh.pdf', type: 'application/pdf', size: 240 * 1024 },
})

describe('application example data', () => {
  it('creates only clearly labeled local example values and a PDF descriptor', () => {
    expect(createExampleDraft()).toEqual(validDraft())
  })
})

describe('application validation', () => {
  it('requires a name, email, phone and CV while allowing an empty portfolio', () => {
    const errors = validateApplication({ name: '', email: '', phone: '', portfolio: '', cv: null })
    expect(Object.keys(errors).sort()).toEqual(['cv', 'email', 'name', 'phone'])
  })

  it('rejects malformed email addresses', () => {
    expect(validateApplication({ ...validDraft(), email: 'pelamar@' })).toHaveProperty('email')
  })

  it.each([
    ['7 digits', '1234567', true],
    ['8 digits', '1234 5678', false],
    ['15 digits', '+123 456 7890 12345', false],
    ['16 digits', '1234567890123456', true],
  ])('checks phone digit count after separators are removed (%s)', (_label, phone, invalid) => {
    expect(validateApplication({ ...validDraft(), phone }).phone !== undefined).toBe(invalid)
  })

  it('accepts an empty portfolio and HTTP(S) URLs only', () => {
    expect(validateApplication({ ...validDraft(), portfolio: '  ' })).not.toHaveProperty('portfolio')
    expect(validateApplication({ ...validDraft(), portfolio: 'http://example.com' })).not.toHaveProperty('portfolio')
    expect(validateApplication({ ...validDraft(), portfolio: 'javascript:alert(1)' })).toHaveProperty('portfolio')
    expect(validateApplication({ ...validDraft(), portfolio: 'data:text/html,hello' })).toHaveProperty('portfolio')
  })

  it('accepts a non-empty PDF descriptor up to and including 5 MiB', () => {
    const maxSize = 5 * 1024 * 1024
    expect(validateApplication({ ...validDraft(), cv: { name: 'cv.pdf', type: 'application/pdf', size: maxSize } })).not.toHaveProperty('cv')
    expect(validateApplication({ ...validDraft(), cv: { name: 'cv.pdf', type: 'application/pdf', size: maxSize + 1 } })).toHaveProperty('cv')
    expect(validateApplication({ ...validDraft(), cv: { name: 'cv.pdf', type: 'application/pdf', size: 0 } })).toHaveProperty('cv')
    expect(validateApplication({ ...validDraft(), cv: { name: 'cv.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 10 } })).toHaveProperty('cv')
  })
})
