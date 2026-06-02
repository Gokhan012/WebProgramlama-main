// Sorular questions.js içerisindeki questionsDB objesinden dinamik olarak çekilir.
let dersler = [];


let mevcutSoruIndex = 0;
let verilenCevaplar = new Array(dersler.length).fill(null);
let testBasladiMi = false;



function autoSaveTest() {
    const userName = sessionStorage.getItem("loggedInUser");
    const quizTopic = localStorage.getItem("quizTopic");
    if (!userName || !quizTopic || typeof dersler === 'undefined' || dersler.length === 0) return;
    
    fetch('/api/test/save', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: userName,
            topic: quizTopic,
            questions: dersler,
            answers: verilenCevaplar,
            currentIndex: mevcutSoruIndex
        })
    }).catch(err => console.log(err));
}

function checkUnfinishedTest(containerId) {
    const userName = sessionStorage.getItem("loggedInUser");
    if (!userName) return;
    
    fetch(`/api/test/load?username=${userName}`)
    .then(res => {
        if(res.status === 200) {
            res.json().then(data => {
                const container = document.getElementById(containerId);
                if(container && data.topic) {
                    container.innerHTML = `
                        <div style="background-color: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="color: #d97706;">⚠️ Yarım Kalan Sınavınız Var!</strong><br>
                                <span style="color: #92400e; font-size: 14px;">En son <b>${data.topic}</b> konusundan sınav çözerken ayrıldınız.</span>
                            </div>
                            <button onclick="resumeTest()" class="action-btn auth-btn" style="background-color: #f59e0b; padding: 8px 16px; margin-top: 0; width: auto; font-size: 14px;">Devam Et ➔</button>
                        </div>
                    `;
                }
            });
        }
    }).catch(err => console.log(err));
}

function resumeTest() {
    localStorage.setItem("resumeTestMode", "true");
    window.location.href = "/Home/Quiz";
}

function soruyuYukle() {
    const quizArea = document.getElementById("quiz-area");
    quizArea.innerHTML = ""; 
    
    navigasyonBas();
    
    document.getElementById("message-area").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("finish-btn").style.display = "none";

    const mevcutSoru = dersler[mevcutSoruIndex];

    const box = document.createElement("div");
    box.className = "box";

    const h3 = document.createElement("h3");
    
    // Ders ve Konu Bilgisini Göster
    const quizCourse = localStorage.getItem("quizCourse");
    const quizTopic = localStorage.getItem("quizTopic");
    
    let infoHTML = "";
    if (quizCourse && quizTopic) {
        infoHTML = "<div style='margin-bottom:15px; display:inline-block; background:#eff6ff; color:#2563eb; padding:6px 12px; border-radius:6px; font-size:13px; font-weight:600;'>" + quizCourse + " - " + quizTopic + "</div><br>";
    }

    h3.innerHTML = infoHTML + "<span style='color:#7f8c8d; font-size:14px; font-weight:normal;'>Soru " + (mevcutSoruIndex + 1) + " / " + dersler.length + "</span><br><br>" + mevcutSoru.soru;
    box.appendChild(h3);

    const ul = document.createElement("ul");
    ul.className = "options-list";

    // Şık Harfleri Dizisi 
    const harfler = ["A", "B", "C", "D", "E"];

    mevcutSoru.secenekler.forEach((secenekText, idx) => {
        const li = document.createElement("li");
        
        const btn = document.createElement("button");
        btn.className = "btn";
        
        const safeText = secenekText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        btn.innerHTML = "<strong>" + harfler[idx] + ")</strong>" + safeText;
        
        // Eğer bu soruya daha önce cevap verdiysek
        if (verilenCevaplar[mevcutSoruIndex] !== null) {
            btn.disabled = true;
            
            // Eğer butondaki cevap verdiğimiz cevapsa:
            if (secenekText === verilenCevaplar[mevcutSoruIndex]) {
                const messageArea = document.getElementById("message-area");
                messageArea.style.display = "block";
                
                if (secenekText === mevcutSoru.dogruCevap) {
                    btn.classList.add("correct");
                    messageArea.className = "alert-success";
                    messageArea.innerHTML = "<strong>✅ Harika!</strong> Doğru cevap.";
                } else {
                    btn.classList.add("wrong");
                    messageArea.className = "alert-danger";
                    const safeAnswer = mevcutSoru.dogruCevap.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    messageArea.innerHTML = "<strong>❌ Yanlış Cevap!</strong><br><br>Doğru Cevabı: " + safeAnswer;
                }
            }
        } else {
            // Soru henüz cevaplanmadıysa tıklama çalışsın
            btn.onclick = function() {
                verilenCevaplar[mevcutSoruIndex] = secenekText;
                autoSaveTest();
                cevapKontrol(this, secenekText);
            };
        }

        li.appendChild(btn);
        ul.appendChild(li);
    });

    box.appendChild(ul);
    quizArea.appendChild(box);
    
    // Eğer cevaplandıysa, ileri veya bitir butonu (Büyük butonlar için)
    if (verilenCevaplar[mevcutSoruIndex] !== null) {
        if (mevcutSoruIndex < dersler.length - 1) {
            document.getElementById("next-btn").style.display = "inline-block";
        } else {
            document.getElementById("finish-btn").style.display = "inline-block";
        }
    }
    
    // Küçük nav butonları görünürlük kontrolü
    const prevBtn = document.getElementById("prev-btn");
    const nextBtnSmall = document.getElementById("next-btn-small");
    if (prevBtn) prevBtn.style.visibility = (mevcutSoruIndex === 0) ? "hidden" : "visible";
    if (nextBtnSmall) nextBtnSmall.style.visibility = (mevcutSoruIndex === dersler.length - 1) ? "hidden" : "visible";
}

