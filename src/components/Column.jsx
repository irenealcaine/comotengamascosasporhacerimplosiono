import { Droppable } from "@hello-pangea/dnd"
import PostIt from "./PostIt"

const COLUMN_TITLES = {
  today: "Para ya",
  someday: "Para cuando se pueda",
  parked: "Aparcao",
}

export default function Column({
  columnId,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onAddSubtask,
  onUpdateSubtask,
  onDeleteSubtask,
  colors,
}) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{COLUMN_TITLES[columnId]}</h2>
        <button
          className="btn-add-task"
          onClick={() => onAddTask(columnId)}
        >
          +
        </button>
      </div>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            className={`postit-grid ${snapshot.isDraggingOver ? "drag-over" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <PostIt
                key={task.id}
                task={task}
                index={index}
                columnId={columnId}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onAddSubtask={onAddSubtask}
                onUpdateSubtask={onUpdateSubtask}
                onDeleteSubtask={onDeleteSubtask}
                colors={colors}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
