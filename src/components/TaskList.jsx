import TaskItem from './TaskItem';

export default function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <div className="w-full mt-4">
      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p>Henüz bir görev eklenmedi. Yeni bir görev ekleyerek başlayın.</p>
        </div>
      ) : (
        tasks.map(task => (
          <TaskItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
}