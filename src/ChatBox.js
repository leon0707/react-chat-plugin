import React from 'react';
import PropTypes from 'prop-types';

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
        const { messages = [], userId, timestampFormat = 'calendar', height, width } = this.props;
        const messageList = messages.map((message, idx) => {
            return (
                <MessageBox
                    key={idx}
                    left={message.author && message.author.id !== userId}
                    content={message.text}
                    author={message.author}
                    timestamp={message.timestamp}
                    timestampFormat={timestampFormat}
                    hasError={message.hasError}
                    type={message.type}
                />
            );
        });
        return (
            <div className="react-chat-container">
                <div className="react-chat-row">
                    <div className="react-chat-viewerBox" style={{
                        height: height,
                        width: width
                    }}>
                        <div className="react-chat-messagesList"
                            ref={(el) => this.messagesList = el}
                        >
                            <div className="react-chat-messagesListContent">
                                { messageList }
                            </div>
                        </div>
                        <InputBox onSendMessage={this.handleOnSendMessage} />
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
    timestampFormat: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
};

export default ChatBox;
