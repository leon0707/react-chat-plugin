import React from 'react';
import { mount } from 'enzyme';

import InputBox from '../src/InputBox';

describe('InputBox', () => {
  let wrapper;
  let paraFunc = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <InputBox onSendMessage={paraFunc} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('InputBox - render', () => {
    expect(
      wrapper.find('div').hasClass('react-chat-inputBox')
    ).toEqual(true);
  });

  test('InputBox - sitimulate user input', () => {
    let textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello'
      }
    });
    expect(textarea.instance().value).toEqual('hello');
  });

  test('InputBox - sitimulate click', () => {
    let textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello'
      }
    });

    let button = wrapper.find('button');
    button.simulate('click');
    expect(paraFunc).toHaveBeenCalledWith('hello');
    expect(textarea.instance().value).toEqual('');
  });

  test('InputBox - sitimulate key press', () => {
    let textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello'
      }
    });

    textarea.simulate('keypress', {
      shiftKey: true,
      charCode: 13
    });
    expect(paraFunc).toHaveBeenCalledWith('hello');
    expect(textarea.instance().value).toEqual('');
  });
});
