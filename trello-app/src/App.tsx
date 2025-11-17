import { useState } from 'react';
import { Layout } from './components/Layout';
import { Board } from './pages/Board';
import { Dashboard } from './pages/Dashboard';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'board' | 'dashboard'>('board');

  const {
    filteredTasks,
    filter,
    stats,
    users,
    updateTaskStatus,
    updateTask,
    createTask,
    deleteTask,
    updateFilter,
    clearFilter,
  } = useTasks();

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'board' ? (
        <Board
          tasks={filteredTasks}
          filter={filter}
          onFilterChange={updateFilter}
          onClearFilter={clearFilter}
          onUpdateStatus={updateTaskStatus}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onCreateTask={createTask}
          users={users}
        />
      ) : (
        <Dashboard stats={stats} tasks={filteredTasks} users={users} />
      )}
    </Layout>
  );
}
