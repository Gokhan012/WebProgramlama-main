const questionsDB = {
    // ================= YAZILIM =================
    "HTML & CSS Temelleri": [
        { soru: "HTML5 ile birlikte gelen ve sayfanın ana içeriğini temsil eden semantik etiket hangisidir?", secenekler: ["<section>", "<div>", "<main>", "<article>", "<header>"], dogruCevap: "<main>" },
        { soru: "CSS Flexbox mimarisinde, elemanları yatay eksende ortalamak için hangi özellik kullanılır?", secenekler: ["align-items: center;", "justify-content: center;", "text-align: center;", "margin: 0 auto;", "vertical-align: middle;"], dogruCevap: "justify-content: center;" },
        { soru: "Bir HTML belgesinde <strong>harici bir CSS dosyası</strong> sayfaya nasıl dahil edilir?", secenekler: ["<style src='style.css'>", "<link rel='stylesheet' href='style.css'>", "<css href='style.css'>", "<script src='style.css'>", "<import url='style.css'>"], dogruCevap: "<link rel='stylesheet' href='style.css'>" },
        { soru: "CSS Özgüllük (Specificity) kuralına göre aşağıdaki seçicilerden hangisinin önceliği en yüksektir?", secenekler: ["Sınıf (Class) Seçicileri", "Etiket (Tag) Seçicileri", "ID Seçicileri", "Satır İçi (Inline) Stiller", "Evrensel (*) Seçici"], dogruCevap: "Satır İçi (Inline) Stiller" }
    ],
    "JavaScript İleri Seviye": [
        { soru: "JavaScript'te <strong>Closure (Kapanış)</strong> kavramı en doğru nasıl tanımlanır?", secenekler: ["Bir fonksiyonun, dış kapsamındaki değişkenlere erişimini kaybetmesi", "İç içe fonksiyonlarda, içteki fonksiyonun dıştaki fonksiyonun değişkenlerine erişebilme yeteneği", "Bir döngünün aniden sonlandırılması", "Sadece asenkron işlemlerde kullanılan bir bellek yönetimi", "Nesnelerin prototiplerini dondurma işlemi"], dogruCevap: "İç içe fonksiyonlarda, içteki fonksiyonun dıştaki fonksiyonun değişkenlerine erişebilme yeteneği" },
        { soru: "Aşağıdaki ifadelerden hangisi JavaScript'teki <code>Promise</code> nesnesinin geçerli bir durumu (state) <strong>değildir</strong>?", secenekler: ["Pending", "Fulfilled", "Rejected", "Resolved", "Waiting"], dogruCevap: "Waiting" },
        { soru: "ES6 ile gelen <code>Map</code> ve <code>Set</code> veri yapıları arasındaki temel fark nedir?", secenekler: ["Set anahtar-değer çiftleri tutar, Map sadece tekil değerler tutar", "Map anahtar-değer çiftleri tutar, Set sadece tekil değerler tutar", "İkisi de aynıdır, sadece isimleri farklıdır", "Map sadece string anahtarlar kabul eder", "Set senkron, Map asenkron çalışır"], dogruCevap: "Map anahtar-değer çiftleri tutar, Set sadece tekil değerler tutar" },
        { soru: "JavaScript'te <code>typeof null</code> ifadesinin döndürdüğü sonuç nedir?", secenekler: ["null", "undefined", "object", "string", "boolean"], dogruCevap: "object" }
    ],
    "Python ile Veri Bilimi": [
        { soru: "Pandas kütüphanesinde, iki boyutlu ve farklı veri tiplerini barındırabilen temel veri yapısı hangisidir?", secenekler: ["Series", "List", "DataFrame", "Array", "Dictionary"], dogruCevap: "DataFrame" },
        { soru: "Makine öğrenmesi süreçlerinde <strong>Aşırı Öğrenme (Overfitting)</strong> problemini çözmek için hangisi <u>kullanılmaz</u>?", secenekler: ["Düzenlileştirme (Regularization)", "Veri Artırma (Data Augmentation)", "Daha karmaşık bir model seçmek", "Erken Durdurma (Early Stopping)", "Çapraz Doğrulama (Cross-Validation)"], dogruCevap: "Daha karmaşık bir model seçmek" },
        { soru: "NumPy kütüphanesinde <code>np.zeros((3,3))</code> komutu ne işe yarar?", secenekler: ["3x3 boyutunda, elemanları 1 olan bir matris oluşturur", "3x3 boyutunda, elemanları 0 olan bir matris oluşturur", "İçinde sadece 3 rakamı olan bir dizi oluşturur", "Mevcut matrisi sıfırlar", "Bellekten 3 birimlik yer siler"], dogruCevap: "3x3 boyutunda, elemanları 0 olan bir matris oluşturur" }
    ],
    "C# ve .NET Core": [
        { soru: "C# dilinde <strong>Garbage Collector (Çöp Toplayıcı)</strong> ne zaman devreye girer?", secenekler: ["Her döngü bittiğinde", "Programcı GC.Collect() yazdığında zorunlu olarak, aksi halde bellek yetersizliğinde otomatik olarak", "Sadece program kapatılırken", "Her değişken tanımlandığında", "Yalnızca veritabanı bağlantısı koptuğunda"], dogruCevap: "Programcı GC.Collect() yazdığında zorunlu olarak, aksi halde bellek yetersizliğinde otomatik olarak" },
        { soru: ".NET Core platformunda <strong>Dependency Injection (Bağımlılık Enjeksiyonu)</strong> için varsayılan yaşam döngüsü (lifetime) seçeneklerinden hangisi <u>her HTTP isteği için yeni bir örnek (instance)</u> oluşturur?", secenekler: ["Transient", "Singleton", "Scoped", "Static", "Persistent"], dogruCevap: "Scoped" },
        { soru: "Entity Framework Core kullanarak bir veritabanı tablosuna karşılık gelen C# sınıfına ne ad verilir?", secenekler: ["Controller", "View", "Entity / Model", "Migration", "DbContext"], dogruCevap: "Entity / Model" },
        { soru: "C#'ta asenkron programlama yaparken <code>Task</code> döndüren bir metodu beklemek için hangi anahtar kelime kullanılır?", secenekler: ["yield", "wait", "async", "await", "defer"], dogruCevap: "await" }
    ],
    "Veritabanı (SQL)": [
        { soru: "SQL'de veritabanındaki tablonun yapısını değiştirmek (yeni sütun eklemek vb.) için hangi DDL komutu kullanılır?", secenekler: ["UPDATE", "MODIFY", "ALTER TABLE", "CHANGE", "INSERT INTO"], dogruCevap: "ALTER TABLE" },
        { soru: "Birbirine ilişkili iki tabloda, <strong>sadece eşleşen</strong> kayıtları getiren JOIN türü hangisidir?", secenekler: ["LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "INNER JOIN", "CROSS JOIN"], dogruCevap: "INNER JOIN" },
        { soru: "SQL'de gruplanmış veriler üzerinde şart belirtmek için <code>WHERE</code> yerine hangi ifade kullanılır?", secenekler: ["HAVING", "GROUP CONDITION", "FILTER", "SORT", "LIMIT"], dogruCevap: "HAVING" },
        { soru: "İlişkisel veritabanlarında veri bütünlüğünü sağlamak için, bir tablodaki sütunun başka bir tablodaki birincil anahtara (Primary Key) referans vermesine ne ad verilir?", secenekler: ["Unique Key", "Foreign Key", "Candidate Key", "Super Key", "Composite Key"], dogruCevap: "Foreign Key" }
    ],

    // ================= MATEMATİK =================
    "Türev ve Uygulamaları": [
        { soru: "Bir hareketlinin konum-zaman grafiğinin <strong>birinci türevi</strong> bize hangi fiziksel büyüklüğü verir?", secenekler: ["İvme", "Kuvvet", "Hız", "Yol", "Enerji"], dogruCevap: "Hız" },
        { soru: "f(x) = e^(2x) fonksiyonunun türevi aşağıdakilerden hangisidir?", secenekler: ["e^(2x)", "2e^(2x)", "x*e^(2x)", "e^x", "2x*e^x"], dogruCevap: "2e^(2x)" },
        { soru: "Bir f(x) fonksiyonu x=a noktasında türevlenebiliyorsa, bu nokta için aşağıdakilerden hangisi <strong>kesinlikle</strong> doğrudur?", secenekler: ["Fonksiyon x=a'da süreklidir", "Fonksiyon x=a'da sıfıra eşittir", "Fonksiyon x=a'da tanımsızdır", "Fonksiyonun x=a'da limiti yoktur", "Fonksiyon x=a'da maksimum değerini alır"], dogruCevap: "Fonksiyon x=a'da süreklidir" },
        { soru: "Çarpımın türevi kuralı (u*v)' hangisidir?", secenekler: ["u'*v'", "u'v - uv'", "u'v + uv'", "(u+v)'", "u/v'"], dogruCevap: "u'v + uv'" }
    ],
    "İntegral": [
        { soru: "Belirli integral kullanılarak eğri altında kalan alan hesaplanırken, alan x ekseninin <strong>altında</strong> kalıyorsa integralin sonucu nasıl çıkar?", secenekler: ["Pozitif", "Negatif", "Sıfır", "Tanımsız", "Karmaşık sayı"], dogruCevap: "Negatif" },
        { soru: "∫(1/x) dx integralinin sonucu nedir? (x > 0)", secenekler: ["ln(x) + C", "e^x + C", "1/x^2 + C", "x + C", "x^-1 + C"], dogruCevap: "ln(x) + C" },
        { soru: "Kısmı (Parçalı) integrasyon formülü ∫u dv aşağıdakilerden hangisidir?", secenekler: ["uv - ∫v du", "u'v + uv'", "u/v + C", "uv + ∫v du", "ln|u| + C"], dogruCevap: "uv - ∫v du" }
    ],
    "Trigonometri": [
        { soru: "Trigonometride <strong>Radyan</strong> cinsinden π (pi) açısı kaç dereceye karşılık gelir?", secenekler: ["90°", "180°", "270°", "360°", "45°"], dogruCevap: "180°" },
        { soru: "Sinüs teoremi hangi tür üçgenlerde kullanılabilir?", secenekler: ["Sadece dik üçgenlerde", "Sadece eşkenar üçgenlerde", "Sadece ikizkenar üçgenlerde", "Tüm üçgenlerde", "Hiçbirinde"], dogruCevap: "Tüm üçgenlerde" },
        { soru: "tan(x) fonksiyonu hangi açı değerlerinde <strong>tanımsızdır</strong>?", secenekler: ["0 ve π", "π/2 ve 3π/2", "π/4", "Sadece 0", "Hiçbir zaman tanımsız olmaz"], dogruCevap: "π/2 ve 3π/2" }
    ],
    "Matris ve Determinant": [
        { soru: "Bir matrisin devriği (transpozesi) alındığında aşağıdakilerden hangisi gerçekleşir?", secenekler: ["İşaretleri değişir", "Tüm elemanlar sıfır olur", "Satırlar ve sütunlar yer değiştirir", "Determinantı negatif olur", "Boyutları karesel olur"], dogruCevap: "Satırlar ve sütunlar yer değiştirir" },
        { soru: "A ve B matrisleri çarpılabilir durumdaysa, (A*B)^T (çarpımın transpozesi) ifadesi neye eşittir?", secenekler: ["A^T * B^T", "B^T * A^T", "A * B", "A^-1 * B^-1", "1"], dogruCevap: "B^T * A^T" },
        { soru: "Cramer kuralı ne için kullanılır?", secenekler: ["Türev almak için", "Doğrusal denklem sistemlerini çözmek için", "İntegral sınırlarını bulmak için", "Matrisleri toplamak için", "Polinom köklerini bulmak için"], dogruCevap: "Doğrusal denklem sistemlerini çözmek için" }
    ],
    "Olasılık": [
        { soru: "Bağımsız iki olay olan A ve B'nin <strong>birlikte gerçekleşme (kesişim)</strong> olasılığı P(A ∩ B) nasıl hesaplanır?", secenekler: ["P(A) + P(B)", "P(A) - P(B)", "P(A) / P(B)", "P(A) * P(B)", "1 - P(A)"], dogruCevap: "P(A) * P(B)" },
        { soru: "Bir madeni para 3 kez atıldığında, <strong>en az bir kez</strong> tura gelme olasılığı nedir?", secenekler: ["1/8", "3/8", "1/2", "7/8", "1"], dogruCevap: "7/8" },
        { soru: "Koşullu olasılık P(A|B) ifadesinin anlamı nedir?", secenekler: ["A ve B olaylarının aynı anda olması", "A olayı gerçekleştiğinde B olayının olma olasılığı", "B olayı gerçekleştiğinde A olayının olma olasılığı", "A veya B olayının olma olasılığı", "A ve B'nin bağımsız olması"], dogruCevap: "B olayı gerçekleştiğinde A olayının olma olasılığı" }
    ],

    // ================= FİZİK =================
    "Mekanik ve Dinamik": [
        { soru: "Kapalı bir sistemde dışarıdan net bir kuvvet etki etmediği sürece aşağıdakilerden hangisi <strong>korunur</strong>?", secenekler: ["Kinetik Enerji", "Sıcaklık", "Momentum", "Hacim", "Sürtünme"], dogruCevap: "Momentum" },
        { soru: "Eylemsizlik momenti hangi fiziksel özelliğin dönme hareketindeki karşılığıdır?", secenekler: ["Hız", "Kuvvet", "İvme", "Kütle", "Yol"], dogruCevap: "Kütle" },
        { soru: "Sürtünme kuvvetinin yönü hareket halindeki bir cisim için nasıldır?", secenekler: ["Harekete dik", "Hareket yönünde", "Harekete ters yönde", "Yerçekimine paralel", "Sıfırdır"], dogruCevap: "Harekete ters yönde" }
    ],
    "Elektrik ve Manyetizma": [
        { soru: "Manyetik alan çizgileri mıknatısın dışında hangi yönden hangi yöne doğru hareket eder?", secenekler: ["Güneyden (S) Kuzeye (N)", "Kuzeyden (N) Güneye (S)", "Doğudan Batıya", "Batıdan Doğuya", "Merkezden Dışarıya"], dogruCevap: "Kuzeyden (N) Güneye (S)" },
        { soru: "Bir kondansatörün (sığacın) temel işlevi nedir?", secenekler: ["Elektrik enerjisini depolamak", "Akımı yükseltmek", "Gerilimi düşürmek", "Manyetik alan yaratmak", "Sıcaklığı ölçmek"], dogruCevap: "Elektrik enerjisini depolamak" },
        { soru: "Değişen bir manyetik alanın elektrik akımı oluşturması olayına ne ad verilir?", secenekler: ["Elektroliz", "Elektromanyetik İndüksiyon", "Fotoelektrik Etki", "Compton Saçılması", "Termodinamik"], dogruCevap: "Elektromanyetik İndüksiyon" }
    ],
    "Optik": [
        { soru: "Bir çukur aynada cisim odak noktası (F) ile tepe noktası (T) arasındaysa, oluşan görüntü nasıldır?", secenekler: ["Gerçek, ters ve küçük", "Gerçek, düz ve eşit", "Sanal (Zahiri), düz ve büyük", "Gerçek, ters ve büyük", "Görüntü oluşmaz"], dogruCevap: "Sanal (Zahiri), düz ve büyük" },
        { soru: "Fiber optik kablolarda veri iletimi ışığın hangi optik özelliğine dayanır?", secenekler: ["Tam yansıma", "Kırınım", "Girişim", "Kutuplanma", "Soğurulma"], dogruCevap: "Tam yansıma" },
        { soru: "Işığın prizmadan geçerken renklerine ayrılmasına ne denir?", secenekler: ["Kırınım", "Girişim", "Dispersiyon (Saçınım)", "Polarizasyon", "Yansıma"], dogruCevap: "Dispersiyon (Saçınım)" }
    ],
    "Modern Fizik": [
        { soru: "Fotoelektrik etki deneyinde metal yüzeyden elektron sökebilmek için ışığın hangi özelliğinin belirli bir eşik değerinden büyük olması gerekir?", secenekler: ["Hızı", "Şiddeti", "Dalga Boyu", "Frekansı", "Yansıma açısı"], dogruCevap: "Frekansı" },
        { soru: "Bohr atom modeline göre elektronlar çekirdek etrafında nasıl hareket ederler?", secenekler: ["Rastgele yörüngelerde", "Gezegenler gibi eliptik yörüngelerde", "Belirli enerji seviyelerine sahip dairesel yörüngelerde", "Sürekli ışıma yaparak merkeze düşerler", "Düz bir çizgide"], dogruCevap: "Belirli enerji seviyelerine sahip dairesel yörüngelerde" },
        { soru: "Rölativite (Görelilik) teorisine göre ışık hızına yaklaşan bir sistemde dışarıdan bakan bir gözlemciye göre zaman nasıl akar?", secenekler: ["Hızlanır", "Aynı kalır", "Geriye doğru akar", "Yavaşlar (Zaman Genişlemesi)", "Durur"], dogruCevap: "Yavaşlar (Zaman Genişlemesi)" }
    ],

    // ================= TARİH =================
    "Osmanlı Devleti Yükseliş": [
        { soru: "Preveze Deniz Savaşı'nda Haçlı donanmasını yenerek Akdeniz'i bir Türk gölü haline getiren ünlü Türk denizcisi kimdir?", secenekler: ["Barbaros Hayreddin Paşa", "Piri Reis", "Turgut Reis", "Oruç Reis", "Seydi Ali Reis"], dogruCevap: "Barbaros Hayreddin Paşa" },
        { soru: "Yavuz Sultan Selim döneminde Safevi Devleti ile yapılan ve Doğu Anadolu'nun güvenliğini sağlayan savaş hangisidir?", secenekler: ["Otlukbeli", "Çaldıran", "Mercidabık", "Ridaniye", "Mohaç"], dogruCevap: "Çaldıran" },
        { soru: "Osmanlı Devleti'nde devşirme sisteminden gelenlerin yetiştirildiği en üst düzey eğitim kurumu hangisidir?", secenekler: ["Medrese", "Enderun Mektebi", "Mekteb-i Harbiye", "Darülfünun", "Tekke"], dogruCevap: "Enderun Mektebi" }
    ],
    "İnkılap Tarihi": [
        { soru: "Misak-ı Milli sınırları içinde vatanın bir bütün olduğunu ve parçalanamayacağını ilk kez hangi kongrede açıkça vurgulanmıştır?", secenekler: ["Alaşehir Kongresi", "Balıkesir Kongresi", "Erzurum Kongresi", "Sivas Kongresi", "Amasya Genelgesi"], dogruCevap: "Erzurum Kongresi" },
        { soru: "Lozan Barış Antlaşması'nda Türkiye'yi hangi devlet adamı baş delege olarak temsil etmiştir?", secenekler: ["Mustafa Kemal Paşa", "Rauf Orbay", "İsmet İnönü", "Fevzi Çakmak", "Kazım Karabekir"], dogruCevap: "İsmet İnönü" },
        { soru: "Tekke, zaviye ve türbelerin kapatılması Atatürk'ün hangi ilkesiyle doğrudan ilgilidir?", secenekler: ["Cumhuriyetçilik", "Milliyetçilik", "Laiklik", "Devletçilik", "Halkçılık"], dogruCevap: "Laiklik" }
    ],
    "İlk Çağ Uygarlıkları": [
        { soru: "Mısır uygarlığında firavunların mezarları olarak bilinen ve en ünlüsü Keops olan anıtsal yapılar hangisidir?", secenekler: ["Ziggurat", "Piramit", "Obelisk", "Kolezyum", "Panteon"], dogruCevap: "Piramit" },
        { soru: "Tarihte ilk yazılı kanunları oluşturan Babil kralı kimdir?", secenekler: ["Hammurabi", "Nabukadnezar", "Sargon", "Urgakina", "Asurbanipal"], dogruCevap: "Hammurabi" },
        { soru: "Demokrasinin temellerinin atıldığı ve şehir devletleri (Polis) halinde yaşayan uygarlık hangisidir?", secenekler: ["Roma", "İnka", "Antik Yunan", "Pers", "Hint"], dogruCevap: "Antik Yunan" }
    ],
    "Soğuk Savaş Dönemi": [
        { soru: "ABD'nin Avrupa ülkelerine Sovyet tehdidine karşı sağladığı ekonomik yardım paketinin adı nedir?", secenekler: ["Truman Doktrini", "Monroe Doktrini", "Marshall Planı", "Eisenhower Doktrini", "Balfour Deklarasyonu"], dogruCevap: "Marshall Planı" },
        { soru: "SSCB'nin uzaya gönderdiği ve uzay yarışını başlatan ilk yapay uydu hangisidir?", secenekler: ["Apollo 11", "Sputnik 1", "Explorer 1", "Vostok 1", "Mir"], dogruCevap: "Sputnik 1" },
        { soru: "Kore Savaşı sonrasında Kuzey ve Güney Kore'yi ayıran paralel hangisidir?", secenekler: ["17. Paralel", "38. Paralel", "42. Paralel", "Enlem Sınırı Yoktur", "Ekvator"], dogruCevap: "38. Paralel" }
    ],

    // ================= GENEL KÜLTÜR =================
    "Dünya Başkentleri": [
        { soru: "Güney Amerika kıtasında yer alan Brezilya'nın başkenti neresidir?", secenekler: ["Rio de Janeiro", "São Paulo", "Brasília", "Buenos Aires", "Lima"], dogruCevap: "Brasília" },
        { soru: "Avrupa Birliği'nin de birçok idari kurumuna ev sahipliği yapan Belçika'nın başkenti hangisidir?", secenekler: ["Amsterdam", "Zürih", "Paris", "Brüksel", "Viyana"], dogruCevap: "Brüksel" },
        { soru: "Afrika kıtasında yer alan Mısır'ın başkenti neresidir?", secenekler: ["Kahire", "İskenderiye", "Rabat", "Cezayir", "Trablus"], dogruCevap: "Kahire" }
    ],
    "Sanat ve Edebiyat": [
        { soru: "İspanyol yazar Miguel de Cervantes'in kaleme aldığı, yel değirmenlerine karşı savaşan kahramanın anlatıldığı ünlü eser hangisidir?", secenekler: ["İlahi Komedi", "Sefiller", "Don Kişot", "Faust", "Hamlet"], dogruCevap: "Don Kişot" },
        { soru: "Sürrealizm (Gerçeküstücülük) akımının en önemli temsilcilerinden olan, 'Eriyen Saatler' (Hafızanın Azmi) tablosunun ressamı kimdir?", secenekler: ["Salvador Dalí", "Frida Kahlo", "Claude Monet", "Vincent van Gogh", "Pablo Picasso"], dogruCevap: "Salvador Dalí" },
        { soru: "Türk edebiyatında 'Vatan Şairi' olarak bilinen ve İntibah, Vatan Yahut Silistre eserlerinin yazarı kimdir?", secenekler: ["Ziya Paşa", "Şinasi", "Namık Kemal", "Tevfik Fikret", "Ahmet Haşim"], dogruCevap: "Namık Kemal" }
    ],
    "Sinema Tarihi": [
        { soru: "1994 yapımı, bir kutu çikolata metaforuyla hafızalara kazınan ve Tom Hanks'in başrolünde oynadığı film hangisidir?", secenekler: ["Forrest Gump", "Yeşil Yol", "Cast Away", "Er Ryan'ı Kurtarmak", "Esaretin Bedeli"], dogruCevap: "Forrest Gump" },
        { soru: "Sinema tarihinde ilk defa ticari gösterim yapan ve 'Trenin Gara Girişi' filmiyle seyircileri korkutan kardeşler kimdir?", secenekler: ["Wright Kardeşler", "Lumière Kardeşler", "Coen Kardeşler", "Warner Kardeşler", "Wachowski Kardeşler"], dogruCevap: "Lumière Kardeşler" },
        { soru: "'Matrix' serisinde Keanu Reeves'in canlandırdığı ana karakterin hacker alias'ı (takma adı) nedir?", secenekler: ["Morpheus", "Trinity", "Neo", "Smith", "Cypher"], dogruCevap: "Neo" }
    ],
    "Güncel Olaylar": [
        { soru: "Dünya Sağlık Örgütü'nün (WHO) kısaltması hangi kelimelerin baş harflerinden oluşur?", secenekler: ["World Health Organization", "World Human Organization", "Wide Health Operations", "World Healing Order", "Western Health Organization"], dogruCevap: "World Health Organization" },
        { soru: "Mars'ta araştırmalar yapan ve uçurulan ilk mini helikopterin adı nedir?", secenekler: ["Perseverance", "Curiosity", "Ingenuity", "Voyager", "Apollo"], dogruCevap: "Ingenuity" },
        { soru: "Nobel ödülleri hangi ülkede dağıtılmaktadır? (Barış ödülü hariç)", secenekler: ["İsviçre", "İsveç", "Norveç", "Almanya", "Fransa"], dogruCevap: "İsveç" }
    ],

    // ================= YABANCI DİL =================
    "İngilizce Grammar": [
        { soru: "Aşağıdaki ifadelerden hangisi 'If Clause Type 2' (Hayali durumlar) kuralına uygundur?", secenekler: ["If it rains, I will stay at home.", "If I had money, I would buy a car.", "If I had studied, I would have passed.", "If water boils, it evaporates.", "If you are ready, we can go."], dogruCevap: "If I had money, I would buy a car." },
        { soru: "'The window _____ by the boy yesterday.' cümlesinde boşluğa Passive Voice kuralına göre hangisi gelmelidir?", secenekler: ["breaks", "broke", "was broken", "is broken", "has broken"], dogruCevap: "was broken" },
        { soru: "Hangi bağlaç (conjunction) zıtlık belirtmek için <strong>kullanılmaz</strong>?", secenekler: ["However", "Although", "Despite", "Therefore", "Even though"], dogruCevap: "Therefore" },
        { soru: "She is used ____ early in the morning.", secenekler: ["to waking up", "to wake up", "waking up", "wake up", "woke up"], dogruCevap: "to waking up" }
    ],
    "Günlük Konuşma": [
        { soru: "Bir restoranda hesabı istemek için garsona hangisini söylemek en uygundur?", secenekler: ["Give me the paper.", "Can I have the bill, please?", "I want to pay now.", "Bring the check fast.", "Money please."], dogruCevap: "Can I have the bill, please?" },
        { soru: "'It’s raining cats and dogs.' deyiminin anlamı nedir?", secenekler: ["Kedi ve köpekler yağıyor.", "Hava çok rüzgarlı.", "Şiddetli (bardaktan boşanırcasına) yağmur yağıyor.", "Hayvanlar için tehlikeli bir hava var.", "Güneşli ama yağmurlu."], dogruCevap: "Şiddetli (bardaktan boşanırcasına) yağmur yağıyor." },
        { soru: "Telefon görüşmesinde 'Bir saniye bekler misiniz?' demek için hangi ifade yaygındır?", secenekler: ["Stop there.", "Hold on a second.", "Don't speak.", "Wait a minute, I am busy.", "Close the phone."], dogruCevap: "Hold on a second." }
    ],
    "İş İngilizcesi": [
        { soru: "İş dünyasında <strong>'B2B'</strong> kısaltmasının açılımı nedir?", secenekler: ["Business to Boss", "Brand to Brand", "Business to Business", "Back to Back", "Business to Buyer"], dogruCevap: "Business to Business" },
        { soru: "Toplantı tutanakları (özeti) anlamına gelen İngilizce iş terimi hangisidir?", secenekler: ["Meeting notes", "Minutes of the meeting", "Summary", "Agenda", "Conclusion"], dogruCevap: "Minutes of the meeting" },
        { soru: "Bir e-postanın sonuna eklenen 'Ekte bulabilirsiniz' ifadesi İngilizce'de nasıl yazılır?", secenekler: ["Please find attached", "Look at the extra", "File is here", "I sent a document", "Check the inside"], dogruCevap: "Please find attached" }
    ],
    "Kelime Bilgisi": [
        { soru: "İngilizce'de 'Çelişki, Zıtlık' anlamına gelen kelime hangisidir?", secenekler: ["Agreement", "Contradiction", "Explanation", "Similarity", "Evidence"], dogruCevap: "Contradiction" },
        { soru: "Aşağıdaki kelimelerden hangisi 'Geliştirmek, iyileştirmek' anlamına gelir?", secenekler: ["Destroy", "Decrease", "Improve", "Complain", "Refuse"], dogruCevap: "Improve" },
        { soru: "'Durable' kelimesinin eş anlamlısı (synonym) hangisi olabilir?", secenekler: ["Fragile", "Weak", "Long-lasting", "Short", "Expensive"], dogruCevap: "Long-lasting" },
        { soru: "'Essential' kelimesinin en doğru Türkçe çevirisi nedir?", secenekler: ["Gereksiz", "Temel, Zaruri", "Pahalı", "Geçici", "Güzel"], dogruCevap: "Temel, Zaruri" }
    ]
};
