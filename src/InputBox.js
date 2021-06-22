import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { strip } from './utils';
import { KEYS } from './constant';
import SendIcon from './sendIcon.svg';
import AttachmentIcon from './attachment.svg';
import RemoveIcon from './remove.svg';

 const InputBox = (props) => {
  const [inputText, setInputText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInput = useRef(null);

  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const onSendMessage = (e) => {
    const str = strip(inputText);
    if (str.length || (selectedFiles && selectedFiles.length > 0)) {
      sendMessage(str, selectedFiles);
    } else {
      // to do cannot send empty message
    }
  };

  const onFileUpload = (e) => {
    let currFiles = e.target.files;
    let files = [...selectedFiles];

    if(props.multipleFiles === false) {
      setSelectedFiles([currFiles[0]])
    }
    else {
      for(let i = 0; i < currFiles.length; i++) {
        if(selectedFiles.findIndex(f => f.name === currFiles[i].name) === -1)
          files.push(currFiles[i]);
      }
      setSelectedFiles(files);
    }

    resetFileInput();
  }

  const resetFileInput = () => {
    try {
      fileInput.current.value = null
    }
    catch(e) {}
    finally {
      // For old browsers support, like: IE8, IE9, IE10 etc.
      if (fileInput.current.value) {
        fileInput.current.parentNode.replaceChild(fileInput.current.cloneNode(true), fileInput.current);
      }
    }
  }

  const onRemoveSelectedFile = (index) => {
    let files = [...selectedFiles]
    files.splice(index, 1);
    setSelectedFiles(files);
    resetFileInput();
  }

  const onClearSelectedFiles = () => {
    setSelectedFiles([]);
    resetFileInput();
  }

  const onKeyPress = (e) => {
    if ((props.onSendKey === undefined || e[props.onSendKey]) && e.charCode === 13) {
      const str = strip(inputText);

      if (str.length || (selectedFiles && selectedFiles.length > 0))
        sendMessage(str, selectedFiles);

      e.preventDefault();
      return false;
    }
  };

  const sendMessage = (message, files = []) => {
    if(!files)
      files = []
    props.onSendMessage(message, files);
    setInputText('');
    setSelectedFiles([]);
    resetFileInput();
  };

  return (
    <>
      {
        (!selectedFiles || selectedFiles.length === 0) ? null :
          <div className="react-chat-inputBox-selectedFiles">
            {
              selectedFiles.map((file, index) => (
                <span key={file.name} className="react-chat-inputBox-selectedItem">
                  <button className="react-chat-removeSelectedFileButton" onClick={() => onRemoveSelectedFile(index)}>
                    <RemoveIcon />
                  </button>
                  <span>{file.name}</span>
                </span>
              ))
      }
      {
        (props.multipleFiles === true) ? 
          <button className="react-chat-clearSelectedFiles" onClick={onClearSelectedFiles}>{props.clearFilesLabel}</button> :
          null
      }
          </div>
      }
      <div className={`react-chat-inputBox ${props.disabled ? 'disabled' : ''}`}>
        <div className="image-upload">
          <label htmlFor="attachment-input">
            <AttachmentIcon className={props.disabled ? 'react-chat-AttachmentIcon-disable' : 'react-chat-AttachmentIcon'} />
          </label>
          {
            (props.multipleFiles === false) ?
              <input ref={fileInput} type="file" id="attachment-input" className="react-chat-uploadFileButton" onChange={onFileUpload} disabled={props.disabled} /> :
              <input ref={fileInput} type="file" multiple id="attachment-input" className="react-chat-uploadFileButton" onChange={onFileUpload} disabled={props.disabled} />
          }
        </div>
        <TextareaAutosize
          maxRows={3}
          className="react-chat-textarea"
          placeholder={props.disabled ? props.disabledInputPlaceholder : props.placeholder}
          value={inputText}
          onChange={handleOnChange}
          onKeyPress={onKeyPress}
          autoFocus
          disabled={props.disabled}
        />
        <button className="react-chat-sendButton" onClick={onSendMessage} disabled={props.disabled}>
          <SendIcon className={props.disabled ? 'react-chat-SendIcon-disable' : 'react-chat-SendIcon'} />
        </button>
      </div>
    </>
  );
}

InputBox.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  disabledInputPlaceholder: PropTypes.string,
  placeholder: PropTypes.string,
  clearFilesLabel: PropTypes.string,
  onSendKey: PropTypes.oneOf(KEYS),
  multipleFiles: PropTypes.bool
};

InputBox.defaultProps = {
  onSendMessage: null,
  disabled: false,
  disabledInputPlaceholder: '',
  placeholder: 'Write a message...',
  clearFilesLabel: 'Clear all',
  onSendKey: undefined,
  multipleFiles: true
};

export default InputBox;