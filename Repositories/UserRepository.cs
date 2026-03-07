using ToDo_List_ASP.Data;
using ToDo_List_ASP.Interfaces;
using ToDo_List_ASP.Model;
using Microsoft.EntityFrameworkCore;

namespace ToDo_List_ASP.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;

        public UserRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<User?> GetByUsernameAsync(string username)
            => await _db.Users.FirstOrDefaultAsync(u => u.Username == username);

        public async Task<bool> UsernameExistsAsync(string username)
            => await _db.Users.AnyAsync(u => u.Username == username);

        public async Task<bool> EmailExistsAsync(string email)
            => await _db.Users.AnyAsync(u => u.Email == email);

        public async Task<User> CreateAsync(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return user;
        }
    }
}
