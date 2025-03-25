import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onEdit, onDelete }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc'
  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  useEffect(() => {
    let result = [...tasks];
    
    // Apply filter
    if (filter === 'active') {
      result = result.filter(task => !task.isCompleted);
    } else if (filter === 'completed') {
      result = result.filter(task => task.isCompleted);
    }
    
    // Apply search
    if (searchQuery.trim() !== '') {
      result = result.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortBy === 'date-desc') {
      result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    } else if (sortBy === 'date-asc') {
      result.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }
    
    setFilteredTasks(result);
  }, [tasks, filter, sortBy, searchQuery]);

  const toggleSort = () => {
    setSortBy(prev => prev === 'date-desc' ? 'date-asc' : 'date-desc');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-purple-900 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Tasks
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'active' 
                ? 'bg-purple-900 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'completed' 
                ? 'bg-purple-900 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completed
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="px-2 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-60 mr-2"
          />
          <button 
            onClick={toggleSort}
            className="flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            {sortBy === 'date-desc' ? <FaSortAmountDown className="mr-2" /> : <FaSortAmountUp className="mr-2" />}
            Sort
          </button>
        </div>
      </div>
      <AnimatePresence>
      {filteredTasks.map(task => (
        <motion.div 
          key={task.id} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`relative shadow-sm rounded-lg mb-3`}
        >
          <div className="p-0">
            <TaskItem 
              task={task} 
              onComplete={onComplete} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </div>
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;