import React, { useEffect, useState } from 'react'
import TaskLists from './TaskLists'
import { DragDropContext } from 'react-beautiful-dnd'
import TaskInput from './TaskInput'
import Skeleton from './Skeleton'
import CardOnFocus from '../Card/CardOnFocus'
import DATA from '../data'

function TodoList() {
  let [data, setData] = useState({})
  let [isLoaded, setIsLoaded] = useState(false)
  let [taskOnFocus, setTaskOnFocus] = useState({})
  let [inFocus, setInFocus] = useState(false)
  
  let Title = (
    <h1 className="text-2xl md:text-4xl text-center font-bold mb-4 select-none">
      Fokus pada <span className="text-blue-400">Satu</span> pekerjaan.
    </h1>
  );

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("data")) || DATA);
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  useEffect(() => {
    if (inFocus && data.editColumn.taskOrder.length) {
      const taskOnFocusId = data.editColumn.taskOrder[0]
      const taskOnFocus = {...data.tasks[taskOnFocusId]}
      setTaskOnFocus(taskOnFocus) 
    } else {
      setInFocus(false)
    }
  }, [inFocus, data])

  function handleCreateTask(content) {
    const taskId = `task-${Date.now()}`
    const newTaskObj = {
      id: taskId, 
      content: content,
      isCompleted: false
    }

    let newData = {...data}
    newData.tasks[taskId] = newTaskObj
    newData.editColumn.taskOrder = [...data.editColumn.taskOrder, taskId]
    setData(newData)
  }

  function handleCompletedTask(id) {
    let newTasks = {...data.tasks}
    newTasks[id].isCompleted = !newTasks[id].isCompleted
    let newTaskOrder = [...data.editColumn.taskOrder];
    let newCompletedTasks = [...data.completedTasks];

    if (newTasks[id].isCompleted) {
      newTaskOrder = newTaskOrder.filter((taskId) => taskId !== id);
      newCompletedTasks = [id, ...newCompletedTasks];
    } else {
      newCompletedTasks = newCompletedTasks.filter((taskId) => taskId !== id)
      newTaskOrder = [...newTaskOrder, id];
    }
    
    
    let newData = {
      tasks: newTasks,
      editColumn: {
        ...data.editColumn,
        taskOrder: newTaskOrder
      },
      completedTasks: newCompletedTasks
    }

    setData(newData)
  }

  function handleDeleteTask(id) {
    let newTasks = {...data.tasks}
    delete newTasks[id]
    let newTaskOrder = data.editColumn.taskOrder.filter(taskId => taskId !== id)
    let newCompletedTasks = data.completedTasks.filter(taskId => taskId !== id)
    const newData = {
      tasks: newTasks,
      editColumn: {
        ...data.editColumn,
        taskOrder : newTaskOrder
      },
      completedTasks : newCompletedTasks
    }
    
    
    setData(newData)
  }

  function handleUpdateTask(id, newContent) {
    let newTasks = {...data.tasks}
    newTasks[id].content = newContent
    const newData = {
      ...data,
      tasks: newTasks
    }
    setData(newData)
  }

  function onDragEnd(result) {
    const { draggableId, source, destination } = result

    if (!destination) return ;
    if (source.index === destination.index) return ;

    let newTaskOrder = [...data.editColumn.taskOrder]
    newTaskOrder.splice(source.index, 1)
    newTaskOrder.splice(destination.index, 0, draggableId)

    let newData = {
      ...data,
      editColumn: {
        ...data.editColumn,
        taskOrder: newTaskOrder
      }
    }

    setData(newData)
  }

  return inFocus ? (
    <div className="flex flex-1 flex-col justify-center">
      <CardOnFocus
        content={taskOnFocus.content}
        id={taskOnFocus.id}
        onTaskCompleted={handleCompletedTask}
      />
      <button
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
