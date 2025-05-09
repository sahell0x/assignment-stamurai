import React, { useState, useMemo } from 'react';
import TaskCard from '../components/task/TaskCard';
import StatCard from '../components/dashboard/StatCard';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import tasksAtom from '../store/tasksAtom';
import userInfoAtom from '../store/userInfoAtom';

const Dashboard = () => {
  const tasks = useRecoilValue(tasksAtom);
  const user = useRecoilValue(userInfoAtom);
  const [activeTab, setActiveTab] = useState('assigned');

  const assignedTasks = useMemo(
    () => tasks.filter(task => task.assignedTo === user?.id),
    [tasks, user]
  );

  const createdTasks = useMemo(
    () => tasks.filter(task => task.createdBy === user?.id),
    [tasks, user]
  );

  const overdueTasks = useMemo(
    () =>
      tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return dueDate < new Date() && task.status !== 'completed';
      }),
    [tasks]
  );

  const totalAssigned = assignedTasks.length;
  const completedAssigned = assignedTasks.filter(task => task.status === 'completed').length;
  const totalCreated = createdTasks.length;
  const totalOverdue = overdueTasks.length;

  const getTabContent = () => {
    switch (activeTab) {
      case 'assigned':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedTasks.length > 0 ? (
              assignedTasks.map(task => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="col-span-full text-gray-500 italic">No tasks assigned to you.</p>
            )}
          </div>
        );
      case 'created':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {createdTasks.length > 0 ? (
              createdTasks.map(task => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="col-span-full text-gray-500 italic">You haven't created any tasks.</p>
            )}
          </div>
        );
      case 'overdue':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overdueTasks.length > 0 ? (
              overdueTasks.map(task => <TaskCard key={task.id} task={task} />)
            ) : (
              <p className="col-span-full text-gray-500 italic">No overdue tasks.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Assigned Tasks"
          value={`${completedAssigned}/${totalAssigned}`}
          description="Tasks assigned to you"
          icon={<CheckCircle className="text-blue-500" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Created Tasks"
          value={totalCreated.toString()}
          description="Tasks you've created"
          icon={<Clock className="text-teal-500" />}
          color="bg-teal-50"
        />
        <StatCard
          title="Overdue Tasks"
          value={totalOverdue.toString()}
          description="Tasks past their due date"
          icon={<AlertCircle className="text-red-500" />}
          color="bg-red-50"
        />
      </div>

      <div>
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('assigned')}
              className={`pb-3 px-1 font-medium text-sm ${
                activeTab === 'assigned'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assigned to Me
            </button>
            <button
              onClick={() => setActiveTab('created')}
              className={`pb-3 px-1 font-medium text-sm ${
                activeTab === 'created'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Created by Me
            </button>
            <button
              onClick={() => setActiveTab('overdue')}
              className={`pb-3 px-1 font-medium text-sm ${
                activeTab === 'overdue'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overdue
            </button>
          </nav>
        </div>

        {getTabContent()}
      </div>
    </div>
  );
};

export default Dashboard;
