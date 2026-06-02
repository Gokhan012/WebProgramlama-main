using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineQuizMVC.Data;
using OnlineQuizMVC.Models;
using System.Text.Json;

namespace OnlineQuizMVC.Controllers
{
    [Route("api")]
    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationModel data)
        {
            if (string.IsNullOrEmpty(data.Name) || string.IsNullOrEmpty(data.Password))
                return BadRequest(new { error = "Ad ve şifre zorunludur." });

            if (await _context.Users.AnyAsync(u => u.Name == data.Name))
                return BadRequest(new { error = "Bu kullanıcı adı zaten alınmış." });

            var user = new User
            {
                Name = data.Name,
                Password = data.Password,
                FirstName = data.Firstname ?? "",
                Surname = data.Surname ?? "",
                Age = data.Age,
                Email = data.Email ?? "",
                Phone = data.Phone ?? ""
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz..." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel data)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == data.Name && u.Password == data.Password);
            if (user != null)
            {
                user.LastLogin = DateTime.Now;
                await _context.SaveChangesAsync();
                return Ok(new { message = "Giriş başarılı!", redirect = "index.html" });
            }
            return Unauthorized(new { error = "Kullanıcı adı veya şifre hatalı." });
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUser(string name)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == name);
            if (user != null)
            {
                return Ok(new
                {
                    name = user.Name,
                    surname = user.Surname,
                    age = user.Age,
                    email = user.Email,
                    phone = user.Phone,
                    last_login = user.LastLogin?.ToString("yyyy-MM-dd HH:mm:ss"),
                    firstname = user.FirstName
                });
            }
            return NotFound(new { error = "Kullanıcı bulunamadı." });
        }

        [HttpPost("user/update")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateModel data)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == data.Name);
            if (user != null)
            {
                user.FirstName = data.Firstname ?? "";
                user.Surname = data.Surname ?? "";
                user.Age = data.Age;
                user.Email = data.Email ?? "";
                user.Phone = data.Phone ?? "";
                await _context.SaveChangesAsync();
                return Ok(new { message = "Profil başarıyla güncellendi!" });
            }
            return NotFound(new { error = "Kullanıcı bulunamadı." });
        }

        [HttpPost("test/save")]
        public async Task<IActionResult> SaveTest([FromBody] SaveTestModel data)
        {
            if (string.IsNullOrEmpty(data.Username))
                return BadRequest(new { error = "Username required" });

            var savedTest = await _context.SavedTests.FirstOrDefaultAsync(t => t.Username == data.Username);
            if (savedTest == null)
            {
                savedTest = new SavedTest { Username = data.Username };
                _context.SavedTests.Add(savedTest);
            }

            savedTest.Topic = data.Topic;
            savedTest.Questions = JsonSerializer.Serialize(data.Questions);
            savedTest.Answers = JsonSerializer.Serialize(data.Answers);
            savedTest.CurrentIndex = data.CurrentIndex;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Test saved" });
        }

        [HttpGet("test/load")]
        public async Task<IActionResult> LoadTest(string username)
        {
            var test = await _context.SavedTests.FirstOrDefaultAsync(t => t.Username == username);
            if (test != null)
            {
                return Ok(new
                {
                    topic = test.Topic,
                    questions = JsonSerializer.Deserialize<object>(test.Questions),
                    answers = JsonSerializer.Deserialize<object>(test.Answers),
                    currentIndex = test.CurrentIndex
                });
            }
            return NotFound(new { message = "No saved test" });
        }

        [HttpPost("test/delete")]
        public async Task<IActionResult> DeleteTest([FromBody] DeleteTestModel data)
        {
            var test = await _context.SavedTests.FirstOrDefaultAsync(t => t.Username == data.Username);
            if (test != null)
            {
                _context.SavedTests.Remove(test);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Test deleted" });
            }
            return NotFound(new { message = "No saved test found" });
        }

        [HttpPost("user/score")]
        public async Task<IActionResult> AddScore([FromBody] AddScoreModel data)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Name == data.Username);
            if (user != null)
            {
                user.TotalScore += data.AddedScore;
                var history = new ExamHistory
                {
                    Username = data.Username,
                    Topic = data.Topic ?? "Genel",
                    Score = data.AddedScore,
                    MaxScore = data.MaxScore > 0 ? data.MaxScore : (data.AddedScore > 0 ? data.AddedScore : 100),
                    TotalQuestions = data.TotalQuestions,
                    Correct = data.Correct,
                    Wrong = data.Wrong,
                    Empty = data.Empty,
                    Date = DateTime.Now
                };
                _context.ExamHistories.Add(history);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Score updated" });
            }
            return NotFound(new { error = "User not found" });
        }

        [HttpGet("user/history")]
        public async Task<IActionResult> GetHistory(string username)
        {
            var history = await _context.ExamHistories
                .Where(h => h.Username == username)
                .OrderBy(h => h.Date)
                .Select(h => new
                {
                    topic = h.Topic,
                    score = h.Score,
                    maxScore = h.MaxScore,
                    totalQuestions = h.TotalQuestions,
                    correct = h.Correct,
                    wrong = h.Wrong,
                    empty = h.Empty,
                    date = h.Date.ToString("yyyy-MM-dd HH:mm:ss")
                })
                .ToListAsync();

            return Ok(history);
        }

        [HttpGet("leaderboard")]
        public async Task<IActionResult> GetLeaderboard()
        {
            var leaderboard = await _context.Users
                .OrderByDescending(u => u.TotalScore)
                .Take(5)
                .Select(u => new
                {
                    name = $"{(string.IsNullOrEmpty(u.FirstName) ? u.Name : u.FirstName)} {u.Surname}".Trim(),
                    score = u.TotalScore
                })
                .ToListAsync();

            return Ok(leaderboard);
        }
    }

    // Helper Models for Request Data
    public class UserRegistrationModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public string? Firstname { get; set; }
        public string? Surname { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }

    public class UserLoginModel
    {
        public string Name { get; set; }
        public string Password { get; set; }
    }

    public class UserUpdateModel
    {
        public string Name { get; set; }
        public string? Firstname { get; set; }
        public string? Surname { get; set; }
        public int Age { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }

    public class SaveTestModel
    {
        public string Username { get; set; }
        public string Topic { get; set; }
        public object Questions { get; set; }
        public object Answers { get; set; }
        public int CurrentIndex { get; set; }
    }

    public class DeleteTestModel { public string Username { get; set; } }

    public class AddScoreModel
    {
        public string Username { get; set; }
        public int AddedScore { get; set; }
        public string? Topic { get; set; }
        public int MaxScore { get; set; }
        public int TotalQuestions { get; set; }
        public int Correct { get; set; }
        public int Wrong { get; set; }
        public int Empty { get; set; }
    }
}
