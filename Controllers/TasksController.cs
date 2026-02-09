using Microsoft.AspNetCore.Mvc;
using ToDo_List_ASP.Model;
using ToDo_List_ASP.DTO;

namespace ToDo_List_ASP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly List<TaskItem> _tasks = new();
        private static int _nextId = 1;

        [HttpGet]
        public ActionResult<List<TaskItem>> Get()
        {
            return Ok(_tasks);
        }

        [HttpPost]
        public ActionResult<TaskItem> Post([FromBody] CreateTaskRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.TaskName))
                return BadRequest("TaskName is required.");

            var task = new TaskItem
            {
                Id = _nextId++,
                TaskName = request.TaskName
            };

            _tasks.Add(task);
            return Ok(task);
        }
    }
}
