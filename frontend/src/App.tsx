import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskDetail from './pages/TaskDetail';
import CreateTask from './pages/CreateTask';
import Layout from './components/layout/Layout';
import useSocketSetup from './hooks/useSocketSetup';


function App() {
  useSocketSetup();
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<TaskList />} />
                <Route path="tasks/:id" element={<TaskDetail />} />
                <Route path="tasks/create" element={<CreateTask />} />
              </Route>
            </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;