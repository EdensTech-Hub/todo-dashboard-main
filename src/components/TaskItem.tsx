
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../types/todo';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDark: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, isDark }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'shopping': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-red-100 text-red-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDarkCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-blue-900 text-blue-200';
      case 'personal': return 'bg-purple-900 text-purple-200';
      case 'shopping': return 'bg-green-900 text-green-200';
      case 'health': return 'bg-red-900 text-red-200';
      case 'other': return 'bg-gray-700 text-gray-200';
      default: return 'bg-gray-700 text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className={`
        p-4 rounded-lg shadow-sm border transition-all duration-200
        ${isDark 
          ? 'bg-gray-800 border-gray-700 hover:shadow-lg' 
          : 'bg-white border-gray-200 hover:shadow-md'
        }
        ${task.completed ? 'opacity-75' : ''}
      `}
    >
      <div className="flex items-start space-x-3">
        {/* Checkbox */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(task.id)}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
            ${task.completed
              ? 'bg-blue-500 border-blue-500'
              : (isDark ? 'border-gray-600 hover:border-blue-400' : 'border-gray-300 hover:border-blue-500')
            }
          `}
        >
          {task.completed && <Check className="w-3 h-3 text-white" />}
        </motion.button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`
                font-medium text-sm
                ${task.completed 
                  ? (isDark ? 'line-through text-gray-500' : 'line-through text-gray-400')
                  : (isDark ? 'text-white' : 'text-gray-900')
                }
              `}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`
                  text-xs mt-1
                  ${isDark ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Delete Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task.id)}
              className={`
                p-1 rounded transition-colors
                ${isDark 
                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-gray-100'
                }
              `}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              {/* Priority */}
              <div className="flex items-center space-x-1">
                <Flag className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
                <span className={`text-xs capitalize ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              {/* Category */}
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${isDark ? getDarkCategoryColor(task.category) : getCategoryColor(task.category)}
              `}>
                {task.category}
              </span>
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {format(task.dueDate, 'MMM dd')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
