import { button } from 'scope-ui';
import { mount } from '@vue/test-utils';

test('mount component', async () => {
  expect(button).toBeTruthy();

  const wrapper = mount(button);

  expect(wrapper.text()).toContain('count 0');
  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.get('button').trigger('click');

  expect(wrapper.text()).toContain('count 1');

  await wrapper.get('button').trigger('click');

  expect(wrapper.text()).toContain('count 2');
});
