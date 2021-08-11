import { CheckIcon } from '@heroicons/react/solid';
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
        <CheckIcon className="w-8 h-8 stroke-current text-blue-400" />
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
