
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Priority, Category } from '../types/todo';

interface AddTaskProps {
  onAdd: (task: {
    title: string;
    description?: string;
    priority: Priority;
    category: Category;
    dueDate?: Date;
  }) => void;
  isDark: boolean;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setDueDate('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-50"
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`
                fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                w-full max-w-md mx-4 p-6 rounded-lg shadow-xl z-50
                ${isDark ? 'bg-gray-800' : 'bg-white'}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add New Task
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className={`
                    p-1 rounded transition-colors
                    ${isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className={`
                      w-full px-3 py-2 rounded-lg border text-sm
                      ${isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    placeholder="Enter task title..."
                  />
                </div>

                {/* Description */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className={`
                      w-full px-3 py-2 rounded-lg border text-sm resize-none
                      ${isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    placeholder="Enter task description..."
                  />
                </div>

                {/* Priority and Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as Priority)}
                      className={`
                        w-full px-3 py-2 rounded-lg border text-sm
                        ${isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      `}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className={`
                        w-full px-3 py-2 rounded-lg border text-sm
                        ${isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                      `}
                    >
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="shopping">Shopping</option>
                      <option value="health">Health</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Due Date */}
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className={`
                      w-full px-3 py-2 rounded-lg border text-sm
                      ${isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!title.trim()}
                  className={`
                    w-full py-2 px-4 rounded-lg font-medium text-sm transition-colors
                    ${title.trim()
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : (isDark ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')
                    }
                    disabled:cursor-not-allowed
                  `}
                >
                  Add Task
                </motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddTask;