// Navigasyon Menüsünü Oluştur
function navigasyonBas() {
    const paginationBar = document.getElementById("pagination-bar");
    if (!paginationBar) return;
    paginationBar.innerHTML = "";
    
    for (let i = 0; i < dersler.length; i++) {
        const pageItem = document.createElement("div");
        pageItem.className = "page-item";
        pageItem.innerText = (i + 1);
        
        // Şu anki sorudaysa active sınıfını ver
        if (i === mevcutSoruIndex) {
            pageItem.classList.add("active");
        } 
        // Ancak ayrıca daha önce cevaplanmışsa rengine göre sınıf ekle
        else if (verilenCevaplar[i] !== null) {
            if (verilenCevaplar[i] === dersler[i].dogruCevap) {
                pageItem.classList.add("answered-correct");
            } else {
                pageItem.classList.add("answered-wrong");
            }
        }
        
        pageItem.onclick = function(e) {
            soruyaGit(i);
        };
        
        paginationBar.appendChild(pageItem);
    }
}

function soruyaGit(index) {
    if (index === mevcutSoruIndex) return;
    
    document.getElementById("message-area").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("finish-btn").style.display = "none";

    const activeBox = document.querySelector(".box");
    if (activeBox) {
        // Eski soruyu sola kaydırarak kaybet
        activeBox.style.animation = "slideOut 0.3s ease-in forwards";
        
        // Animasyon bitince (300ms) yenisini getir
        setTimeout(() => {
            mevcutSoruIndex = index;
            soruyuYukle();
        }, 300);
    } else {
        mevcutSoruIndex = index;
        soruyuYukle();
    }
}


