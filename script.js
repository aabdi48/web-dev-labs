
 // Abdullahi Abdi - Lab 9

// ==========================================
// LAB 8 - PREVIOUS JAVASCRIPT FEATURES
// ==========================================

// Part 2 - Variables and Data Types
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;

labsCompleted = labsCompleted + 1;

console.log(`${name} has completed ${labsCompleted} labs.`);
console.log("Enrolled:", isEnrolled);


// Part 1 - Like Button
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");

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
                likeMessage.textContent =
                    "Wow, thanks for all the likes!";
            } else if (this.likes >= 5) {
                likeMessage.textContent =
                    "Glad you like it!";
            } else {
                likeMessage.textContent = "";
            }
        }
    }
};

if (likeBtn) {
    likeBtn.addEventListener("click", function() {
        LikeCounter.increment();
    });
} else {
    console.warn("like-btn not found on this page");
}


// Part 2 - Arrays and Loops
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


// Part 3 - Conditionals
// Conditional messages are handled by
// the LikeCounter.render() function above.


// Part 4 - Dark Mode (From Lab 7)
const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });
} else {
    console.warn("theme-btn not found on this page");
}


// Part 6 - Testing
console.log("Lab 8 JavaScript loaded successfully.");


// ==========================================
// LAB 9 - ASYNCHRONOUS JAVASCRIPT
// ==========================================

// Part 1 - Synchronous vs. Asynchronous
// The setTimeout experiment was completed.
// Expected execution order: 1, 3, 2.
// JavaScript continues running without
// waiting for setTimeout to finish.


// Part 2 - Creating a Promise
function getGreetingAfterDelay() {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve("Hello from the future!");
        }, 800);
    });
}


// Part 3 - Async/Await
async function showGreeting() {
    const message = await getGreetingAfterDelay();
    console.log(message);
}

showGreeting();


// Part 4 - Fetching Real Data from an API
const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {

    // Show loading message while waiting
    factDisplay.textContent = "Loading...";

    try {

        // Fetch a random cat fact
        const response = await fetch(
            "https://catfact.ninja/fact"
        );

        // Check if the request succeeded
        if (!response.ok) {
            throw new Error(
                "Server responded with an error"
            );
        }

        // Convert the response to JSON
        const data = await response.json();

        // Display the cat fact
        factDisplay.textContent = data.fact;

    } catch (error) {

        // Display a friendly error message
        factDisplay.textContent =
            "Couldn't load a fact right now. Try again.";

        console.error(error);
    }
}


// Add click event to the Cat Fact button
if (factBtn && factDisplay) {
    factBtn.addEventListener("click", loadFact);
} else {
    console.warn("Cat Fact elements not found.");
}


// Lab 9 - Final Testing
console.log("Lab 9 JavaScript loaded successfully.");
