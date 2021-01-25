import React from 'react';
import PropTypes from 'prop-types';

import { KEYS, TIMESTAMPFORMAT } from './constant';
import InputBox from './InputBox';
import MessageBox from './MessageBox';

import './ChatBox.css';

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleOnSendMessage = this.handleOnSendMessage.bind(this);
  }

  scrollToBottom() {
    if (this.messagesList) {
      this.messagesList.scrollTop =
        this.messagesList.scrollHeight - this.messagesList.clientHeight;
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleOnSendMessage(message) {
    this.props.onSendMessage(message);
  }

  render() {
    const {
      messages,
      userId,
      timestampFormat,
      height,
      width,
      disableInput,
      disabledInputPlaceholder,
      placeholder,
      style,
      showTypingIndicator,
      activeAuthor,
      onSendKey,
    } = this.props;

    const messageList = messages.map((message, idx) => {
      return (
        <MessageBox
          key={idx}
          left={message.author && message.author.id !== userId}
          timestampFormat={timestampFormat}
          {...message}
        />
      );
    });

    return (
      <div style={style} className="react-chat-container">
        <div className="react-chat-row">
          <div
            className="react-chat-viewerBox"
            style={{
              height: height,
              width: width,
            }}
          >
            <div
              className="react-chat-messagesList"
              ref={(el) => (this.messagesList = el)}
            >
              <div className="react-chat-messagesListContent">
                {messageList}
                {showTypingIndicator && activeAuthor !== null && (
                  <MessageBox
                    type="indicator"
                    author={activeAuthor}
                    text=""
                    left={true}
                  />
                )}
              </div>
            </div>
            <InputBox
              onSendMessage={this.handleOnSendMessage}
              disabled={disableInput}
              placeholder={placeholder}
              disabledInputPlaceholder={disabledInputPlaceholder}
              onSendKey={onSendKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

ChatBox.propTypes = {
  messages: PropTypes.array,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onSendMessage: PropTypes.func.isRequired,
  timestampFormat: PropTypes.oneOf(TIMESTAMPFORMAT),
  width: PropTypes.string,
  height: PropTypes.string,
  disableInput: PropTypes.bool,
  disabledInputPlaceholder: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  showTypingIndicator: PropTypes.bool,
  activeAuthor: PropTypes.object,
  onSendKey: PropTypes.oneOf(KEYS),
};

ChatBox.defaultProps = {
  messages: [],
  timestampFormat: 'calendar',
  disableInput: false,
  disabledInputPlaceholder: '',
  placeholder: '',
  showTypingIndicator: false,
  activeAuthor: null,
};

export default ChatBox;
