using Microsoft.AspNetCore.Mvc;
using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static readonly List<ToDoItem> Items = new()
        {
            new ToDoItem { Id = 1, Title = "Learn ASO", isDone = false }
        };

        [HttpGet]
        public ActionResult<List<ToDoItem>> GetAll() => Items;

        [HttpPost]
        public ActionResult<ToDoItem> Add(ToDoItem item)
        {
            item.Id = Items.Count == 0 ? 1 : Items.Max(x => x.Id) + 1;
            Items.Add(item);
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }
    }
}
