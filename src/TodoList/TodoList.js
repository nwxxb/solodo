import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskLists from './TaskLists';
import TaskInput from './TaskInput';
import Skeleton from './Skeleton';
import CardOnFocus from '../Card/CardOnFocus';
import DATA from '../data';

function TodoList() {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [taskOnFocus, setTaskOnFocus] = useState({});
  const [inFocus, setInFocus] = useState(false);

  const Title = (
    <h1 className="text-2xl md:text-4xl text-center font-bold mb-4 select-none">
      Fokus pada
      {' '}
      <span className="text-blue-400">Satu</span>
      {' '}
      pekerjaan.
    </h1>
  );

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('data')) || DATA);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (inFocus && data.editColumn.taskOrder.length) {
      const taskOnFocusId = data.editColumn.taskOrder[0];
      const newTaskOnFocus = { ...data.tasks[taskOnFocusId] };
      setTaskOnFocus(newTaskOnFocus);
    } else {
      setInFocus(false);
    }
  }, [inFocus, data]);

  function handleCreateTask(content) {
    const taskId = `task-${Date.now()}`;
    const newTaskObj = {
      id: taskId,
      content,
      isCompleted: false,
    };

    const newData = { ...data };
    newData.tasks[taskId] = newTaskObj;
    newData.editColumn.taskOrder = [...data.editColumn.taskOrder, taskId];
    setData(newData);
  }

  function handleCompletedTask(id) {
    const newTasks = { ...data.tasks };
    newTasks[id].isCompleted = !newTasks[id].isCompleted;
    let newTaskOrder = [...data.editColumn.taskOrder];
    let newCompletedTasks = [...data.completedTasks];

    if (newTasks[id].isCompleted) {
      newTaskOrder = newTaskOrder.filter((taskId) => taskId !== id);
      newCompletedTasks = [id, ...newCompletedTasks];
    } else {
      newCompletedTasks = newCompletedTasks.filter((taskId) => taskId !== id);
      newTaskOrder = [...newTaskOrder, id];
    }

    const newData = {
      tasks: newTasks,
      editColumn: {
        ...data.editColumn,
        taskOrder: newTaskOrder,
      },
      completedTasks: newCompletedTasks,
    };

    setData(newData);
  }

  function handleDeleteTask(id) {
    const newTasks = { ...data.tasks };
    delete newTasks[id];
    const newTaskOrder = data.editColumn.taskOrder.filter((taskId) => taskId !== id);
    const newCompletedTasks = data.completedTasks.filter((taskId) => taskId !== id);
    const newData = {
      tasks: newTasks,
      editColumn: {
        ...data.editColumn,
        taskOrder: newTaskOrder,
      },
      completedTasks: newCompletedTasks,
    };

    setData(newData);
  }

  function handleUpdateTask(id, newContent) {
    const newTasks = { ...data.tasks };
    newTasks[id].content = newContent;
    const newData = {
      ...data,
      tasks: newTasks,
    };
    setData(newData);
  }

  function onDragEnd(result) {
    const { draggableId, source, destination } = result;

    if (!destination) return;
    if (source.index === destination.index) return;

    const newTaskOrder = [...data.editColumn.taskOrder];
    newTaskOrder.splice(source.index, 1);
    newTaskOrder.splice(destination.index, 0, draggableId);

    const newData = {
      ...data,
      editColumn: {
        ...data.editColumn,
        taskOrder: newTaskOrder,
      },
    };

    setData(newData);
  }

  return inFocus ? (
    <div className="flex flex-1 flex-col justify-center">
      <CardOnFocus
        content={taskOnFocus.content}
        id={taskOnFocus.id}
        onTaskCompleted={handleCompletedTask}
      />
      <button
        type="button"
        onClick={() => setInFocus(false)}
        className="p-4 self-center text-center mt-8 text-sm bg-gray-50 border rounded-md text-gray-900 underline select-none"
      >
        Kembali ke Mode Edit
      </button>
    </div>
  ) : (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-1 flex-col justify-between">
        {Title}
        <div className="flex-1">
          <TaskInput isDisabled={!isLoaded} onTaskSubmit={handleCreateTask} />
          {isLoaded ? (
            <TaskLists
              column={data.editColumn}
              completedTasks={data.completedTasks}
              tasks={data.tasks}
              taskCompletedHandler={handleCompletedTask}
              taskDeleteHandler={handleDeleteTask}
              taskUpdateHandler={handleUpdateTask}
            />
          ) : (
            <Skeleton />
          )}
        </div>
        {isLoaded && data.editColumn.taskOrder.length ? (
          <button
            type="button"
            onClick={() => setInFocus(true)}
            className="p-4 text-center self-center rounded-md bg-blue-400 hover:bg-blue-500 text-white mt-4 select-none"
          >
            Mulai Mode Fokus
          </button>
        ) : undefined}
      </div>
    </DragDropContext>
  );
}

export default TodoList;
