import React from 'react';
import { IconContext } from 'react-icons';
import { MdError } from 'react-icons/md';
import moment from 'moment';
import avatar from './placeholder.png';

export default function MessageBox(props) {
    if(props.type === 'text') {
        let time;
        if(props.timestampFormat === 'calendar') {
            time = moment(props.timestamp).calendar();
        } else if(props.timestampFormat === 'fromNow') {
            time = moment(props.timestamp).fromNow();
        } else {
            time = moment(props.timestamp).format(props.timestampFormat);
        }
        return (
            <div className={`react-chat-messageBox ${props.left ? 'react-chat-messageBoxLeft' : 'react-chat-messageBoxRight'}`}>
                <img
                    alt="avater img"
                    src={props.author.avatarUrl ? props.author.avatarUrl : avatar}
                    className={`react-chat-avatar ${props.left ? 'react-chat-avatarLeft' : 'react-chat-avatarRight'}`}
                />
                <div className={`react-chat-message ${props.left ? 'react-chat-messageLeft' : 'react-chat-messageRight'}`}>
                    <div className="react-chat-additional">
                        {props.author.username}
                    </div>
                    <div className={`react-chat-bubble ${props.left ? 'react-chat-leftBubble' : 'react-chat-rightBubble'} ${props.hasError ? 'react-chat-bubbleWithError' : ''}`}>
                        {props.content}
                        {props.hasError &&
                            <IconContext.Provider value={{ color: "red", className: `${props.left ? 'react-chat-errorLeft' : 'react-chat-errorRight'} react-chat-error` }}>
                                <MdError size={'1.5em'} />
                            </IconContext.Provider>
                        }
                    </div>
                    <div className="react-chat-additional">
                        { time }
                    </div>
                </div>
            </div>
        );
    } else if(props.type === 'notification') {
        return (
            <div className="my-3 text-center text-secondary react-chat-notification">
                {props.content}
            </div>
        );
    }
}