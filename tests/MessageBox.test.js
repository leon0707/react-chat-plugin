import React from 'react';
import { shallow } from 'enzyme';

import MessageBox from '../src/MessageBox';

describe('messageBox', () => {
  it('inputBox - notification', () => {
    expect.assertions(1);
    const wrapper = shallow(
      <MessageBox type={'notification'} content={'notification'} />
    );
    expect(
      wrapper.find('div').hasClass('react-chat-notification')
    ).toStrictEqual(true);
  });

  it('inputBox - text', () => {
    expect.assertions(1);
    const message = {
      left: true,
      author: {},
      content: 'text',
    };
    const wrapper = shallow(<MessageBox type={'text'} {...message} />);
    expect(
      wrapper.find('div').first().hasClass('react-chat-messageBoxLeft')
    ).toStrictEqual(true);
  });

  it('inputBox - error', () => {
    expect.assertions(2);
    const message = {
      left: false,
      author: {},
      hasError: true,
    };
    const wrapper = shallow(<MessageBox type={'text'} {...message} />);
    expect(
      wrapper.find('div').first().hasClass('react-chat-messageBoxRight')
    ).toStrictEqual(true);
    expect(wrapper.exists('.react-chat-bubbleWithError')).toStrictEqual(true);
  });
});
