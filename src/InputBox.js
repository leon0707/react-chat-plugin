import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { MdSend } from 'react-icons/md';

export default function InputBox(props) {
    const [inputText, setInputText] = useState('');

    const handleOnChange = (e) => {
        setInputText(e.target.value);
    }

    const handleOnClick = (e) => {
        props.onSendMessage(inputText);
        setInputText('');
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
        <button className="react-chat-sendButton" onClick={handleOnClick}><MdSend size={'1.5em'}/></button>
        </div>
    );
}