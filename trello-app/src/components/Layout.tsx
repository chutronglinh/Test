import { ReactNode } from 'react';
import { LayoutDashboard, Kanban } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: 'board' | 'dashboard';
  onNavigate: (page: 'board' | 'dashboard') => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-slate-800 p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Kanban className="w-7 h-7 text-blue-500" />
            TaskFlow
          </h1>
          <p className="text-slate-400 text-sm mt-1">Task Management</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => onNavigate('board')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === 'board'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Kanban className="w-5 h-5" />
            <span className="font-medium">Task Board</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === 'dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-50">
        <div className="flex">
          <button
            onClick={() => onNavigate('board')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
              currentPage === 'board'
                ? 'text-blue-500'
                : 'text-slate-400'
            }`}
          >
            <Kanban className="w-6 h-6" />
            <span className="text-xs font-medium">Board</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 transition-all ${
              currentPage === 'dashboard'
                ? 'text-blue-500'
                : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="text-xs font-medium">Dashboard</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-64 p-6 lg:p-8 pb-24 lg:pb-8">
        {children}
      </main>
    </div>
  );
}
