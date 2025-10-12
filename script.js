console.log("Study Streak Tracker started!");
console.log("Study Streak Tracker started!");

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Save streak and last study date in localStorage
function saveStreakData(date, streak) {
    localStorage.setItem('lastStudyDate', date);
    localStorage.setItem('studyStreak', streak);
}

// Load streak and last study date from localStorage
function loadStreakData() {
    return {
        lastStudyDate: localStorage.getItem('lastStudyDate'),
        studyStreak: parseInt(localStorage.getItem('studyStreak') || "0", 10)
    };
}

// Function to handle "Log Study" button click
function logStudy() {
    const today = getTodayDate();
    const { lastStudyDate, studyStreak } = loadStreakData();

    let newStreak = studyStreak;

    if (!lastStudyDate) {
        // First time logging
        newStreak = 1;
    } else {
        const lastDate = new Date(lastStudyDate);
        const todayDate = new Date(today);

        // Calculate difference in days
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Consecutive day, increase streak
            newStreak += 1;
        } else if (diffDays > 1) {
            // Missed a day, reset streak
            newStreak = 1;
        } // If diffDays === 0, user already logged today; don't increment
    }

    saveStreakData(today, newStreak);
    updateStreakDisplay(newStreak);
}

// Function to update streak display (implement as needed)
function updateStreakDisplay(streak) {
    // Example: document.getElementById('streakCount').textContent = streak;
    console.log("Current study streak:", streak);
}

// Example: Attach to button
// document.getElementById('logStudyButton').addEventListener('click', logStudy);

// On page load, show current streak
window.addEventListener('DOMContentLoaded', () => {
    const { studyStreak } = loadStreakData();
    updateStreakDisplay(studyStreak);
});
