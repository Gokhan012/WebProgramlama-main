// level-system.js
// XP tabanlı Seviye Hesaplama Fonksiyonları
// Formül: Level = Math.floor(Math.sqrt(XP / 50)) + 1
// Lvl 1: 0-49 XP
// Lvl 2: 50-199 XP
// Lvl 3: 200-449 XP
// Lvl 4: 450-799 XP

function getLevelFromXP(xp) {
    if (!xp || xp < 0) xp = 0;
    return Math.floor(Math.sqrt(xp / 50)) + 1;
}

function getXPForLevel(level) {
    if (level <= 1) return 0;
    return 50 * Math.pow(level - 1, 2);
}

function getLevelProgress(xp) {
    if (!xp || xp < 0) xp = 0;
    const currentLevel = getLevelFromXP(xp);
    const nextLevelXP = getXPForLevel(currentLevel + 1);
    const currentLevelBaseXP = getXPForLevel(currentLevel);
    
    const xpIntoLevel = xp - currentLevelBaseXP;
    const xpRequiredForNext = nextLevelXP - currentLevelBaseXP;
    
    let progress = 0;
    if (xpRequiredForNext > 0) {
        progress = (xpIntoLevel / xpRequiredForNext) * 100;
    }
    
    return {
        level: currentLevel,
        progressPercent: Math.min(Math.max(progress, 0), 100).toFixed(1),
        xpNext: nextLevelXP,
        xpCurrentBase: currentLevelBaseXP,
        xpRemaining: nextLevelXP - xp
    };
}

window.LevelSystem = {
    getLevelFromXP,
    getXPForLevel,
    getLevelProgress
};
