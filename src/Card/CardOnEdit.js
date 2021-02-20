import Card from './Card'
import { Draggable } from 'react-beautiful-dnd'
import ContentEditable from 'react-contenteditable'
import { useEffect, useState } from 'react'
import { trimSpaces } from '../helper'

function CardOnEdit({ content, id, index, onTaskUpdate, onTaskCompleted, onTaskDelete }) {
  let [text, setText] = useState(content)
  let [onEdit, setOnEdit] = useState(false)

  function handlePaste(e) {
    e.preventDefault()
    const text = e.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text.trim().substr(0, 200))
  }

  useEffect(() => {
    if (onEdit && text !== content) {
      onTaskUpdate(id, text);
    } else {
      if (!text) {
        cardOnDelete()  
      }
    }
  }, [text, onEdit])

  useEffect(() => {
    if (text.length >= 200) {
      const temp = text.substr(0, 200)
      setText(temp)
    }
  }, [text]);

  function handleFocus() {
      setOnEdit(true);
  }

  function handleChange(e) {
    setText(trimSpaces(e.target.value).trim())
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      e.target.blur()
      return
    }
  }

  function handleBlur() {
    setOnEdit(false);
  }

  function cardOnDelete() {
    onTaskDelete(id)
  }

  function cardOnCompleted() {
    onTaskCompleted(id)
  }

  let contentEditable = (
    <ContentEditable
      html={text}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      className="pl-1 text-xl flex-1 mr-2 min-w-0 focus:bg-gray-50 focus:outline-none rounded-sm focus:ring focus:ring-blue-400"
      tagName="p"
      data-max-length="10"
    />
  );

  let cardMenu = (
    <div className="group flex min-w-0">
      <button
        aria-label="Delete Task"
        onClick={cardOnDelete}
        className="cursor-pointer"
      >
        <svg
          className="w-6 h-6 stroke-current text-red-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="flex flex-col flex-1"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex items-center mb-1">
            <div {...provided.dragHandleProps}>
              <svg
                className={`w-8 h-8 stroke-current text-gray-300 cursor-move ${
                  onEdit ? "mb-0" : "mb-2"
                }`}
                fill="currentColor"
                viewBox="8   0 13 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              className={`${
                onEdit ? "mb-0" : "mb-2"
              } bg-white shadow-sm border flex-1 min-w-0 break-words`}
            >
              <Card content={contentEditable} cardButtons={cardMenu} />
            </div>
          </div>
          {onEdit ? (
            <div
              className={`${
                onEdit ? "mb-2" : "mb-0"
              } self-end text-base md:text-xs text-gray-600 select-none`}
            >
              <span className={`${text.length > 200 ? "text-red-500" : "text-gray-600"} mr-2`}>{text.length}/200</span>
              <button
                className="underline hover:bg-gray-100 py-1 px-2"
                onMouseDown={cardOnCompleted}
              >
                ✓ Sudahi Tugas
              </button>
            </div>
          ) : undefined}
        </div>
      )}
    </Draggable>
  );
}

export default CardOnEdit;
