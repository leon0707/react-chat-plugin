import React from 'react';
import { mount } from 'enzyme';

import InputBox from '../src/InputBox';

describe('inputBox fileSelectMode-disabled)', () => {
  let wrapper;
  const paraFunc = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <InputBox 
        onSendMessage={paraFunc}
        fileSelectMode='DISABLED'
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('inputBox - render', () => {
    expect.assertions(1);
    expect(wrapper.find('div').hasClass('react-chat-inputBox')).toStrictEqual(
      true
    );
  });

  it('inputBox - sitimulate user input', () => {
    expect.assertions(1);
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello',
      },
    });
    expect(textarea.instance().value).toStrictEqual('hello');
  });

  it('inputBox - sitimulate click', () => {
    expect.assertions(2);
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello',
      },
    });

    const button = wrapper.find('.react-chat-sendButton');
    button.simulate('click');
    expect(paraFunc).toHaveBeenCalledWith('hello', []);
    expect(textarea.instance().value).toStrictEqual('');
  });
});

describe('inputBox fileSelectMode-single', () => {
  let wrapper;
  const paraFunc = jest.fn();

  beforeEach(() => {
    wrapper = mount(
      <InputBox 
        onSendMessage={paraFunc}
        fileSelectMode='SINGLE'
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('inputBox - render', () => {
    expect.assertions(1);
    expect(wrapper.find('.react-chat-uploadFileButton')).toBeDefined();
  });
  
});