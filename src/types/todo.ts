
export type Priority = 'low' | 'medium' | 'high';

export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
  dueDate?: Date;
  completed: boolean;
  createdAt: Date;
}

export interface FilterState {
  status: 'all' | 'active' | 'completed';
  priority: Priority | 'all';
  category: Category | 'all';
}
