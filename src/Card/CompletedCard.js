import { PlusIcon, XIcon } from '@heroicons/react/solid';
import Card from './Card';

function CompletedCard({
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
        <PlusIcon className="w-6 h-6 stroke-current text-gray-400 mr-1" />
      </button>
      <button
        type="button"
        aria-label="Delete Completed Task"
        onClick={cardOnDelete}
        className="cursor-pointer"
      >
        <XIcon className="w-6 h-6 stroke-current text-gray-400" />
      </button>
    </div>
  );

  return (
    <div className="mb-2 bg-gray-100 text-gray-400">
      <Card content={taskContent} cardButtons={cardMenu} />
    </div>
  );
}

export default CompletedCard;
