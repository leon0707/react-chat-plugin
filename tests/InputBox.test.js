import React from 'react';
import { mount } from 'enzyme';

import InputBox from '../src/InputBox';

describe('inputBox', () => {
  let wrapper;
  const paraFunc = jest.fn();

  beforeEach(() => {
    wrapper = mount(<InputBox onSendMessage={paraFunc} />);
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

    const button = wrapper.find('button');
    button.simulate('click');
    expect(paraFunc).toHaveBeenCalledWith('hello');
    expect(textarea.instance().value).toStrictEqual('');
  });
});

describe('inputBox onSendKey', () => {
  let wrapper;
  const paraFunc = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  it('inputBox - sitimulate enter press', () => {
    expect.assertions(2);
    wrapper = mount(<InputBox onSendMessage={paraFunc} />);
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello',
      },
    });
    textarea.simulate('keypress', {
      charCode: 13,
    });
    expect(paraFunc).toHaveBeenCalledWith('hello');
    expect(textarea.instance().value).toStrictEqual('');
  });

  it('inputBox - sitimulate shift press', () => {
    expect.assertions(3);
    wrapper = mount(
      <InputBox onSendMessage={paraFunc} onSendKey={'shiftKey'} />
    );
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello',
      },
    });
    textarea.simulate('keypress', {
      charCode: 13,
    });
    expect(paraFunc).not.toHaveBeenCalledWith();
    textarea.simulate('keypress', {
      shiftKey: true,
      charCode: 13,
    });
    expect(paraFunc).toHaveBeenCalledWith('hello');
    expect(textarea.instance().value).toStrictEqual('');
  });

  it('inputBox - sitimulate control press', () => {
    expect.assertions(3);
    wrapper = mount(
      <InputBox onSendMessage={paraFunc} onSendKey={'ctrlKey'} />
    );
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'hello',
      },
    });
    textarea.simulate('keypress', {
      charCode: 13,
    });
    expect(paraFunc).not.toHaveBeenCalledWith();
    textarea.simulate('keypress', {
      ctrlKey: true,
      charCode: 13,
    });
    expect(paraFunc).toHaveBeenCalledWith('hello');
    expect(textarea.instance().value).toStrictEqual('');
  });
});
