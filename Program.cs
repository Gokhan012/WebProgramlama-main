using Microsoft.EntityFrameworkCore;
using OnlineQuizMVC.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=users.db"));

var app = builder.Build();

// Ensure Database is created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();

    try {
        db.Database.ExecuteSqlRaw("ALTER TABLE exam_history ADD COLUMN TotalQuestions INTEGER NOT NULL DEFAULT 0;");
        db.Database.ExecuteSqlRaw("ALTER TABLE exam_history ADD COLUMN Correct INTEGER NOT NULL DEFAULT 0;");
        db.Database.ExecuteSqlRaw("ALTER TABLE exam_history ADD COLUMN Wrong INTEGER NOT NULL DEFAULT 0;");
        db.Database.ExecuteSqlRaw("ALTER TABLE exam_history ADD COLUMN Empty INTEGER NOT NULL DEFAULT 0;");
    } catch { }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Use standard StaticFiles

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Login}/{id?}");

app.Run();

