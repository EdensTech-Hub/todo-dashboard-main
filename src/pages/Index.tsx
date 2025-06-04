
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import FilterControls from '../components/FilterControls';
import ThemeToggle from '../components/ThemeToggle';
import { Task, FilterState, Priority, Category } from '../types/todo';

const Index: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    const savedTheme = localStorage.getItem('todo-theme');
    
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
      }
    }
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save theme to localStorage and toggle dark class
  useEffect(() => {
    localStorage.setItem('todo-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addTask = (taskData: {
    title: string;
    description?: string;
    priority: Priority;
    category: Category;
    dueDate?: Date;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;

    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;

    // Category filter
    if (filters.category !== 'all' && task.category !== filters.category) return false;

    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Todo List
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {completedCount} of {totalCount} tasks completed
            </p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </motion.header>

        {/* Filters */}
        <FilterControls
          filters={filters}
          onFilterChange={setFilters}
          isDark={isDark}
        />

        {/* Task List */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            isDark={isDark}
          />
        </motion.main>

        {/* Add Task FAB */}
        <AddTask onAdd={addTask} isDark={isDark} />
      </div>
    </div>
  );
};

export default Index;
