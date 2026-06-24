import { useState } from "react"
import { FaRegCircleCheck } from "react-icons/fa6"
import { FaRegCircle } from "react-icons/fa"

export default function SubtaskList({
  subtasks,
  columnId,
  taskId,
  onAdd,
  onUpdate,
  onDelete,
}) {
  return (
    <div className="subtask-list">
      {subtasks.map((subtask) => (
        <SubtaskItem
          key={subtask.id}
          subtask={subtask}
          columnId={columnId}
          taskId={taskId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

function SubtaskItem({ subtask, columnId, taskId, onUpdate, onDelete }) {
  const [text, setText] = useState(subtask.text)
  const [editing, setEditing] = useState(!subtask.text)

  function handleBlur() {
    setEditing(false)
    if (text.trim() && text !== subtask.text) {
      onUpdate(columnId, taskId, subtask.id, { text: text.trim() })
    } else {
      setText(subtask.text)
    }
    if (!text.trim() && !subtask.text) {
      onDelete(columnId, taskId, subtask.id)
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === "Escape") {
      setText(subtask.text)
      setEditing(false)
    }
  }

  return (
    <div className="subtask">
      <button
        className={`subtask-checkbox${subtask.done ? " done" : ""}`}
        onClick={() =>
          onUpdate(columnId, taskId, subtask.id, { done: !subtask.done })
        }
        title={subtask.done ? "Marcar como pendiente" : "Marcar como completada"}
      >
        {subtask.done ? <FaRegCircleCheck /> : <FaRegCircle />}
      </button>
      {editing ? (
        <input
          className="subtask-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className={`subtask-text ${subtask.done ? "done" : ""}`}
          onClick={() => setEditing(true)}
        >
          {subtask.text}
        </span>
      )}
      <button
        className="btn-delete-subtask"
        onClick={() => onDelete(columnId, taskId, subtask.id)}
      >
        ✕
      </button>
    </div>
  )
}
