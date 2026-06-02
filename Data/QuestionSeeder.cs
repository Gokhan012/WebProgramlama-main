using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using OnlineQuizMVC.Models;

namespace OnlineQuizMVC.Data
{
    public static class QuestionSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            // Table creation if EF Core migration failed due to existing tables
            context.Database.ExecuteSqlRaw(@"
                CREATE TABLE IF NOT EXISTS questions (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    Topic TEXT NOT NULL, 
                    QuestionText TEXT NOT NULL, 
                    OptionsJson TEXT NOT NULL, 
                    CorrectAnswer TEXT NOT NULL
                );
            ");

            if (context.Questions.Any())
            {
                return; // Zaten soru var
            }

            var questions = new List<QuizQuestion>
            {
                // HTML & CSS
                new QuizQuestion { Topic = "HTML & CSS Temelleri", QuestionText = "HTML5 ile birlikte gelen ve sayfanın ana içeriğini temsil eden semantik etiket hangisidir?", OptionsJson = JsonSerializer.Serialize(new[] { "<section>", "<div>", "<main>", "<article>", "<header>" }), CorrectAnswer = "<main>" },
                new QuizQuestion { Topic = "HTML & CSS Temelleri", QuestionText = "CSS Flexbox mimarisinde, elemanları yatay eksende ortalamak için hangi özellik kullanılır?", OptionsJson = JsonSerializer.Serialize(new[] { "align-items: center;", "justify-content: center;", "text-align: center;", "margin: 0 auto;", "vertical-align: middle;" }), CorrectAnswer = "justify-content: center;" },
                new QuizQuestion { Topic = "HTML & CSS Temelleri", QuestionText = "Bir HTML belgesinde harici bir CSS dosyası sayfaya nasıl dahil edilir?", OptionsJson = JsonSerializer.Serialize(new[] { "<style src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<css href='style.css'>", "<script src='style.css'>", "<import url='style.css'>" }), CorrectAnswer = "<link rel='stylesheet' href='style.css'>" },
                new QuizQuestion { Topic = "HTML & CSS Temelleri", QuestionText = "CSS Özgüllük (Specificity) kuralına göre aşağıdaki seçicilerden hangisinin önceliği en yüksektir?", OptionsJson = JsonSerializer.Serialize(new[] { "Sınıf (Class) Seçicileri", "Etiket (Tag) Seçicileri", "ID Seçicileri", "Satır İçi (Inline) Stiller", "Evrensel (*) Seçici" }), CorrectAnswer = "Satır İçi (Inline) Stiller" },
                new QuizQuestion { Topic = "HTML & CSS Temelleri", QuestionText = "Hangi CSS özelliği bir elementin görünmez olmasını sağlarken sayfada kapladığı alanı korur?", OptionsJson = JsonSerializer.Serialize(new[] { "display: none;", "visibility: hidden;", "opacity: 0;", "z-index: -1;", "position: absolute;" }), CorrectAnswer = "visibility: hidden;" },
                
                // JavaScript
                new QuizQuestion { Topic = "JavaScript İleri Seviye", QuestionText = "JavaScript'te Closure (Kapanış) kavramı en doğru nasıl tanımlanır?", OptionsJson = JsonSerializer.Serialize(new[] { "Bir fonksiyonun, dış kapsamındaki değişkenlere erişimini kaybetmesi", "İç içe fonksiyonlarda, içteki fonksiyonun dıştaki fonksiyonun değişkenlerine erişebilme yeteneği", "Bir döngünün aniden sonlandırılması", "Sadece asenkron işlemlerde kullanılan bir bellek yönetimi", "Nesnelerin prototiplerini dondurma işlemi" }), CorrectAnswer = "İç içe fonksiyonlarda, içteki fonksiyonun dıştaki fonksiyonun değişkenlerine erişebilme yeteneği" },
                new QuizQuestion { Topic = "JavaScript İleri Seviye", QuestionText = "Aşağıdaki ifadelerden hangisi JavaScript'teki Promise nesnesinin geçerli bir durumu (state) değildir?", OptionsJson = JsonSerializer.Serialize(new[] { "Pending", "Fulfilled", "Rejected", "Resolved", "Waiting" }), CorrectAnswer = "Waiting" },
                new QuizQuestion { Topic = "JavaScript İleri Seviye", QuestionText = "ES6 ile gelen Map ve Set veri yapıları arasındaki temel fark nedir?", OptionsJson = JsonSerializer.Serialize(new[] { "Set anahtar-değer çiftleri tutar, Map sadece tekil değerler tutar", "Map anahtar-değer çiftleri tutar, Set sadece tekil değerler tutar", "İkisi de aynıdır, sadece isimleri farklıdır", "Map sadece string anahtarlar kabul eder", "Set senkron, Map asenkron çalışır" }), CorrectAnswer = "Map anahtar-değer çiftleri tutar, Set sadece tekil değerler tutar" },
                new QuizQuestion { Topic = "JavaScript İleri Seviye", QuestionText = "JavaScript'te typeof null ifadesinin döndürdüğü sonuç nedir?", OptionsJson = JsonSerializer.Serialize(new[] { "null", "undefined", "object", "string", "boolean" }), CorrectAnswer = "object" },
                new QuizQuestion { Topic = "JavaScript İleri Seviye", QuestionText = "Arrow function (() => {}) ile normal function arasındaki en temel fark nedir?", OptionsJson = JsonSerializer.Serialize(new[] { "Arrow function daha hızlı çalışır", "Arrow function 'this' bağlamını miras alır (lexical this)", "Normal function sadece string döndürebilir", "Arrow function sadece ES5'te çalışır", "Fark yoktur" }), CorrectAnswer = "Arrow function 'this' bağlamını miras alır (lexical this)" },

                // C# ve .NET
                new QuizQuestion { Topic = "C# ve .NET Core", QuestionText = "C# dilinde Garbage Collector (Çöp Toplayıcı) ne zaman devreye girer?", OptionsJson = JsonSerializer.Serialize(new[] { "Her döngü bittiğinde", "Programcı GC.Collect() yazdığında zorunlu olarak, aksi halde bellek yetersizliğinde otomatik olarak", "Sadece program kapatılırken", "Her değişken tanımlandığında", "Yalnızca veritabanı bağlantısı koptuğunda" }), CorrectAnswer = "Programcı GC.Collect() yazdığında zorunlu olarak, aksi halde bellek yetersizliğinde otomatik olarak" },
                new QuizQuestion { Topic = "C# ve .NET Core", QuestionText = ".NET Core platformunda Dependency Injection için varsayılan yaşam döngüsü seçeneklerinden hangisi her HTTP isteği için yeni bir örnek oluşturur?", OptionsJson = JsonSerializer.Serialize(new[] { "Transient", "Singleton", "Scoped", "Static", "Persistent" }), CorrectAnswer = "Scoped" },
                new QuizQuestion { Topic = "C# ve .NET Core", QuestionText = "Entity Framework Core kullanarak bir veritabanı tablosuna karşılık gelen C# sınıfına ne ad verilir?", OptionsJson = JsonSerializer.Serialize(new[] { "Controller", "View", "Entity / Model", "Migration", "DbContext" }), CorrectAnswer = "Entity / Model" },
                new QuizQuestion { Topic = "C# ve .NET Core", QuestionText = "C#'ta asenkron programlama yaparken Task döndüren bir metodu beklemek için hangi anahtar kelime kullanılır?", OptionsJson = JsonSerializer.Serialize(new[] { "yield", "wait", "async", "await", "defer" }), CorrectAnswer = "await" },
                new QuizQuestion { Topic = "C# ve .NET Core", QuestionText = "C# dilinde 'interface' ile 'abstract class' arasındaki temel fark nedir?", OptionsJson = JsonSerializer.Serialize(new[] { "Abstract class çoklu kalıtımı destekler, interface desteklemez", "Interface içinde gövdeli (uygulanmış) metot bulunamaz (C# 8.0 öncesi), abstract class'ta bulunabilir", "Interface'ler doğrudan new'lenebilir", "Abstract class sadece özellik (property) tutar", "Aralarında fark yoktur" }), CorrectAnswer = "Interface içinde gövdeli (uygulanmış) metot bulunamaz (C# 8.0 öncesi), abstract class'ta bulunabilir" },

                // Veritabanı
                new QuizQuestion { Topic = "Veritabanı (SQL)", QuestionText = "SQL'de veritabanındaki tablonun yapısını değiştirmek (yeni sütun eklemek vb.) için hangi DDL komutu kullanılır?", OptionsJson = JsonSerializer.Serialize(new[] { "UPDATE", "MODIFY", "ALTER TABLE", "CHANGE", "INSERT INTO" }), CorrectAnswer = "ALTER TABLE" },
                new QuizQuestion { Topic = "Veritabanı (SQL)", QuestionText = "Birbirine ilişkili iki tabloda, sadece eşleşen kayıtları getiren JOIN türü hangisidir?", OptionsJson = JsonSerializer.Serialize(new[] { "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN" }), CorrectAnswer = "INNER JOIN" },
                new QuizQuestion { Topic = "Veritabanı (SQL)", QuestionText = "SQL'de gruplanmış veriler üzerinde şart belirtmek için WHERE yerine hangi ifade kullanılır?", OptionsJson = JsonSerializer.Serialize(new[] { "HAVING", "GROUP CONDITION", "FILTER", "SORT", "LIMIT" }), CorrectAnswer = "HAVING" },
                new QuizQuestion { Topic = "Veritabanı (SQL)", QuestionText = "İlişkisel veritabanlarında veri bütünlüğünü sağlamak için, bir tablodaki sütunun başka bir tablodaki birincil anahtara referans vermesine ne ad verilir?", OptionsJson = JsonSerializer.Serialize(new[] { "Unique Key", "Foreign Key", "Candidate Key", "Super Key", "Composite Key" }), CorrectAnswer = "Foreign Key" },
                new QuizQuestion { Topic = "Veritabanı (SQL)", QuestionText = "Aşağıdakilerden hangisi bir NoSQL veritabanıdır?", OptionsJson = JsonSerializer.Serialize(new[] { "PostgreSQL", "MySQL", "MongoDB", "Oracle", "SQL Server" }), CorrectAnswer = "MongoDB" },
                
                // Optik
                new QuizQuestion { Topic = "Optik", QuestionText = "Bir çukur aynada cisim odak noktası (F) ile tepe noktası (T) arasındaysa, oluşan görüntü nasıldır?", OptionsJson = JsonSerializer.Serialize(new[] { "Gerçek, ters ve küçük", "Gerçek, düz ve eşit", "Sanal (Zahiri), düz ve büyük", "Gerçek, ters ve büyük", "Görüntü oluşmaz" }), CorrectAnswer = "Sanal (Zahiri), düz ve büyük" },
                new QuizQuestion { Topic = "Optik", QuestionText = "Fiber optik kablolarda veri iletimi ışığın hangi optik özelliğine dayanır?", OptionsJson = JsonSerializer.Serialize(new[] { "Tam yansıma", "Kırınım", "Girişim", "Kutuplanma", "Soğurulma" }), CorrectAnswer = "Tam yansıma" },
                new QuizQuestion { Topic = "Optik", QuestionText = "Işığın prizmadan geçerken renklerine ayrılmasına ne denir?", OptionsJson = JsonSerializer.Serialize(new[] { "Kırınım", "Girişim", "Dispersiyon (Saçınım)", "Polarizasyon", "Yansıma" }), CorrectAnswer = "Dispersiyon (Saçınım)" },
                new QuizQuestion { Topic = "Optik", QuestionText = "Kalın kenarlı merceğe (ıraksak mercek) asal eksene paralel gelen ışın nasıl kırılır?", OptionsJson = JsonSerializer.Serialize(new[] { "Odak noktasından geçecek şekilde", "Odak noktasından geliyormuş gibi", "Aynen yoluna devam eder", "Geri yansır", "Tepe noktasından geçer" }), CorrectAnswer = "Odak noktasından geliyormuş gibi" },
                new QuizQuestion { Topic = "Optik", QuestionText = "Işığın boşluktaki hızı yaklaşık ne kadardır?", OptionsJson = JsonSerializer.Serialize(new[] { "300.000 km/s", "3.000 km/s", "30.000 km/s", "1.000.000 km/s", "1.000 km/s" }), CorrectAnswer = "300.000 km/s" }

            };

            context.Questions.AddRange(questions);
            context.SaveChanges();
        }
    }
}
