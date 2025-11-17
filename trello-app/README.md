# TaskFlow - Professional Task Management Application

A modern, feature-rich task management application inspired by Trello, built with React 18, TypeScript, and Tailwind CSS.

## Features

### 📋 Task Board
- **Kanban View**: Drag-and-drop interface with four status columns (To Do, In Progress, In Review, Done)
- **List View**: Organized list view grouped by task status
- **Quick Task Creation**: Add tasks directly to any column
- **Advanced Filtering**: Filter by assignees, tags, and priorities
- **Search**: Real-time search across task titles, descriptions, and tags

### ✏️ Task Management
- **Full CRUD Operations**: Create, read, update, and delete tasks
- **Rich Task Details**:
  - Title and description
  - Priority levels (Low, Medium, High)
  - Status tracking
  - Assignee management
  - Multiple tags
  - Due dates
- **Modal Editor**: Intuitive modal interface for editing tasks

### 📊 Professional Dashboard
- **KPI Metrics**:
  - Completion rate
  - On-time completion percentage
  - Active tasks count
  - Overdue tasks count

- **Visualizations**:
  - Stacked bar chart for tasks by status and priority
  - Donut chart for tag distribution
  - Line chart for task creation vs completion trends (14 days)
  - Team leaderboard with completion percentages

- **Timeline & Activity**:
  - Upcoming deadlines (next 7 days)
  - Recent activity feed

### 🎨 Design & UX
- **Dark Mode**: Professional dark theme by default
- **Fully Responsive**: Optimized for all screen sizes
- **Smooth Animations**: Polished drag-and-drop and transitions
- **Modern UI**: Clean, intuitive interface with Lucide icons

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Package Manager**: pnpm
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd trello-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## Project Structure

```
trello-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── FilterBar.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── Layout.tsx
│   │   ├── ListView.tsx
│   │   ├── Modal.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskModal.tsx
│   ├── data/             # Mock data
│   │   └── mockData.ts
│   ├── hooks/            # Custom React hooks
│   │   └── useTasks.ts
│   ├── pages/            # Page components
│   │   ├── Board.tsx
│   │   └── Dashboard.tsx
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── taskUtils.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── style.css         # Global styles
├── public/               # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Mock Data

The application comes pre-loaded with:
- **120 tasks** with realistic titles and descriptions
- **6 team members**
- **15 tags** (frontend, backend, bug, feature, design, etc.)
- **50 recent activities**

All mock data is tech/development themed.

## Features in Detail

### Kanban Board
- Drag tasks between columns to update their status
- Visual indicators for priorities and overdue tasks
- Avatar badges for assignees
- Tag pills for categorization
- Click any task to open the detail modal

### Task Modal
- Edit all task properties in one place
- User-friendly date picker for due dates
- Tag selection with visual feedback
- Status and priority dropdowns
- Delete tasks with confirmation

### Filters
- Multi-select filters for assignees, tags, and priorities
- Cumulative filtering (combine multiple filter types)
- Clear all filters with one click
- Filter state persists while navigating

### Dashboard Analytics
- Real-time calculations based on current task data
- Interactive charts with tooltips
- Team performance leaderboard
- Upcoming deadline tracking
- Activity timeline

## Customization

### Adding New Tags
Edit `src/data/mockData.ts` and add to the `tags` array:
```typescript
export const tags = [
  'frontend',
  'backend',
  'your-new-tag',
  // ...
];
```

### Modifying Status Columns
Edit `src/utils/taskUtils.ts` to customize status configurations:
```typescript
export const statusConfig: Record<Status, { label: string; color: string }> = {
  todo: { label: 'To Do', color: '#64748b' },
  // ...
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)
