import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('filmTasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('filmTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => setTasks([newTask, ...tasks]);
  const updateTask = (id, updatedTask) => setTasks(tasks.map(task => task.id === id ? updatedTask : task));
  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Proje Görev Yöneticisi</h1>
        <p className="text-gray-500">Film prodüksiyonu ve senaryo notlarınızı yönetin</p>
      </div>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}