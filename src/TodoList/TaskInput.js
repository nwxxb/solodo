import { useRef } from 'react'
import createDOMPurify from "dompurify";
const DOMPurify = createDOMPurify(window);

function TaskInput({ isDisabled, onTaskSubmit }) {
  const inputRef = useRef(null)

  function handleKeyDown(e) {
    if (e.key === "Enter" && inputRef.current.value) {
      handleSubmit(inputRef.current.value);
      e.target.value = ""
    } else if (e.key === "Escape") {
      inputRef.current.blur()
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = DOMPurify.sanitize(e.clipboardData.getData("text/plain"))
    document.execCommand("insertHTML", false, text.trim().substr(0, 200));
  }

  function handleClick() {
    if (inputRef.current.value) {
      handleSubmit(inputRef.current.value)
      inputRef.current.value = ""
    }
  }

  function handleSubmit(value) {
    const key = DOMPurify.sanitize(value.trim());
    if (key) {
      onTaskSubmit(key);
    }
  }

  return (
    <div className="mb-4 items-center flex border rounded bg-white">
      <label className="hidden" htmlFor="input-task"></label>
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        name="input-task"
        className="p-2 pl-4 text-xl w-full rounded focus:outline-none focus:ring focus:ring-blue-400"
        type="text"
        placeholder={
          isDisabled ? "mengambil tugas..." : "Ketikkan tugasmu disini"
        }
        disabled={isDisabled}
        maxLength="200"
      />
      <button
        aria-label="Add Task"
        onClick={handleClick}
        className="text-sm border font-medium text-white bg-blue-400 hover:bg-blue-500 cursor-pointer mx-2 p-2 rounded-md select-none"
      >
        ↵
      </button>
    </div>
  );
}

export default TaskInput;
