import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Stats, Task, User } from '../types';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Award,
} from 'lucide-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';
import { statusConfig, priorityConfig, getUpcomingTasks } from '../utils/taskUtils';
import { activities } from '../data/mockData';

interface DashboardProps {
  stats: Stats;
  tasks: Task[];
  users: User[];
}

export function Dashboard({ stats, tasks, users }: DashboardProps) {
  // Prepare data for status/priority stacked bar chart
  const statusPriorityData = Object.entries(stats.tasksByStatus).map(([status, count]) => {
    const statusTasks = tasks.filter((t) => t.status === status);
    return {
      name: statusConfig[status as keyof typeof statusConfig].label,
      low: statusTasks.filter((t) => t.priority === 'low').length,
      medium: statusTasks.filter((t) => t.priority === 'medium').length,
      high: statusTasks.filter((t) => t.priority === 'high').length,
      total: count,
    };
  });

  // Prepare data for tags donut chart
  const tagCounts: Record<string, number> = {};
  tasks.forEach((task) => {
    task.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const tagData = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, count]) => ({ name: tag, value: count }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  // Prepare data for trend line chart (last 14 days)
  const last14Days = eachDayOfInterval({
    start: subDays(new Date(), 13),
    end: new Date(),
  });

  const trendData = last14Days.map((day) => {
    const dayStr = format(day, 'MMM d');
    const created = tasks.filter(
      (t) => format(t.createdAt, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    ).length;
    const completed = tasks.filter(
      (t) =>
        t.status === 'done' &&
        format(t.updatedAt, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    ).length;
    return { date: dayStr, created, completed };
  });

  // User leaderboard
  const userStats = users.map((user) => {
    const userTasks = tasks.filter((t) => t.assignee.id === user.id);
    const completed = userTasks.filter((t) => t.status === 'done').length;
    const total = userTasks.length;
    return {
      user,
      completed,
      total,
      percentage: total > 0 ? (completed / total) * 100 : 0,
    };
  }).sort((a, b) => b.completed - a.completed);

  // Upcoming deadlines
  const upcomingTasks = getUpcomingTasks(tasks, 7);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Completion Rate</h3>
            <TrendingUp className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {stats.completionRate.toFixed(1)}%
          </p>
          <p className="text-slate-400 text-sm">
            {stats.completedTasks} of {stats.totalTasks} tasks
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">On-Time Completion</h3>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {stats.onTimeCompletion.toFixed(1)}%
          </p>
          <p className="text-slate-400 text-sm">Tasks completed by due date</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">In Progress</h3>
            <Clock className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            {stats.tasksByStatus.in_progress}
          </p>
          <p className="text-slate-400 text-sm">Active tasks</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-slate-400 text-sm font-medium">Overdue</h3>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-white mb-1">{stats.overdueTasks}</p>
          <p className="text-slate-400 text-sm">Tasks past due date</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stacked Bar Chart */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tasks by Status & Priority
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusPriorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="high" stackId="a" fill="#ef4444" name="High Priority" />
              <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium Priority" />
              <Bar dataKey="low" stackId="a" fill="#64748b" name="Low Priority" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Tasks by Tag</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tagData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {tagData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Tasks Created vs Completed (14 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Created"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                strokeWidth={2}
                name="Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Team Leaderboard */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Team Leaderboard
          </h3>
          <div className="space-y-3">
            {userStats.map((stat, index) => (
              <div key={stat.user.id} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <img
                  src={stat.user.avatar}
                  alt={stat.user.name}
                  className="w-10 h-10 rounded-full ring-2 ring-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 font-medium">{stat.user.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-12 text-right">
                      {stat.percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">{stat.completed}</p>
                  <p className="text-xs text-slate-400">completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            Upcoming Deadlines (Next 7 Days)
          </h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {upcomingTasks.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No upcoming deadlines</p>
            ) : (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: priorityConfig[task.priority].color,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200 font-medium truncate">{task.title}</p>
                    <p className="text-xs text-slate-400">
                      {task.dueDate && format(task.dueDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    className="w-8 h-8 rounded-full ring-2 ring-slate-700"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {activities.slice(0, 10).map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <img
                  src={activity.user.avatar}
                  alt={activity.user.name}
                  className="w-8 h-8 rounded-full ring-2 ring-slate-700 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">{activity.user.name}</span>{' '}
                    {activity.details.toLowerCase()}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {format(activity.timestamp, 'MMM d, h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
