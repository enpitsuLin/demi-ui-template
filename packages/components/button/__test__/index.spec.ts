import Button from '../index.vue'
import { mount } from '@vue/test-utils'

test('mount component', async () => {
  expect(Button).toBeTruthy()

  const button = mount(Button)

  expect(button.text()).toContain('count 0')
  expect(button.html()).toMatchSnapshot()

  await button.get('button').trigger('click')

  expect(button.text()).toContain('count 1')

  await button.get('button').trigger('click')

  expect(button.text()).toContain('count 2')
})
