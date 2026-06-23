import { useState } from "react"
import { Draggable } from "@hello-pangea/dnd"
import SubtaskList from "./SubtaskList"

export default function PostIt({
  task,
  index,
  columnId,
  onUpdate,
  onDelete,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  function handleTitleBlur() {
    setEditing(false)
    if (title.trim() && title !== task.title) {
      onUpdate(columnId, task.id, { title: title.trim() })
    } else {
      setTitle(task.title)
    }
  }

  function handleTitleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      e.target.blur()
    }
    if (e.key === "Escape") {
      setTitle(task.title)
      setEditing(false)
    }
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`postit ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: task.color,
          }}
        >
          <div className="postit-header">
            {editing ? (
              <input
                className="postit-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                autoFocus
              />
            ) : (
              <h3
                className="postit-title"
                onClick={() => setEditing(true)}
              >
                {task.title}
              </h3>
            )}
            <div className="postit-actions">
              <button
                className="btn-delete"
                onClick={() => onDelete(columnId, task.id)}
                title="Eliminar tarea"
              >
                ✕
              </button>
            </div>
          </div>

          <SubtaskList
            subtasks={task.subtasks}
            columnId={columnId}
            taskId={task.id}
            onAdd={onAddSubtask}
            onUpdate={onUpdateSubtask}
            onDelete={onDeleteSubtask}
          />
          <button
            className="btn-add-subtask"
            onClick={() => onAddSubtask(columnId, task.id)}
          >
            +
          </button>
        </div>
      )}
    </Draggable>
  )
}
