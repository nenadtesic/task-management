import { useEffect, useState } from 'react'
import StatusLine from './components/StatusLine'
import "./styles/App.scss"


const App = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    loadTasksFromLocalStorage()
  }, [])

  const addEmptyTask = (status) => {
    const lastTask = tasks[tasks.length - 1]

    let newTaskId = 1

    if (lastTask !== undefined) {
      newTaskId = lastTask.id + 1
    }

    setTasks((tasks) => [...tasks, {
      id: newTaskId,
      title: "",
      description: "",
      urgency: "",
      status: status
    }])
  }

  const addTask = (taskToAdd) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskToAdd.id
    })

    let newTaskList = [...filteredTasks, taskToAdd]

    setTasks(newTaskList)

    saveTasksToLocalStorage(newTaskList)
  }

  const deleteTask = (taskId) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== taskId
    })

    setTasks(filteredTasks)

    saveTasksToLocalStorage(filteredTasks)
  }

  const moveTask = (id, newStatus) => {
    let task = tasks.filter((task) => {
      return task.id === id
    })[0]

    let filteredTasks = tasks.filter((task) => {
      return task.id !== id
    })

    task.status = newStatus

    let newTaskList = [...filteredTasks, task]

    setTasks(newTaskList)

    saveTasksToLocalStorage(newTaskList)
  }

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  const loadTasksFromLocalStorage = () => {
    let loadedTasks = localStorage.getItem("tasks")

    let tasks = JSON.parse(loadedTasks)

    if (tasks) {
      setTasks(tasks)
    }
  }

  return (
    <div className="App">
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Backlog"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  )
}

export default App
