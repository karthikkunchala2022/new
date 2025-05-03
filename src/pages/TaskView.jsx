const taskDetail = {
  title: 'Update Website',
  description: 'Add latest research papers to the faculty profile page.',
  deadline: 'May 10, 2025',
  status: 'In Progress',
  assignedTo: 'AS',
  priority: 'Medium'
};

function TaskView() {
  return (
    <div className="p-6">
      <h1 className="title">Task Details</h1>
      <div className="card">
        <p><strong>Title:</strong> {taskDetail.title}</p>
        <p><strong>Description:</strong> {taskDetail.description}</p>
        <p><strong>Deadline:</strong> {taskDetail.deadline}</p>
        <p><strong>Status:</strong> {taskDetail.status}</p>
        <p><strong>Assigned to:</strong> {taskDetail.assignedTo}</p>
        <p><strong>Priority:</strong> {taskDetail.priority}</p>
        <button className="button-orange mt-4">Transfer Task</button>
      </div>
    </div>
  );
}

export default TaskView;