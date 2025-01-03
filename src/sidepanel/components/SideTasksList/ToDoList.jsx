import React from 'react'
import { useState, useEffect } from 'react'
import './ToDoList.css'

export default function ToDoList() {
  const [taskList, setTaskList] = useState([])

  useEffect(() => {
    chrome.storage.local.get(['tasks'], (res) => {
      setTaskList(res.tasks || [])
    })

    const handleStorageChange = (changes) => {
      if (changes.tasks) {
        setTaskList(changes.tasks.newValue || [])
      }
    }
    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [])

  const handleDeleteTask = (index) => {
    const updatedTasks = taskList.filter((_, i) => i !== index)
    setTaskList(updatedTasks)
    chrome.storage.local.set({ tasks: updatedTasks })
  }
  return (
    <>
      <h3 className=" mt-4" style={{ fontSize: '20px' }}>
        To Do List
      </h3>
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
