import { useRef } from 'react'

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

  function handleClick() {
    if (inputRef.current.value) {
      handleSubmit(inputRef.current.value)
      inputRef.current.value = ""
    }
  }

  function handleSubmit(value) {
    const key = value.trim();
    if (key) {
      onTaskSubmit(key);
    }
  }

  return (
    <div className="mb-4 items-center flex border rounded bg-white">
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="p-2 pl-4 text-xl w-full rounded"
        type="text"
        placeholder={isDisabled ? "mengambil tugas..." : "Ketikkan tugasmu disini"}
        disabled={isDisabled}
        maxLength="200"
      />
      <span onClick={handleClick} className="text-sm border font-medium text-white bg-blue-400 hover:bg-blue-500 cursor-pointer mx-2 p-2 rounded-md select-none">↵</span>
    </div>
  );
}

export default TaskInput;
