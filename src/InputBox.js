import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
// import { MdSend } from 'react-icons/md';
import SendIcon from './sendIcon.svg';

export default function InputBox(props) {
    const [inputText, setInputText] = useState('');

    const handleOnChange = (e) => {
        setInputText(e.target.value);
    }

    const handleOnClick = (e) => {
        if(inputText.length) {
            props.onSendMessage(inputText);
            setInputText('');
        } else {
            // to do cannot send empty message
        }
    }

    const onKeyPress = (e) => {
        if(e.shiftKey && e.charCode === 13) {
            props.onSendMessage(inputText);
            setInputText('');
            e.preventDefault();
            return false;
        }
    }

    return (
        <div className="react-chat-inputBox">
            <TextareaAutosize
                maxRows={3}
                className="react-chat-textarea"
                placeholder="Press shift + enter to send"
                value={inputText}
                onChange={handleOnChange}
                onKeyPress={onKeyPress}
                autoFocus
            />
            <button className="react-chat-sendButton" onClick={handleOnClick}>
                <SendIcon className="react-chat-SendIcon"/>
            </button>
        </div>
    );
}
