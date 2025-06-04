
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className={`
        relative w-14 h-8 rounded-full p-1 transition-colors duration-300
        ${isDark ? 'bg-blue-600' : 'bg-gray-300'}
      `}
    >
      <motion.div
        initial={false}
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          ${isDark ? 'bg-gray-900' : 'bg-white'}
        `}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-blue-400" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
