import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import RoleCard from '../../resources/js/Components/Recruitment/RoleCard.vue'
import RoleDetailDialog from '../../resources/js/Components/Recruitment/RoleDetailDialog.vue'
import SiteHeader from '../../resources/js/Components/Recruitment/SiteHeader.vue'

const role = {
  slug: 'frontend-developer',
  title: 'Frontend Developer',
  department: 'Engineering',
  location: 'Remote',
  employmentType: 'Full-time',
  summary: 'Membangun antarmuka website yang responsif dan aksesibel.',
  responsibilities: ['Membangun halaman web.'],
  skills: ['HTML/CSS'],
}

const LinkStub = {
  props: ['href'],
  template: '<a :href="href"><slot /></a>',
}

describe('recruitment landing controls', () => {
  it('emits the selected role from a role card', async () => {
    const wrapper = mount(RoleCard, { props: { role } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([role])
  })

  it('opens the mobile menu, closes it after navigation and restores focus on Escape', async () => {
    const wrapper = mount(SiteHeader, { props: { mode: 'landing' }, attachTo: document.body })
    const menuButton = wrapper.get('[aria-controls="mobile-menu"]')

    await menuButton.trigger('click')
    expect(menuButton.attributes('aria-expanded')).toBe('true')

    await wrapper.get('#mobile-menu a[href="#posisi"]').trigger('click')
    expect(menuButton.attributes('aria-expanded')).toBe('false')

    await menuButton.trigger('click')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
    expect(menuButton.element).toBe(document.activeElement)
    wrapper.unmount()
  })

  it('closes role details and links to the selected role application', async () => {
    Object.defineProperties(HTMLDialogElement.prototype, {
      showModal: { configurable: true, value() { this.setAttribute('open', '') } },
      close: { configurable: true, value() { this.removeAttribute('open') } },
    })

    const wrapper = mount(RoleDetailDialog, {
      props: { role },
      global: { stubs: { Link: LinkStub } },
    })
    await nextTick()

    expect(wrapper.get('a[href="/lamaran/frontend-developer"]').exists()).toBe(true)
    await wrapper.get('button[aria-label="Tutup detail posisi"]').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
