import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Application from '../../resources/js/Pages/Recruitment/Application.vue'

const roles = [
  { slug: 'frontend-developer', title: 'Frontend Developer', department: 'Engineering', location: 'Remote', employmentType: 'Full-time' },
  { slug: 'ui-ux-designer', title: 'UI/UX Designer', department: 'Product & Design', location: 'Jakarta Hybrid', employmentType: 'Full-time' },
  { slug: 'quality-assurance-intern', title: 'Quality Assurance Intern', department: 'Engineering', location: 'Remote', employmentType: 'Internship' },
]

const LinkStub = { props: ['href'], template: '<a :href="href"><slot /></a>' }
const clickButton = async (wrapper, label) => {
  const button = wrapper.findAll('button').find((candidate) => candidate.text().trim() === label)
  if (!button) throw new Error(`Button not found: ${label}`)
  await button.trigger('click')
  await flushPromises()
  return button
}
const mountApplication = (role = roles[0]) => mount(Application, {
  props: { role },
  global: { stubs: { Link: LinkStub } },
})

describe('local application flow', () => {
  afterEach(() => vi.useRealTimers())

  it('shows validation errors for an empty form and uses valid example data for review', async () => {
    const wrapper = mountApplication()
    await clickButton(wrapper, 'Periksa lamaran')
    expect(wrapper.find('[role="alert"]').text()).toContain('Periksa bagian yang ditandai')

    await clickButton(wrapper, 'Gunakan data contoh')
    await clickButton(wrapper, 'Periksa lamaran')
    expect(wrapper.text()).toContain('Periksa lamaranmu.')
    expect(wrapper.text()).toContain('Frontend Developer')
  })

  it('can repair an invalid example CV and return from review without losing the example', async () => {
    const wrapper = mountApplication()
    await clickButton(wrapper, 'Gunakan data contoh')
    await clickButton(wrapper, 'Lihat contoh CV tidak valid')
    expect(wrapper.text()).toContain('File tidak didukung atau terlalu besar.')

    await clickButton(wrapper, 'Ganti dengan CV contoh')
    await clickButton(wrapper, 'Periksa lamaran')
    await clickButton(wrapper, 'Ubah data contoh')
    expect(wrapper.get('input[name="name"]').element.value).toBe('Pelamar Contoh')
  })

  it('offers one CV replacement action and keeps the review action in the CV error state', async () => {
    const wrapper = mountApplication()
    await clickButton(wrapper, 'Gunakan data contoh')
    await clickButton(wrapper, 'Lihat contoh CV tidak valid')

    const labels = wrapper.findAll('button').map((button) => button.text().trim())
    expect(labels.filter((label) => label === 'Ganti dengan CV contoh')).toHaveLength(1)
    expect(labels).toContain('Periksa lamaran')
  })

  it('keeps each selected role through the complete local confirmation flow without a request', async () => {
    const fetch = vi.fn()
    vi.stubGlobal('fetch', fetch)
    vi.useFakeTimers()

    for (const role of roles) {
      const wrapper = mountApplication(role)
      await clickButton(wrapper, 'Gunakan data contoh')
      await clickButton(wrapper, 'Periksa lamaran')
      await clickButton(wrapper, 'Kirim simulasi lamaran')

      expect(wrapper.text()).toContain('Menyiapkan simulasi.')
      expect(wrapper.text()).toContain(role.title)
      vi.advanceTimersByTime(1000)
      await flushPromises()
      expect(wrapper.text()).toContain('Simulasi selesai.')
      expect(wrapper.text()).toContain(role.title)
      expect(fetch).not.toHaveBeenCalled()
      wrapper.unmount()
    }
  })

  it('prevents a second submit, clears its timer on unmount and starts empty after remount', async () => {
    vi.useFakeTimers()
    const wrapper = mountApplication()
    await clickButton(wrapper, 'Gunakan data contoh')
    await clickButton(wrapper, 'Periksa lamaran')
    await clickButton(wrapper, 'Kirim simulasi lamaran')
    const pendingButton = wrapper.findAll('button').find((button) => button.attributes('disabled') !== undefined)
    expect(pendingButton?.text()).toContain('Menyiapkan simulasi')
    expect(vi.getTimerCount()).toBe(1)

    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
    vi.advanceTimersByTime(1000)

    const remounted = mountApplication()
    expect(remounted.get('input[name="name"]').element.value).toBe('')
    expect(remounted.text()).toContain('Lamar posisi ini.')
  })
})
