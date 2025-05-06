import { useState, useEffect } from 'react';
import { useTask } from '../context/TaskContext';
import { Link } from 'react-router-dom';
import TaskCard from '../components/task/TaskCard';
import SearchFilter from '../components/task/SearchFilter';
import { Plus } from 'lucide-react';

const TaskList = () => {
  const { tasks } = useTask();
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortOption, setSortOption] = useState('dueDate');
  
  useEffect(() => {
    let filtered = [...tasks];
    
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    setFilteredTasks(filtered);
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortOption]);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <Link 
          to="/tasks/create" 
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus size={18} className="mr-1" />
          New Task
        </Link>
      </div>
      
      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No tasks found matching your criteria.</p>
            <Link to="/tasks/create" className="text-blue-500 hover:underline mt-2 inline-block">
              Create a new task
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;