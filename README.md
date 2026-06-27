# Como Tenga Mas Cosas Por Hacer Implosiono

Tablero de tareas estilo Kanban con post-its de colores. Organiza tus pendientes arrastrando y soltando entre columnas.

## Descripcion

Una aplicacion de gestion de tareas con estetica de post-its de colores. Cada tarea es un post-it que puedes mover entre tres columnas segun su prioridad. Las tareas pueden tener subtareas con checkboxes para un seguimiento mas detallado.

### Columnas

- **Para ya** - Tareas urgentes para hoy
- **Para cuando se pueda** - Tareas pendientes sin fecha fija
- **Aparcao** - Tareas archivadas o pausadas

## Caracteristicas

- Tres columnas de organizacion
- Post-its con colores aleatorios
- Drag and drop para mover tareas entre columnas
- Edicion inline de titulos de tareas
- Subtareas con checkboxes
- Colores aleatorios para cada post-it
- Persistencia de datos en localStorage
- Interfaz responsiva (movil, tablet, desktop)
- Modo oscuro por defecto
- Tipografia manuscrita (Caveat)

## Stack tecnologico

- React 19
- Vite 8
- JavaScript (ES6+)
- CSS plain
- @hello-pangea/dnd (drag and drop)
- react-icons

## Requisitos

- Node.js >= 18
- pnpm

## Instalacion

```bash
git clone <url-del-repositorio>
cd comotengamascosasporhacerimplosiono
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Vista previa del build

```bash
pnpm preview
```

## Lint

```bash
pnpm lint
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Column.jsx       # Columna del tablero con area droppable
│   ├── PostIt.jsx       # Post-it individual con edicion y drag
│   └── SubtaskList.jsx  # Lista de subtareas con checkboxes
├── hooks/
│   └── useTasks.js      # Logica de estado y persistencia
├── styles/
│   └── App.css          # Estilos globales
├── App.jsx
└── main.jsx
```
