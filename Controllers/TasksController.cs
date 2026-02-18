using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo_List_ASP.Model;
using ToDo_List_ASP.DTO;
using ToDo_List_ASP.Data;

namespace ToDo_List_ASP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _db;

        public TasksController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskItem>>> Get()
        {
            return Ok(await _db.Tasks.OrderBy(t => t.Id).ToListAsync());
        }

        [HttpPost]
        public async Task<ActionResult<TaskItem>> Post([FromBody] CreateTaskRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.TaskName))
                return BadRequest("TaskName is required.");

            var task = new TaskItem { TaskName = request.TaskName };

            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();

            return Ok(task);
        }
    }
}
