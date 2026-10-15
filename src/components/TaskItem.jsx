import { useState } from 'react';

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || 'Orta');

  const handleUpdate = () => {
    if (!editText.trim()) return;
    updateTask(task.id, { ...task, text: editText, priority: editPriority });
    setIsEditing(false);
  };

  // Önceliğe göre renk belirleyen yardımcı fonksiyon
  const getPriorityColors = (priority) => {
    switch (priority) {
      case 'Yüksek': return 'bg-red-100 text-red-700 border-red-200';
      case 'Orta': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Düşük': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-all gap-3 ${task.isCompleted ? 'opacity-60 bg-gray-50' : ''}`}>
      {isEditing ? (
        <div className="flex flex-col sm:flex-row gap-2 flex-1 w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border border-blue-400 p-2 rounded-md flex-1 focus:outline-none"
            autoFocus
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="border border-blue-400 p-2 rounded-md bg-white focus:outline-none cursor-pointer"
          >
            <option value="Düşük">Düşük</option>
            <option value="Orta">Orta</option>
            <option value="Yüksek">Yüksek</option>
          </select>
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600">
            Kaydet
          </button>
        </div>
      ) : (
        <div className="flex items-start sm:items-center gap-4 flex-1">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => updateTask(task.id, { ...task, isCompleted: !task.isCompleted })}
            className="w-5 h-5 cursor-pointer accent-slate-800 shrink-0 mt-1 sm:mt-0"
          />
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
            <span className={`text-lg ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800 font-medium'}`}>
              {task.text}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border w-max ${getPriorityColors(task.priority)}`}>
              {task.priority || 'Orta'}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-3 shrink-0 self-end sm:self-auto">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
            Düzenle
          </button>
        )}
        <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors">
          Sil
        </button>
      </div>
    </div>
  );
}