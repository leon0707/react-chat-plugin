import React from 'react';
import moment from 'moment';

import ErrorIcon from './errorIcon.svg';
import avatar from './placeholder.png';

function MessageBox(props) {
  const {
    type,
    timestamp,
    timestampFormat,
    buttons,
    left,
    author,
    hasError,
    text,
  } = props;
  if (type === 'text' || type === 'indicator') {
    let time;
    if (timestamp) {
      if (timestampFormat === 'calendar') {
        time = moment(timestamp).calendar();
      } else if (timestampFormat === 'fromNow') {
        time = moment(timestamp).fromNow();
      } else {
        time = moment(timestamp).format(timestampFormat);
      }
    }

    const _buttons = buttons
      ? buttons.map((button, idx) => {
          if (button.type === 'URL') {
            return (
              <a
                key={idx}
                href={button.payload}
                rel="noreferrer"
                target="_blank"
                className="react-chat-message-button"
              >
                {button.title}
              </a>
            );
          }
        })
      : [];

    return (
      <div
        className={`react-chat-messageBox ${
          left ? 'react-chat-messageBoxLeft' : 'react-chat-messageBoxRight'
        }`}
      >
        <img
          alt="avater img"
          src={author.avatarUrl ? author.avatarUrl : avatar}
          className={`react-chat-avatar ${
            left ? 'react-chat-avatarLeft' : 'react-chat-avatarRight'
          }`}
        />
        <div
          className={`react-chat-message ${
            left ? 'react-chat-messageLeft' : 'react-chat-messageRight'
          }`}
        >
          <div className="react-chat-additional">{author.username}</div>
          <div
            className={`react-chat-bubble ${
              left ? 'react-chat-leftBubble' : 'react-chat-rightBubble'
            } ${hasError ? 'react-chat-bubbleWithError' : ''}`}
          >
            {type === 'indicator' && (
              <div className="react-chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            {text}
            {_buttons.length > 0 && (
              <div
                className={
                  left
                    ? 'react-chat-message-buttonGroupLeft'
                    : 'react-chat-message-buttonGroupRight'
                }
              >
                {_buttons}
              </div>
            )}
            {hasError && (
              <ErrorIcon
                className={`${
                  left ? 'react-chat-errorLeft' : 'react-chat-errorRight'
                } react-chat-error`}
              />
            )}
          </div>
          <div className="react-chat-additional">{time !== null && time}</div>
        </div>
      </div>
    );
  } else if (type === 'notification') {
    return (
      <div className="text-center text-secondary react-chat-notification">
        {text}
      </div>
    );
  }
}

export default MessageBox;
