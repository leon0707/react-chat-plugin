import React, { useState } from 'react';
import ChatBox, { ChatFrame } from '../src';

import RobotIcon from './bot.svg';
import './Example.css';

function Example() {
  const [attr, setAttr] = useState({
    showChatbox: false,
    showIcon: true,
    messages: [
      {
        text: 'user2 has joined the conversation',
        timestamp: 1578366389250,
        type: 'notification',
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: 'Hi',
        type: 'text',
        timestamp: 1578366393250,
      },
      {
        author: { username: 'user2', id: 2, avatarUrl: null },
        text: 'Show two buttons',
        type: 'text',
        timestamp: 1578366425250,
        buttons: [
          {
            type: 'URL',
            title: 'Yahoo',
            payload: 'http://www.yahoo.com',
          },
          {
            type: 'URL',
            title: 'Example',
            payload: 'http://www.example.com',
          },
        ],
      },
      {
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: "What's up?",
        type: 'text',
        timestamp: 1578366425250,
        hasError: true,
      },
    ],
  });
  const handleClickIcon = () => {
    // toggle showChatbox and showIcon
    setAttr({
      ...attr,
      showChatbox: !attr.showChatbox,
      showIcon: !attr.showIcon,
    });
  };
  const handleOnSendMessage = (message) => {
    setAttr({
      ...attr,
      messages: attr.messages.concat({
        author: {
          username: 'user1',
          id: 1,
          avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
        },
        text: message,
        type: 'text',
        timestamp: +new Date(),
      }),
    });
  };
  return (
    <ChatFrame
      chatbox={
        <ChatBox
          onSendMessage={handleOnSendMessage}
          userId={1}
          messages={attr.messages}
          style={{ width: '300px' }}
          showTypingIndicator={true}
          activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
          onSendKey={'shiftKey'}
        />
      }
      icon={<RobotIcon className="Icon" />}
      clickIcon={handleClickIcon}
      showChatbox={attr.showChatbox}
      showIcon={attr.showIcon}
      iconStyle={{ background: 'red', fill: 'white' }}
    >
      <div className="Greeting" style={{ width: '300px' }}>
        👋 Hey, I’m a ChatBot! Want to see what I can do?
      </div>
    </ChatFrame>
  );
}

export default Example;
