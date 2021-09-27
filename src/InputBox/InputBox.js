import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import { strip } from '../utils';
import { FileSelectMode, FILE_SELECT_MODE, KEYS } from '../constant';
import './InputBox.css';
import SendIcon from '../assets/sendIcon.svg';
import AttachmentIcon from '../assets/attachment.svg';
import RemoveIcon from '../assets/remove.svg';
import { labels } from '../labels';

const InputBox = (props) => {
  // State
  const [inputText, setInputText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [authorIdFor, setAuthorIdFor] = useState("0");
  const fileInput = useRef(null);

  useEffect(() => {
    setAuthorIdFor("0");
  }, [props.authors])

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

    if(props.fileSelectMode === FileSelectMode.Single) {
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
    if(fileInput && fileInput.current) {
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

  const onSelectMessageReceiver = (e) => {
    setAuthorIdFor(e.target.value);
  }

  const onKeyPress = (e) => {
    if(e.charCode === 13 && !e['shiftKey']) {
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
    props.onSendMessage(message, files, authorIdFor);
    setInputText('');
    setSelectedFiles([]);
    resetFileInput();
  };

  return (
    <>
      {/* region: Selected files (when fileSelectMode enabled) */}
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
            (props.fileSelectMode === FileSelectMode.Multiple) ? 
              <button className="react-chat-clearSelectedFiles" onClick={onClearSelectedFiles}> {props.labels.clearFiles} </button> :
              null
          }
          </div>
      }

      {/* region: Authors dropdown (for direct messaging) */}
      {
        (props.allowDirectMessage === false) ? null :
          <div className="react-chat-inputBox-targetReceiver">
            <span> {props.labels.to}: </span>
            <select onChange={onSelectMessageReceiver} value={authorIdFor}>
              <option key="0" value="0"> {props.labels.everyone} </option>
              {
                props.authors.map(author => <option key={author.id} value={author.id}> {author.username} </option>)
              }
            </select>
          </div>
      }

      {/* region: Input box */}
      <div className={`react-chat-inputBox ${props.disabled ? 'disabled' : ''}`}>
        {
          (props.fileSelectMode !== FileSelectMode.Disabled) ?
            <div className="file-select">
              <label htmlFor="attachment-input">
                <AttachmentIcon className={props.disabled ? 'react-chat-AttachmentIcon-disable' : 'react-chat-AttachmentIcon'} />
              </label>
              {
                (props.fileSelectMode === FileSelectMode.Single) ?
                  <input ref={fileInput} type="file" id="attachment-input" className="react-chat-uploadFileButton" onChange={onFileUpload} disabled={props.disabled} /> :
                  <input ref={fileInput} type="file" multiple id="attachment-input" className="react-chat-uploadFileButton" onChange={onFileUpload} disabled={props.disabled} />
              }
            </div> 
            : null
        }
        <TextareaAutosize
          maxRows={3}
          className="react-chat-textarea"
          placeholder={props.disabled ? props.labels.disabledPlaceholder : props.labels.placeholder}
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
  labels: PropTypes.object.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  fileSelectMode: PropTypes.oneOf(FILE_SELECT_MODE),
  allowDirectMessage: PropTypes.bool,
  authors: PropTypes.array
};

InputBox.defaultProps = {
  labels: labels,
  onSendMessage: null,
  disabled: false,
  fileSelectMode: FileSelectMode.Multiple,
  allowDirectMessage: false,
  authors: []
};

export default InputBox;