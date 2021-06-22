import React, { useState } from 'react';
import ChatBox, { ChatFrame } from '../src';

import RobotIcon from './bot.svg';
import './Example.css';

const Example = () => {

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
        author: { 
          username: 'user2', 
          id: 2, 
          avatarUrl: null 
        },
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

  const handleOnSendMessage = (message, files = []) => {
    /*
      In this example, we are receiving the actual files.
      In a real-world scenario, you would post the message, along with the files, to an endpoint/websocket,
      and from the result, you would receive, for example, the link to the file you sent, along with other information, and you would
      work with the link.
      So, in this simple example, I fake a link/url for each file, using: URL.createObjectURL()
    */

    let currMessage = {
      author: {
        username: 'user1',
        id: 1,
        avatarUrl: 'https://image.flaticon.com/icons/svg/2446/2446032.svg',
      },
      text: message,
      type: 'text',
      timestamp: +new Date()
    };

    if(files && files.length > 0) {
      let buttons = []

      for(let i = 0; i < files.length; i++) {
        buttons.push({
          type: 'URL',
          title: files[i].name,
          payload: URL.createObjectURL(files[i])
        })
      }

      currMessage.buttons = buttons;
    }

    setAttr({...attr, messages: [...attr.messages, currMessage]});
  };

  const handleOnMessageButtonClick = (payload) => {
    alert(`Clicked: ${payload}`);
  }

  return (
    <ChatFrame
      chatbox={
        <ChatBox
          onSendMessage={handleOnSendMessage}
          onMessageButtonClick={handleOnMessageButtonClick}
          userId={1}
          messages={attr.messages}
          style={{ width: '300px' }}
          showTypingIndicator={true}
          activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
          onSendKey={'shiftKey'}
          placeHolder='Write a message...'
          clearFilesLabel='Clear all'
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