function cevapKontrol(tiklananButon, secilenCevap) {
    if(tiklananButon.disabled) return;

    // Verilen cevabı doğrudan index bazlı array'a kaydet
    verilenCevaplar[mevcutSoruIndex] = secilenCevap;

    const mevcutSoru = dersler[mevcutSoruIndex];
    const messageArea = document.getElementById("message-area");
    messageArea.style.display = "block";

    // DOĞRU CEVAP
    if (secilenCevap === mevcutSoru.dogruCevap) {
        tiklananButon.classList.add("correct");
        messageArea.className = "alert-success";
        messageArea.innerHTML = "<strong>✅ Harika!</strong> Doğru cevap. <em>(Sonraki soruya geçiliyor...)</em>";
        
        navigasyonBas();
        // Doğru bildiyse otomatik geçiş parametresi (true) gönder
        soruyuKapat(true);
    } 
    // YANLIŞ CEVAP
    else {
        tiklananButon.classList.add("wrong");
        messageArea.className = "alert-danger";
        
        const safeAnswer = mevcutSoru.dogruCevap.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        messageArea.innerHTML = "<strong>❌ Yanlış Cevap!</strong><br><br>Doğru Cevabı: " + safeAnswer;
        
        navigasyonBas();
        // Yanlışsa sadece kapat 
        soruyuKapat(false);
    }
}


function soruyuKapat(otomatikGecis = false) {
    const documentBtns = document.getElementById("quiz-area").querySelectorAll(".btn");
    documentBtns.forEach(btn => {
        btn.disabled = true;
    });

    if (otomatikGecis) {
        // İleri veya Bitir butonlarını hiç çıkarma, 1 saniye bekle ve diğerine geç
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("finish-btn").style.display = "none";
        
        setTimeout(() => {
            if (mevcutSoruIndex < dersler.length - 1) {
                soruyaGit(mevcutSoruIndex + 1);
            } else {
                sinaviBitir();
            }
        }, 1200); // 1.2 saniye beklet
    } else {
        // Yanlış bildiyse butonları çıkart 
        if (mevcutSoruIndex < dersler.length - 1) {
            document.getElementById("next-btn").style.display = "inline-block";
        } else {
            document.getElementById("finish-btn").style.display = "inline-block";
        }
    }
}

function oncekiSoru() {
    if (mevcutSoruIndex > 0) {
        mevcutSoruIndex--;
        autoSaveTest();
        soruyuYukle();
    }
}

function siradakiSoru() {
    if (mevcutSoruIndex < dersler.length - 1) {
        mevcutSoruIndex++;
        autoSaveTest();
        soruyuYukle();
    }
}

function sinaviBitir() {
    // Sınav biterken de son soruyu kaydır
    document.getElementById("message-area").style.display = "none";
    document.getElementById("finish-btn").style.display = "none";
    const navContainer = document.getElementById("nav-container");
    if (navContainer) navContainer.style.display = "none";

    let finalDogruSayisi = 0;
    let finalYanlisSayisi = 0;
    let finalBosSayisi = 0;

    // Doğru, yanlış ve boşları diziden tekrar sayıyoruz
    for (let i = 0; i < dersler.length; i++) {
        if (verilenCevaplar[i] === null) {
            finalBosSayisi++;
        } else if (verilenCevaplar[i] === dersler[i].dogruCevap) {
            finalDogruSayisi++;
        } else {
            finalYanlisSayisi++;
        }
    }

    // İstatistikleri LocalStorage'a kaydet
    const userName = sessionStorage.getItem("loggedInUser");
    const quizTopic = localStorage.getItem("quizTopic");
    if (userName && quizTopic) {
        let stats = JSON.parse(localStorage.getItem(`stats_${userName}`)) || {};
        if (!stats[quizTopic]) {
            stats[quizTopic] = { total: 0, correct: 0, wrong: 0, empty: 0 };
        }
        stats[quizTopic].total += dersler.length;
        stats[quizTopic].correct += finalDogruSayisi;
        stats[quizTopic].wrong += finalYanlisSayisi;
        stats[quizTopic].empty += finalBosSayisi;
        localStorage.setItem(`stats_${userName}`, JSON.stringify(stats));
        
        // Backend'e puanı gönder (Her doğru 10 puan)
        let lastScoreEarned = finalDogruSayisi * 10;
        localStorage.setItem(`lastScore_${userName}`, lastScoreEarned);
        
        let maxScore = dersler.length * 10;
        fetch('/api/user/score', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ 
                username: userName, 
                addedScore: lastScoreEarned, 
                topic: quizTopic, 
                maxScore: maxScore,
                totalQuestions: dersler.length,
                correct: finalDogruSayisi,
                wrong: finalYanlisSayisi,
                empty: finalBosSayisi
            })
        }).catch(err => console.log(err));
        
        // Test bittiği için saved veriyi sil
        fetch('/api/test/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username: userName })
        }).catch(err => console.log(err));
    }

    const activeBox = document.querySelector(".box");
    if (activeBox) {
        activeBox.style.animation = "slideOut 0.3s ease-in forwards";
    }

    setTimeout(() => {
        document.getElementById("quiz-area").style.display = "none";
        
        document.getElementById("result-screen").style.display = "block";
        document.getElementById("score-correct").innerHTML = "✅ Doğru: " + finalDogruSayisi;
        document.getElementById("score-wrong").innerHTML = "❌ Yanlış: " + finalYanlisSayisi;
        document.getElementById("score-empty").innerHTML = "⚪ Boş: " + finalBosSayisi;
    }, 300);
}

