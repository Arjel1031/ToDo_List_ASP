using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllTasksAsync();
        Task<TaskItem> CreateTaskAsync(string taskName);
        Task<bool> DeleteTaskAsync(int id);
    }
}
