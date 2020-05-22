import React from 'react';
import { mount } from 'enzyme';

import ChatBox from '../src/ChatBox';

describe('ChatBox', () => {
  let wrapper;
  const onSendFunc = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <ChatBox userId={1} onSendMessage={onSendFunc} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('ChatBox - render', () => {
    expect(
      wrapper.find('div').first().hasClass('react-chat-container')
    ).toEqual(true);
  });

  test('ChatBox - onSendMessage', () => {
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello'
      }
    });
    const button = wrapper.find('button');
    button.simulate('click');

    expect(onSendFunc).toHaveBeenCalledWith('hello');
  });
});
