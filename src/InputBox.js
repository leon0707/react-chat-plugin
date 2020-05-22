import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

import SendIcon from './sendIcon.svg';

export default function InputBox(props) {
  const [inputText, setInputText] = useState('');

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const strip = (str) => {
    return str.replace(/^\s+|\s+$/g, '');
  };

  const handleOnClick = (e) => {
    const str = strip(inputText);
    if (str.length) {
      sendMessage(str);
    } else {
      // to do cannot send empty message
    }
  };

  const onKeyPress = (e) => {
    if (e.shiftKey && e.charCode === 13) {
      const str = strip(inputText);
      if (str.length) {
        sendMessage(str);
      }
      e.preventDefault();
      return false;
    }
  };

  const sendMessage = (message) => {
    props.onSendMessage(message);
    setInputText('');
  };

  return (
    <div className={`react-chat-inputBox ${props.disabled ? 'disabled' : ''}`}>
      <TextareaAutosize
        maxRows={3}
        className="react-chat-textarea"
        placeholder={
          props.disabled
            ? props.disabledInputPlaceholder
            : props.placeholder
            ? props.placeholder
            : 'Press shift + enter to send'
        }
        value={inputText}
        onChange={handleOnChange}
        onKeyPress={onKeyPress}
        autoFocus
        disabled={props.disabled}
      />
      <button
        className="react-chat-sendButton"
        onClick={handleOnClick}
        disabled={props.disabled}
      >
        <SendIcon
          className={
            props.disabled
              ? 'react-chat-SendIcon-disable'
              : 'react-chat-SendIcon'
          }
        />
      </button>
    </div>
  );
}

InputBox.propTypes = {
  onSendMessage: PropTypes.func,
  disabled: PropTypes.bool,
  disabledInputPlaceholder: PropTypes.string,
  placeholder: PropTypes.string,
};
