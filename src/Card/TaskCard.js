import { Draggable } from 'react-beautiful-dnd';
import ContentEditable from 'react-contenteditable';
import { useEffect, useState } from 'react';
import createDOMPurify from 'dompurify';
import { XIcon } from '@heroicons/react/solid';
import DragHandlerIcon from '../Icons/DragHandlerIcon';
import Card from './Card';

const DOMPurify = createDOMPurify(window);

function TaskCard({
  content, id, index, onTaskUpdate, onTaskCompleted, onTaskDelete,
}) {
  const [text, setText] = useState(content);
  const [onEdit, setOnEdit] = useState(false);

  function cardOnDelete() {
    onTaskDelete(id);
  }

  function handlePaste(e) {
    e.preventDefault();
    const pastedText = DOMPurify.sanitize(e.clipboardData.getData('text/plain'));
    document.execCommand('insertHTML', false, pastedText.trim().substr(0, 200));
  }

  useEffect(() => {
    if (onEdit && text !== content) {
      onTaskUpdate(id, DOMPurify.sanitize(text));
    } else if (!text) {
      cardOnDelete();
    }
  }, [text, onEdit]);

  useEffect(() => {
    if (text.length >= 200) {
      const temp = text.substr(0, 200);
      setText(temp);
    }
  }, [text]);

  function handleFocus() {
    setOnEdit(true);
  }

  function handleChange(e) {
    setText(e.target.value.trim());
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.target.blur();
    }
  }

  function handleBlur() {
    setOnEdit(false);
  }

  function cardOnCompleted() {
    onTaskCompleted(id);
  }

  const contentEditable = (
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

  const cardMenu = (
    <div className="group flex min-w-0">
      <button
        type="button"
        aria-label="Delete Task"
        onClick={cardOnDelete}
        className="cursor-pointer"
      >
        <XIcon className="w-6 h-6 stroke-current text-red-400" />
      </button>
    </div>
  );

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="flex flex-col flex-1"
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
        >
          <div className="flex items-center mb-1">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <div {...provided.dragHandleProps}>
              <DragHandlerIcon margin={onEdit ? 'mb-0' : 'mb-2'} />
            </div>
            <div
              className={`${
                onEdit ? 'mb-0' : 'mb-2'
              } bg-white shadow-sm border flex-1 min-w-0 break-words`}
            >
              <Card content={contentEditable} cardButtons={cardMenu} />
            </div>
          </div>
          {onEdit ? (
            <div
              className={`${
                onEdit ? 'mb-2' : 'mb-0'
              } self-end text-base md:text-xs text-gray-600 select-none`}
            >
              <span className={`${text.length > 200 ? 'text-red-500' : 'text-gray-600'} mr-2`}>
                {text.length}
                /200
              </span>
              <button
                type="button"
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

export default TaskCard;
