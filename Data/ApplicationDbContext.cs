using Microsoft.EntityFrameworkCore;
using OnlineQuizMVC.Models;

namespace OnlineQuizMVC.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<SavedTest> SavedTests { get; set; }
        public DbSet<ExamHistory> ExamHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<SavedTest>().ToTable("saved_tests");
            modelBuilder.Entity<ExamHistory>().ToTable("exam_history");
        }
    }
}
