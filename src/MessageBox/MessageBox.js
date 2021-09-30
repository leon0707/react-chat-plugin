import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './MessageBox.css';
import ErrorIcon from '../assets/errorIcon.svg';
import { labels } from '../labels';

const MessageBox = (props) => {
  // Tip: to identify if message is yours or not, use `left`. `left` means it's not your message
  const { type, timestamp, timestampFormat, buttons, left, author, hasError, text, authorFor, labels } = props;

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

    const _buttons = buttons ? 
      buttons.map((button, idx) => {
          if (button.type === 'URL') {
            return (
              <button 
                key={idx}
                className="react-chat-message-button"
                onClick={() => props.onMessageButtonClick(button.payload)}
              >
                {button.title}
              </button>
            );
          }
        })
      : [];

    return (
      <div className={`react-chat-messageBox ${left ? 'react-chat-messageBoxLeft' : 'react-chat-messageBoxRight'}`} >
        {
          !author.avatarUrl ? null :
            <img alt="avater img" src={author.avatarUrl} className={`react-chat-avatar ${left ? 'react-chat-avatarLeft' : 'react-chat-avatarRight'}`} />
        }
        <div className={`react-chat-message ${left ? 'react-chat-messageLeft' : 'react-chat-messageRight'}`}>

          <div className="react-chat-additional">
            {author.username} 
            {
              ((left === false) && authorFor) ?
                <>{` ${labels.to?.toLowerCase() ?? '-'} ${authorFor.username}`}</>
                : null
            }
            {
              authorFor && 
              <b id="direct-message">
                {` (${labels.private})`}
              </b>
            }
          </div>

          <div className={`react-chat-bubble ${left ? 'react-chat-leftBubble' : 'react-chat-rightBubble'} ${hasError ? 'react-chat-bubbleWithError' : ''}`}>

            {type === 'indicator' && (
              <div className="react-chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {text}

            {_buttons.length > 0 && (
              <div className={left ? 'react-chat-message-buttonGroupLeft' : 'react-chat-message-buttonGroupRight'}>
                {_buttons}
              </div>
            )}

            {hasError && <ErrorIcon className={`${left ? 'react-chat-errorLeft' : 'react-chat-errorRight'} react-chat-error`} />}

          </div>

          <div className="react-chat-additional">{time !== null && time}</div>

        </div>
      </div>
    );
  } 
  
  else if (type === 'notification') {
    return (
      <div className="text-center text-secondary react-chat-notification">
        {text}
      </div>
    );
  }
}

MessageBox.propTypes = {
  labels: PropTypes.object.isRequired
};

MessageBox.defaultProps = {
  labels: labels
}

export default MessageBox;
