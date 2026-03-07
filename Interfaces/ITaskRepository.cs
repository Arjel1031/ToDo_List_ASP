using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Interfaces
{
    public interface ITaskRepository
    {
        Task<List<TaskItem>> GetAllAsync();
        Task<TaskItem> CreateAsync(TaskItem task);
        Task<bool> DeleteAsync(int id);
    }
}
