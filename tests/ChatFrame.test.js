import React from 'react';
import { mount } from 'enzyme';

import ChatBox, { ChatFrame } from '../src';

describe('chatFrame', () => {
  let onSendFunc;
  let handleClickIcon;
  let wrapper;
  beforeEach(() => {
    onSendFunc = jest.fn();
    handleClickIcon = jest.fn();
  });

  it('chatFrame - render', () => {
    expect.assertions(2);
    wrapper = mount(
      <ChatFrame
        chatbox={
          <ChatBox
            onSendMessage={onSendFunc}
            userId={1}
            messages={[]}
            showTypingIndicator={true}
            activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
          />
        }
        clickIcon={handleClickIcon}
        showChatbox={false}
        showIcon={true}
      >
        <div className="Greeting" style={{ width: '400px' }}>
          👋 Hey, I’m a ChatBot! Want to see what I can do?
        </div>
      </ChatFrame>
    );
    expect(wrapper.find('div.react-chat-frame-icon-container').exists()).toBe(
      true
    );
    expect(wrapper.find('div.Greeting').exists()).toBe(true);
  });
  it('chatBox - onSendMessage', () => {
    expect.assertions(1);
    wrapper = mount(
      <ChatFrame
        chatbox={
          <ChatBox
            onSendMessage={onSendFunc}
            userId={1}
            messages={[]}
            showTypingIndicator={true}
            activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
          />
        }
        clickIcon={handleClickIcon}
        showChatbox={true}
        showIcon={false}
      >
        <div className="Greeting" style={{ width: '400px' }}>
          👋 Hey, I’m a ChatBot! Want to see what I can do?
        </div>
      </ChatFrame>
    );
    expect(wrapper.find('div.react-chat-container').exists()).toBe(true);
  });
});
