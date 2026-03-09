using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Interfaces
{
    public interface ITaskService
    {
        Task<List<TaskItem>> GetAllTasksAsync(int userId);
        Task<TaskItem> CreateTaskAsync(string taskName, int userId);
        Task<bool> DeleteTaskAsync(int id);
    }
}
