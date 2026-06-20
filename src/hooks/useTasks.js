import { useState, useCallback, useEffect } from "react"

const STORAGE_KEY = "comotengamascosasporhacerimplosiono-tasks"

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { today: [], someday: [], parked: [] }
}

function saveToStorage(columns) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns))
  } catch {}
}

const COLORS = [
  "#FFF9C4",
  "#C8E6C9",
  "#F8BBD0",
  "#BBDEFB",
  "#FFE0B2",
  "#E1BEE7",
  "#B2DFDB",
  "#FFCCBC",
]

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

function createTask(title) {
  return {
    id: crypto.randomUUID(),
    title: title || "Nueva tarea",
    color: randomColor(),
    subtasks: [],
  }
}

export function useTasks() {
  const [columns, setColumns] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(columns)
  }, [columns])

  const addTask = useCallback((columnId) => {
    const task = createTask()
    setColumns((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], task],
    }))
  }, [])

  const updateTask = useCallback((columnId, taskId, updates) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((t) =>
        t.id === taskId ? { ...t, ...updates } : t
      ),
    }))
  }, [])

  const deleteTask = useCallback((columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((t) => t.id !== taskId),
    }))
  }, [])

  const addSubtask = useCallback((columnId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: [
                ...t.subtasks,
                { id: crypto.randomUUID(), text: "", done: false },
              ],
            }
          : t
      ),
    }))
  }, [])

  const updateSubtask = useCallback(
    (columnId, taskId, subtaskId, updates) => {
      setColumns((prev) => ({
        ...prev,
        [columnId]: prev[columnId].map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtasks: t.subtasks.map((s) =>
                  s.id === subtaskId ? { ...s, ...updates } : s
                ),
              }
            : t
        ),
      }))
    },
    []
  )

  const deleteSubtask = useCallback((columnId, taskId, subtaskId) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.filter((s) => s.id !== subtaskId),
            }
          : t
      ),
    }))
  }, [])

  const moveTask = useCallback((sourceCol, destCol, sourceIdx, destIdx) => {
    setColumns((prev) => {
      const newColumns = structuredClone(prev)
      const [moved] = newColumns[sourceCol].splice(sourceIdx, 1)
      newColumns[destCol].splice(destIdx, 0, moved)
      return newColumns
    })
  }, [])

  return {
    columns,
    addTask,
    updateTask,
    deleteTask,
    addSubtask,
    updateSubtask,
    deleteSubtask,
    moveTask,
    COLORS,
  }
}
