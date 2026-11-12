const maxCvBytes = 5 * 1024 * 1024

export function createExampleDraft() {
  return {
    name: 'Pelamar Contoh',
    email: 'pelamar@example.com',
    phone: '0812 0000 0000',
    portfolio: 'https://example.com/portfolio',
    cv: { name: 'CV-contoh.pdf', type: 'application/pdf', size: 240 * 1024 },
  }
}

export function validateApplication(draft) {
  const errors = {}

  if (!draft?.name?.trim()) errors.name = 'Nama lengkap wajib diisi.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft?.email?.trim() ?? '')) {
    errors.email = 'Masukkan alamat email yang valid.'
  }

  const phone = draft?.phone?.replace(/[\s()+.-]/g, '') ?? ''
  if (!/^\d{8,15}$/.test(phone)) errors.phone = 'Masukkan nomor telepon yang valid.'

  const portfolio = draft?.portfolio?.trim() ?? ''
  if (portfolio) {
    try {
      if (!['http:', 'https:'].includes(new URL(portfolio).protocol)) {
        errors.portfolio = 'Masukkan tautan HTTP(S) yang valid.'
      }
    } catch {
      errors.portfolio = 'Masukkan tautan HTTP(S) yang valid.'
    }
  }

  const cv = draft?.cv
  if (
    cv?.type !== 'application/pdf' ||
    !/\.pdf$/i.test(cv?.name ?? '') ||
    !Number.isSafeInteger(cv?.size) ||
    cv.size <= 0 ||
    cv.size > maxCvBytes
  ) {
    errors.cv = 'File tidak didukung atau terlalu besar. Pilih PDF maksimal 5 MB.'
  }

  return errors
}
