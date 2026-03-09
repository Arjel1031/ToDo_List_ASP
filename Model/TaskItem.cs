namespace ToDo_List_ASP.Model
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string TaskName { get; set; } = "";


        public int UserId { get; set; }
        public User User { get; set; } = null;
    }
}
