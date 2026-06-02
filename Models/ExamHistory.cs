using System.ComponentModel.DataAnnotations;

namespace OnlineQuizMVC.Models
{
    public class ExamHistory
    {
        [Key]
        public int ID { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Topic { get; set; } = string.Empty;
        public int Score { get; set; }
        public int MaxScore { get; set; }
        public int TotalQuestions { get; set; }
        public int Correct { get; set; }
        public int Wrong { get; set; }
        public int Empty { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
