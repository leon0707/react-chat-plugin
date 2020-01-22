import React from 'react';
import { mount } from 'enzyme';

import ChatBox from '../src/ChatBox';

describe('ChatBox', () => {
  let wrapper;
  let onSendFunc = jest.fn();

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
    let textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello'
      }
    });
    let button = wrapper.find('button');
    button.simulate('click');

    expect(onSendFunc).toHaveBeenCalledWith('hello');
  });
});
