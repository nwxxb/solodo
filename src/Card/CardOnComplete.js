import Card from './Card';

function CardOnComplete({
  content,
  id,
  onTaskCompleted,
  onTaskDelete,
}) {
  function cardOnDelete() {
    onTaskDelete(id);
  }

  function cardOnCompleted() {
    onTaskCompleted(id);
  }

  const taskContent = (
    <div className="text-xl flex-1 break-words min-w-0 mr-2">
      {content}
    </div>
  );

  const cardMenu = (
    <div className="group flex">
      <button
        type="button"
        aria-label="Uncheck Task"
        onClick={cardOnCompleted}
        className="cursor-pointer"
      >
        <svg
          className="w-6 h-6 stroke-current text-gray-400 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Delete Completed Task"
        onClick={cardOnDelete}
        className="cursor-pointer"
      >
        <svg
          className="w-6 h-6 stroke-current text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="mb-2 bg-gray-100 text-gray-400">
      <Card content={taskContent} cardButtons={cardMenu} />
    </div>
  );
}

export default CardOnComplete;
