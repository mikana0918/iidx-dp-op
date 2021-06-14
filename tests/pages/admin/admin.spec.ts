import { createLocalVue, shallowMount } from '@vue/test-utils'
import AdminPage from '~/pages/admin/index.vue'
import Button from '~/components/base/button/Button.vue'

const localVue = createLocalVue()

describe('/admin', () => {
  it('should not show its page with no admin auth', () => {
    const mocks = {
      $accessor: {
        auth: {
          uid: '',
        },
        dbr: {
          initialDataForKaidenTenkuu: {
            succeeded: true,
          },
          setDefaultMyListForTenkuu: jest.fn(),
          setMasterDataForTenkuu: jest.fn(),
        },
        snackbar: {
          showWithNotification: jest.fn(),
        },
      },
      $logger: {
        info: jest.fn(),
      },
    }
    const wrapper = shallowMount(AdminPage, {
      localVue,
      mocks,
    })

    const btns = wrapper.findAllComponents(Button)
    btns.at(0).vm.$emit('click')
    btns.at(1).vm.$emit('click')

    expect(mocks.$accessor.dbr.setMasterDataForTenkuu).toHaveBeenCalled()
    expect(mocks.$accessor.dbr.setDefaultMyListForTenkuu).toHaveBeenCalled()
  })
})
