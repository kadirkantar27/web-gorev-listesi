import { useState } from 'react';

export default function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Orta'); // Varsayılan öncelik

  const handleSubmit = (e) => { // Form gönderildiğinde çalışacak fonksiyon
    e.preventDefault();
    if (!task.trim()) return;
    // priority bilgisini de yeni göreve dahil ediyoruz
    addTask({ id: Date.now(), text: task, isCompleted: false, priority: priority });
    setTask('');
    setPriority('Orta'); // Form gönderilince yine 'Orta'ya dönsün
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col sm:flex-row gap-2"> 
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Yeni set görevi veya senaryo notu ekle..."
        className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />
      
      <select // Öncelik seçimi için select elementi
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer font-medium text-gray-700"
      >
        <option value="Düşük">🟢 Düşük</option>
        <option value="Orta">🟠 Orta</option>
        <option value="Yüksek">🔴 Yüksek</option>
      </select>

      <button type="submit" className="bg-slate-800 text-white px-6 py-3 rounded-lg hover:bg-slate-900 transition-colors font-semibold">
        Ekle
      </button>
    </form>
  );
}