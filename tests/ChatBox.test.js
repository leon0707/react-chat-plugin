import React from 'react';
import { mount } from 'enzyme';

import ChatBox from '../src/ChatBox';

describe('chatBox', () => {
  let wrapper;
  const onSendFunc = jest.fn();

  beforeEach(() => {
    wrapper = mount(<ChatBox userId={1} onSendMessage={onSendFunc} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('chatBox - render', () => {
    expect.assertions(1);
    expect(
      wrapper.find('div').first().hasClass('react-chat-container')
    ).toStrictEqual(true);
  });

  it('chatBox - onSendMessage', () => {
    expect.assertions(1);
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello',
      },
    });
    const button = wrapper.find('button');
    button.simulate('click');

    expect(onSendFunc).toHaveBeenCalledWith('hello');
  });
});
