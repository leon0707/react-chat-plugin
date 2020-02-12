import React from 'react';
import PropTypes from 'prop-types';

import RobotIcon from './comments.svg';
import CloseIcon from './compress-alt.svg';

import './ChatFrame.css';

function ChatFrame(props) {

	const { icon, chatbox, showChatbox, clickIcon, showIcon } = props;

	return (
		<div className="react-chat-frame">
			<div className="react-chat-frame-wrapper">
				{showChatbox && chatbox !== undefined &&
					<>
					<div className="react-chat-close-icon" onClick={clickIcon}>
						<CloseIcon />
					</div>
					{ chatbox }
					</>
				}
				{!showChatbox &&
					<div className="react-chat-frame-custom">
						{ props.children }
					</div>
				}
				{showIcon &&
					<div className="react-chat-frame-icon" onClick={clickIcon} >
					{icon !== undefined ?
						icon
						:
						<RobotIcon />
					}
					</div>
				}
			</div>
		</div>
	);
}

ChatFrame.propTypes = {
	icon: PropTypes.element,
	chatbox: PropTypes.element.isRequired,
	showChatbox: PropTypes.bool,
	clickIcon: PropTypes.func,
	showIcon: PropTypes.bool
}

export default ChatFrame;