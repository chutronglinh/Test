import { User, Task, Activity, Priority, Status } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Johnson&background=3b82f6&color=fff',
    color: '#3b82f6',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Smith&background=10b981&color=fff',
    color: '#10b981',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Carol+Davis&background=f59e0b&color=fff',
    color: '#f59e0b',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    avatar: 'https://ui-avatars.com/api/?name=David+Wilson&background=ef4444&color=fff',
    color: '#ef4444',
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Brown&background=8b5cf6&color=fff',
    color: '#8b5cf6',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Frank+Miller&background=ec4899&color=fff',
    color: '#ec4899',
  },
];

export const tags = [
  'frontend',
  'backend',
  'bug',
  'feature',
  'design',
  'documentation',
  'testing',
  'api',
  'database',
  'security',
  'performance',
  'refactoring',
  'deployment',
  'mobile',
  'infrastructure',
];

const taskTitles = [
  'Implement user authentication system',
  'Design new landing page',
  'Fix login redirect bug',
  'Optimize database queries',
  'Add dark mode toggle',
  'Create API documentation',
  'Implement payment gateway',
  'Refactor legacy code',
  'Setup CI/CD pipeline',
  'Add unit tests for auth module',
  'Design mobile app mockups',
  'Fix responsive layout issues',
  'Implement real-time notifications',
  'Optimize image loading',
  'Add search functionality',
  'Create admin dashboard',
  'Implement data export feature',
  'Fix memory leak in component',
  'Add email verification',
  'Implement password reset',
  'Design error pages',
  'Add loading states',
  'Implement drag and drop',
  'Fix cross-browser compatibility',
  'Add analytics tracking',
  'Implement file upload',
  'Create user profile page',
  'Add social login',
  'Implement rate limiting',
  'Fix CORS issues',
  'Add API versioning',
  'Implement caching layer',
  'Design component library',
  'Add accessibility features',
  'Implement websocket connections',
  'Fix production build errors',
  'Add internationalization',
  'Implement A/B testing',
  'Create onboarding flow',
  'Add push notifications',
  'Implement infinite scroll',
  'Fix TypeScript errors',
  'Add form validation',
  'Implement lazy loading',
  'Create changelog page',
  'Add keyboard shortcuts',
  'Implement user roles',
  'Fix security vulnerabilities',
  'Add data visualization',
  'Implement batch operations',
  'Create API rate limiter',
  'Add error monitoring',
  'Implement audit logging',
  'Fix performance bottleneck',
  'Add CSV export',
  'Implement webhooks',
  'Create status page',
  'Add custom themes',
  'Implement SSR',
  'Fix hydration errors',
  'Add SEO metadata',
  'Implement sitemap generation',
  'Create blog section',
  'Add comment system',
  'Implement content moderation',
  'Fix API timeout issues',
  'Add request retry logic',
  'Implement circuit breaker',
  'Create health check endpoint',
  'Add database migrations',
  'Implement backup system',
  'Fix data consistency issues',
  'Add transaction support',
  'Implement queue system',
  'Create worker processes',
  'Add job scheduling',
  'Implement distributed locks',
  'Fix race conditions',
  'Add connection pooling',
  'Implement load balancing',
  'Create monitoring dashboard',
  'Add alerting system',
  'Implement log aggregation',
  'Fix memory optimization',
  'Add performance profiling',
  'Implement feature flags',
  'Create experiment framework',
  'Add metrics collection',
  'Implement tracing',
  'Fix distributed tracing',
  'Add service mesh',
  'Implement API gateway',
  'Create microservices',
  'Add containerization',
  'Implement orchestration',
  'Fix deployment issues',
  'Add blue-green deployment',
  'Implement canary releases',
  'Create rollback mechanism',
  'Add disaster recovery',
  'Implement data replication',
  'Fix consistency issues',
  'Add sharding support',
  'Implement partitioning',
  'Create backup strategy',
  'Add encryption',
  'Implement key rotation',
  'Fix authentication flow',
  'Add OAuth integration',
  'Implement SAML support',
  'Create session management',
  'Add token refresh',
  'Implement MFA',
  'Fix authorization logic',
  'Add RBAC system',
  'Implement permissions',
  'Create access control',
];

const descriptions = [
  'This task requires careful planning and implementation',
  'Need to coordinate with the design team',
  'High priority issue affecting production',
  'Part of the Q4 roadmap',
  'User-requested feature with high demand',
  'Technical debt that needs addressing',
  'Performance improvement initiative',
  'Security enhancement requirement',
  'Bug reported by multiple users',
  'Integration with third-party service',
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateTasks(count: number): Task[] {
  const tasks: Task[] = [];
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const statuses: Status[] = ['todo', 'in_progress', 'in_review', 'done'];
  const priorities: Priority[] = ['low', 'medium', 'high'];

  for (let i = 0; i < count; i++) {
    const createdAt = getRandomDate(thirtyDaysAgo, now);
    const hasDueDate = Math.random() > 0.3;
    const status = getRandomElement(statuses);

    let dueDate: Date | null = null;
    if (hasDueDate) {
      dueDate = getRandomDate(createdAt, thirtyDaysFromNow);
    }

    tasks.push({
      id: `task-${i + 1}`,
      title: getRandomElement(taskTitles),
      description: getRandomElement(descriptions),
      status,
      priority: getRandomElement(priorities),
      assignee: getRandomElement(users),
      tags: getRandomElements(tags, Math.floor(Math.random() * 4) + 1),
      dueDate,
      createdAt,
      updatedAt: getRandomDate(createdAt, now),
    });
  }

  return tasks;
}

function generateActivities(tasks: Task[]): Activity[] {
  const activities: Activity[] = [];
  const activityTypes: Activity['type'][] = [
    'created',
    'updated',
    'status_changed',
    'assigned',
    'commented',
  ];

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Generate 50 recent activities
  for (let i = 0; i < 50; i++) {
    const task = getRandomElement(tasks);
    const type = getRandomElement(activityTypes);
    const user = getRandomElement(users);

    let details = '';
    switch (type) {
      case 'created':
        details = `Created task "${task.title}"`;
        break;
      case 'updated':
        details = `Updated task description`;
        break;
      case 'status_changed':
        details = `Changed status to ${task.status.replace('_', ' ')}`;
        break;
      case 'assigned':
        details = `Assigned to ${task.assignee.name}`;
        break;
      case 'commented':
        details = `Added a comment`;
        break;
    }

    activities.push({
      id: `activity-${i + 1}`,
      type,
      taskId: task.id,
      taskTitle: task.title,
      user,
      timestamp: getRandomDate(sevenDaysAgo, now),
      details,
    });
  }

  return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const tasks = generateTasks(120);
export const activities = generateActivities(tasks);
