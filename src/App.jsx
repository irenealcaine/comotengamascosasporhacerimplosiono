import { DragDropContext } from "@hello-pangea/dnd"
import { useTasks } from "./hooks/useTasks"
import Column from "./components/Column"
import "./styles/App.css"

const COLUMNS = ["today", "someday", "parked"]

export default function App() {
  const {
    columns,
    addTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    moveTask,
    COLORS,
  } = useTasks()

  function handleDragEnd(result) {
    const { source, destination } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    moveTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          ¿Que narices tengo que hacer hoy?
        </h1>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <main className="board">
          {COLUMNS.map((colId) => (
            <Column
              key={colId}
              columnId={colId}
              tasks={columns[colId]}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onAddSubtask={addSubtask}
              onUpdateSubtask={updateSubtask}
              onDeleteSubtask={deleteSubtask}
              colors={COLORS}
            />
          ))}
        </main>
      </DragDropContext>
    </div>
  )
}
