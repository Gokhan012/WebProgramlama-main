using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineQuizMVC.Models
{
    public class QuizQuestion
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [MaxLength(100)]
        public string Topic { get; set; } = string.Empty;
        
        [Required]
        public string QuestionText { get; set; } = string.Empty;
        
        [Required]
        public string OptionsJson { get; set; } = string.Empty; // Store options as JSON string
        
        [Required]
        public string CorrectAnswer { get; set; } = string.Empty;
    }
}
