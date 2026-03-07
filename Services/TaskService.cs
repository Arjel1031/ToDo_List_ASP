using ToDo_List_ASP.Interfaces;
using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _repo;

        public TaskService(ITaskRepository repo)
        {
            _repo = repo;
        }

        public Task<List<TaskItem>> GetAllTasksAsync()
            => _repo.GetAllAsync();

        public async Task<TaskItem> CreateTaskAsync(string taskName)
        {
            // Business rules live HERE, not in the controller
            if (string.IsNullOrWhiteSpace(taskName))
                throw new ArgumentException("Task name cannot be empty.");

            if (taskName.Length > 200)
                throw new ArgumentException("Task name too long.");

            var task = new TaskItem { TaskName = taskName.Trim() };
            return await _repo.CreateAsync(task);
        }

        public Task<bool> DeleteTaskAsync(int id)
            => _repo.DeleteAsync(id);
    }
}
