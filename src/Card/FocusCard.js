import Card from './Card';

function FocusCard({ content, id, onTaskCompleted }) {
  function cardOnCompleted() {
    onTaskCompleted(id);
  }

  const taskContent = (
    <div className="text-xl flex-1 break-words min-w-0 mr-2">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-400 select-none mb-1">
          Tugas yang dilakukan saat ini:
        </span>
        <span className="text-xl sm:text-2xl md:text-4xl font-medium">
          {content}
        </span>
      </div>
    </div>
  );

  const cardMenu = (
    <div className="group flex">
      <button
        type="button"
        aria-label="Check Task"
        onClick={cardOnCompleted}
        className="cursor-pointer"
      >
        <svg
          className="w-8 h-8 stroke-current text-blue-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="flex items-center">
      <div className="mb-2 w-full border bg-white px-2 py-4 shadow-lg rounded text-gray-900">
        <Card content={taskContent} cardButtons={cardMenu} />
      </div>
    </div>
  );
}

export default FocusCard;
