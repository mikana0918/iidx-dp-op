import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Button from '~/components/base/button/Button.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('Button.vue', () => {
  let vuetify: Vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should emit event when on click', () => {
    const wrapper = mount(Button, {
      localVue,
      vuetify,
      propsData: {
        klass: 'test-btn',
      },
    })

    wrapper.find('.v-btn').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
  })
  it('should have proper props', () => {
    const wrapper = mount(Button, {
      localVue,
      vuetify,
      propsData: {
        klass: 'test-btn',
      },
    })

    expect(wrapper.props('klass')).toBe('test-btn')
  })
})
