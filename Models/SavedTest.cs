using System.ComponentModel.DataAnnotations;

namespace OnlineQuizMVC.Models
{
    public class SavedTest
    {
        [Key]
        public string Username { get; set; } = string.Empty;
        public string Topic { get; set; } = string.Empty;
        public string Questions { get; set; } = string.Empty; // Store as JSON string
        public string Answers { get; set; } = string.Empty;   // Store as JSON string
        public int CurrentIndex { get; set; }
    }
}
