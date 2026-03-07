namespace ToDo_List_ASP.Interfaces
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string hash);
        string GenerateToken(int userId, string username);
    }
}
