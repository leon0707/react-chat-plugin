import React from 'react';
import { shallow } from 'enzyme';

import MessageBox from '../src/MessageBox';

describe('MessageBox', () => {
  test('InputBox - notification', () => {
    const wrapper = shallow(
      <MessageBox type={'notification'} content={'notification'} />
    );
    expect(
      wrapper.find('div').hasClass('react-chat-notification')
    ).toEqual(true);
  });

  test('InputBox - text', () => {
    const message = {
      left: true,
      author: {},
      content: 'text'
    };
    const wrapper = shallow(
      <MessageBox type={'text'} { ...message } />
    );
    expect(
      wrapper.find('div').first().hasClass('react-chat-messageBoxLeft')
    ).toEqual(true);
  });

  test('InputBox - error', () => {
    const message = {
      left: false,
      author: {},
      hasError: true
    };
    const wrapper = shallow(
      <MessageBox type={'text'} { ...message } />
    );
    expect(
      wrapper.find('div').first().hasClass('react-chat-messageBoxRight')
    ).toEqual(true);
    expect(
      wrapper.exists('.react-chat-bubbleWithError')
    ).toEqual(true);
  });
});
