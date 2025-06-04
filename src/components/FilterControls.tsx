
import React from 'react';
import { motion } from 'framer-motion';
import { FilterState, Priority, Category } from '../types/todo';

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isDark: boolean;
}

const FilterControls: React.FC<FilterControlsProps> = ({ filters, onFilterChange, isDark }) => {
  const statusOptions = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        p-4 rounded-lg shadow-sm mb-6
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Status
          </label>
          <div className="flex space-x-2">
            {statusOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFilterChange({ ...filters, status: option.value as any })}
                className={`
                  px-3 py-1 rounded-full text-xs font-medium transition-colors
                  ${filters.status === option.value
                    ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800')
                    : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                  }
                `}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as Priority | 'all' })}
            className={`
              w-full px-3 py-2 rounded-lg text-sm border
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value as Category | 'all' })}
            className={`
              w-full px-3 py-2 rounded-lg text-sm border
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterControls;
