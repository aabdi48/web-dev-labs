// Abdullahi Abdi — Lab 8

// Part 2 – Variables and Data Types
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;

labsCompleted = labsCompleted + 1;

console.log(`${name} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// Part 1 – Extracting Functions (Like Button)
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");

let likes = 0;

function incrementLikes() {
    likes = likes + 1;
    updateLikeDisplay();
}

function updateLikeDisplay() {
    if (!likeCount) {
        console.warn("like-count not found on this page");
        return;
    }

    likeCount.textContent = `${likes} likes`;

    if (likeMessage) {
        if (likes >= 10) {
            likeMessage.textContent = "Wow, thanks for all the likes!";
        } else if (likes >= 5) {
            likeMessage.textContent = "Glad you like it!";
        } else {
            likeMessage.textContent = "";
        }
    }
}


// Part 2 – Arrays and Loops
const goals = ["HTML", "CSS", "JavaScript", "Git"];
const goalsList = document.querySelector("#goals-list");

if (goalsList) {
    goals.forEach(function(goal) {
        const item = document.createElement("li");
        item.textContent = goal;
        goalsList.appendChild(item);
    });
} else {
    console.warn("goals-list not found on this page");
}


// Part 3 – Conditionals
// The conditional messages are handled by updateLikeDisplay() above.


// Part 4 – Defensive Code
if (likeBtn) {
    likeBtn.addEventListener("click", incrementLikes);
} else {
    console.warn("like-btn not found on this page");
}


// Part 5 – Grouping Related Code
const LikeCounter = {
    likes: 0,

    increment() {
        this.likes = this.likes + 1;
        this.render();
    },

    render() {
        if (!likeCount) {
            console.warn("like-count not found on this page");
            return;
        }

        likeCount.textContent = `${this.likes} likes`;

        if (likeMessage) {
            if (this.likes >= 10) {
                likeMessage.textContent = "Wow, thanks for all the likes!";
            } else if (this.likes >= 5) {
                likeMessage.textContent = "Glad you like it!";
            } else {
                likeMessage.textContent = "";
            }
        }
    }
};

// Replace the earlier like-button listener with the object version.
if (likeBtn) {
    likeBtn.removeEventListener("click", incrementLikes);

    likeBtn.addEventListener("click", function() {
        LikeCounter.increment();
    });
}


// Part 4 – Dark Mode (From Lab 7)
const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });
} else {
    console.warn("theme-btn not found on this page");
}


// Part 6 – Testing
console.log("Lab 8 JavaScript loaded successfully.");