document.addEventListener("DOMContentLoaded", function() {
    const quizArea = document.getElementById("quiz-area");
    const configArea = document.getElementById("config-area");
    
    if (quizArea && configArea) {
        const resumeMode = localStorage.getItem("resumeTestMode");
        if (resumeMode === "true") {
            localStorage.removeItem("resumeTestMode");
            const userName = sessionStorage.getItem("loggedInUser");
            fetch(`/api/test/load?username=${userName}`)
            .then(res => res.json())
            .then(data => {
                if(!data.error) {
                    localStorage.setItem("quizTopic", data.topic);
                    dersler = data.questions;
                    verilenCevaplar = data.answers;
                    mevcutSoruIndex = data.currentIndex;
                    
                    configArea.style.display = "none";
                    quizArea.style.display = "block";
                    const navContainer = document.getElementById("nav-container");
                    if(navContainer) navContainer.style.display = "flex";
                    
                    soruyuYukle();
                } else {
                    window.location.href = "/Home/Index";
                }
            }).catch(() => { window.location.href = "/Home/Index"; });
            return;
        }

        const quizTopic = localStorage.getItem("quizTopic");
        
        // Konu kontrolü yap
        if (quizTopic && typeof questionsDB !== 'undefined' && questionsDB[quizTopic]) {
            // Ayar ekranını göster
            configArea.style.display = "block";
            quizArea.style.display = "none";
            
            // Navigasyon barını ve mesaj alanını gizle
            const navContainer = document.getElementById("nav-container");
            if(navContainer) navContainer.style.display = "none";
            document.getElementById("next-btn").style.display = "none";
            document.getElementById("finish-btn").style.display = "none";
            document.getElementById("message-area").style.display = "none";
        } else {
            // Konu seçilmemişse veya yanlışsa ana sayfaya dön
            window.location.href = "/Home/Index";
        }
    }
});

function startWithQuestions(count) {
    const quizTopic = localStorage.getItem("quizTopic");
    let rawQuestions = [...questionsDB[quizTopic]];
    
    // Havuzdaki tüm soruları rastgele karıştır (Shuffle)
    for (let i = rawQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rawQuestions[i], rawQuestions[j]] = [rawQuestions[j], rawQuestions[i]];
    }
    
    // Sadece kullanıcının istediği adet kadar soruyu kes (slice)
    dersler = rawQuestions.slice(0, count);
    
    // Seçilen soruların şıklarını da kendi içinde karıştır
    dersler.forEach(q => {
        let options = [...q.secenekler];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        q.secenekler = options;
    });

    verilenCevaplar = new Array(dersler.length).fill(null);
    mevcutSoruIndex = 0;
    
    // Ayar ekranını gizle, sınav alanını göster
    document.getElementById("config-area").style.display = "none";
    document.getElementById("quiz-area").style.display = "block";
    const navContainer = document.getElementById("nav-container");
    if(navContainer) navContainer.style.display = "flex";
    
    soruyuYukle();
}


