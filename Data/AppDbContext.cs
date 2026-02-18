using Microsoft.EntityFrameworkCore;
using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options){ }
        public DbSet<TaskItem> Tasks => Set <TaskItem>();

    }
}
