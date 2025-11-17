import { Filter, Priority, User } from '../types';
import { Search, X, Filter as FilterIcon } from 'lucide-react';
import { tags } from '../data/mockData';
import { useState } from 'react';

interface FilterBarProps {
  filter: Filter;
  users: User[];
  onFilterChange: (filter: Partial<Filter>) => void;
  onClearFilter: () => void;
}

export function FilterBar({ filter, users, onFilterChange, onClearFilter }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filter.authors.length > 0 ||
    filter.tags.length > 0 ||
    filter.priorities.length > 0 ||
    filter.searchQuery !== '';

  const toggleAuthor = (userId: string) => {
    const newAuthors = filter.authors.includes(userId)
      ? filter.authors.filter((id) => id !== userId)
      : [...filter.authors, userId];
    onFilterChange({ authors: newAuthors });
  };

  const toggleTag = (tag: string) => {
    const newTags = filter.tags.includes(tag)
      ? filter.tags.filter((t) => t !== tag)
      : [...filter.tags, tag];
    onFilterChange({ tags: newTags });
  };

  const togglePriority = (priority: Priority) => {
    const newPriorities = filter.priorities.includes(priority)
      ? filter.priorities.filter((p) => p !== priority)
      : [...filter.priorities, priority];
    onFilterChange({ priorities: newPriorities });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2.5 rounded-lg border transition-all ${
            showFilters || hasActiveFilters
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <FilterIcon className="w-5 h-5" />
        </button>

        {hasActiveFilters && (
          <button
            onClick={onClearFilter}
            className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all"
            title="Clear filters"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showFilters && (
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">Assignees</h4>
            <div className="flex flex-wrap gap-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => toggleAuthor(user.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    filter.authors.includes(user.id)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full" />
                  <span className="text-sm">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                    filter.tags.includes(tag)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-2">Priority</h4>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as Priority[]).map((priority) => (
                <button
                  key={priority}
                  onClick={() => togglePriority(priority)}
                  className={`px-4 py-1.5 rounded-lg border text-sm capitalize transition-all ${
                    filter.priorities.includes(priority)
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
