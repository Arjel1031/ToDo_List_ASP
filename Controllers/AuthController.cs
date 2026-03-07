using Microsoft.AspNetCore.Mvc;
using ToDo_List_ASP.DTO;
using ToDo_List_ASP.Interfaces;
using ToDo_List_ASP.Model;

namespace ToDo_List_ASP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IAuthService _authService;

        public AuthController(IUserRepository userRepo, IAuthService authService)
        {
            _userRepo = userRepo;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _userRepo.UsernameExistsAsync(request.Username))
                return BadRequest("Username already taken.");

            if (await _userRepo.EmailExistsAsync(request.Email))
                return BadRequest("Email already registered.");

            var user = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = _authService.HashPassword(request.Password)
            };

            await _userRepo.CreateAsync(user);

            var token = _authService.GenerateToken(user.Id, user.Username);
            return Ok(new AuthResponse { Token = token, Username = user.Username });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _userRepo.GetByUsernameAsync(request.Username);

            if (user is null || !_authService.VerifyPassword(request.Password, user.PasswordHash))
                return Unauthorized("Invalid username or password.");

            var token = _authService.GenerateToken(user.Id, user.Username);
            return Ok(new AuthResponse { Token = token, Username = user.Username });
        }
    }
}
