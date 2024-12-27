import React from 'react'
import { useState, useEffect } from 'react'

export default function todoList() {
  const [taskList, setTaskList] = useState([])
  const [taskInput, setTaskInput] = useState('')

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTaskList(savedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList))
  }, [taskList])

  const handleAddTask = () => {
    const trimmedTask = taskInput.trim()
    if (trimmedTask.length === 0) {
      alert('Please enter a task!')
      return
    }

    setTaskList([...taskList, trimmedTask])
    setTaskInput('')
  }

  const handleDeleteTask = (index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index)
    setTaskList(updatedTasks)
  }

  return (
    <>
      <div className="input-group input-group-lg mt-4">
        <input
          id="task-input"
          type="text"
          className="form-control"
          placeholder="Add your task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <i
          id="task-add-btn"
          className="bi bi-plus-circle-fill input-group-text"
          onClick={handleAddTask}
          style={{ cursor: 'pointer' }}
        ></i>
      </div>
      <hr />
      <div className="task-list list-group py-1">
        {taskList.length === 0 ? (
          <div className="text-center text-muted">
            📋 <span>Task is empty</span>
          </div>
        ) : (
          taskList.map((task, index) => (
            <div
              key={index}
              className="task px-3 list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <a className="text-decoration-none text-dark text-break text-start">{task}</a>
              <i
                className="bi bi-trash3-fill fs-6 text-danger px-3"
                style={{ cursor: 'pointer' }}
                onClick={() => handleDeleteTask(index)}
              ></i>
            </div>
          ))
        )}
      </div>
      <hr />
    </>
  )
}
