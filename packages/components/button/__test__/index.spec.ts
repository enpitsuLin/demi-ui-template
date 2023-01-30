import DButton from '../src/button.vue'
import { mount } from '@vue/test-utils'

describe('Button', () => {
  it('create', () => {
    const wrapper = mount(DButton, { slots: { default: 'default slot' } })

    expect(wrapper.text()).toContain('default slot')

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('type property work', () => {
    /**
     * @desc use deprecated `propsData` compatibility for `@vue/test-utils@1` & `@vue/test-utils@2`
     * @todo create package to compatible w/ both v1 & v2
     */
    const wrapper = mount(DButton, {
      propsData: {
        type: 'primary',
      },
      slots: { default: 'default slot' },
    })

    expect(wrapper.classes()).toContain('d-button--primary')
  })
})
