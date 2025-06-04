
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import { Task } from '../types/todo';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, isDark }) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`
          text-center py-12
          ${isDark ? 'text-gray-400' : 'text-gray-500'}
        `}
      >
        <div className="text-4xl mb-4">📝</div>
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm mt-2">Create your first task to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            isDark={isDark}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
