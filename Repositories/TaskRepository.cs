using ToDo_List_ASP.Data;
using ToDo_List_ASP.Interfaces;
using ToDo_List_ASP.Model;
using Microsoft.EntityFrameworkCore;

namespace ToDo_List_ASP.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly AppDbContext _db;

        public TaskRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<TaskItem>> GetAllAsync()
            => await _db.Tasks.OrderBy(t => t.Id).ToListAsync();

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task is null) return false;
            _db.Tasks.Remove(task);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
