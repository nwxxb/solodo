import { Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TaskCard from '../Card/TaskCard';
import CompletedCard from '../Card/CompletedCard';
import ImageOnEmpty from '../imageOnEmpty.svg';
import ImageOnAllDone from '../imageOnAllDone.svg';

function TaskLists({
  column, completedTasks, tasks, taskCompletedHandler, taskDeleteHandler, taskUpdateHandler,
}) {
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const TaskOnEditLists = column.taskOrder.length ? (
    <Droppable droppableId={column.id}>
      {(provided) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {column.taskOrder.map((taskId, index) => {
            const taskOnRender = tasks[taskId];
            return (
              <TaskCard
                content={taskOnRender.content}
                id={taskOnRender.id}
                index={index}
                key={taskOnRender.id}
                onTaskCompleted={taskCompletedHandler}
                onTaskDelete={taskDeleteHandler}
                onTaskUpdate={taskUpdateHandler}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ) : (
    <div className="flex flex-col items-center py-4">
      {completedTasks.length > 0 ? (
        <>
          <img className="mb-8 h-40 select-none" src={ImageOnAllDone} alt="all task is completed" />
          <span className="text-lg text-gray-300 font-medium text-center select-none">
            Wohooo!, Semua tugas telah selesai!.
          </span>
        </>
      ) : (
        <>
          <img className="mb-8 h-40 select-none" src={ImageOnEmpty} alt="task is empty" />
          <span className="text-lg text-gray-300 font-medium text-center select-none">
            tidak ada tugas tersedia (wohoo?). Ayo ketikkan tugas baru diatas!
          </span>
        </>
      )}
    </div>
  );

  const TaskCompletedLists = completedTasks.length > 0 ? (
    <>
      {completedTasks.map((taskId) => {
        const taskOnRender = tasks[taskId];
        return (
          <CompletedCard
            content={taskOnRender.content}
            id={taskOnRender.id}
            key={taskOnRender.id}
            onTaskCompleted={taskCompletedHandler}
            onTaskDelete={taskDeleteHandler}
          />
        );
      })}
    </>
  ) : undefined;

  return (
    <div className="flex flex-col">
      <div className="py-2">{TaskOnEditLists}</div>
      {completedTasks.length > 0
        && (showCompletedTasks ? (
          <>
            <button
              type="button"
              className="text-gray-500 text-base md:text-sm select-none hover:bg-gray-100 py-1"
              onClick={() => setShowCompletedTasks(false)}
            >
              <svg
                className="w-4 h-4 inline stroke-current text-gray-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              hide completed tasks
            </button>
            <div className="py-2">{TaskCompletedLists}</div>
          </>
        ) : (
          <button
            type="button"
            className="text-gray-500 text-base md:text-sm select-none hover:bg-gray-100 py-1"
            onClick={() => setShowCompletedTasks(true)}
          >
            <svg
              className="w-4 h-4 inline stroke-current text-gray-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            show completed tasks
          </button>
        ))}
    </div>
  );
}

export default TaskLists;
