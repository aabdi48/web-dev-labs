// Abdullahi Abdi - Lab 10

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


// ==========================================
// LAB 10 - PART 1: LOCAL STORAGE
// ==========================================

// Check if localStorage is available
function storageAvailable() {
    try {
        const testKey = "__storage_test__";
        localStorage.setItem(testKey, "test");
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        console.warn("localStorage is unavailable:", error);
        return false;
    }
}

const canUseStorage = storageAvailable();

function getSavedItem(key) {
    if (!canUseStorage) {
        return null;
    }

    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn("Could not read storage:", error);
        return null;
    }
}

function saveItem(key, value) {
    if (!canUseStorage) {
        return;
    }

    try {
        localStorage.setItem(key, String(value));
    } catch (error) {
        console.warn("Could not save storage:", error);
    }
}


// ==========================================
// LAB 8 + LAB 10 - LIKE BUTTON
// ==========================================

const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");

// Restore the saved number of likes
const savedLikes = Number(getSavedItem("likes"));
const startingLikes =
    Number.isFinite(savedLikes) && savedLikes >= 0
        ? savedLikes
        : 0;

const LikeCounter = {
    likes: startingLikes,

    increment() {
        this.likes = this.likes + 1;

        // Save likes whenever the count changes
        saveItem("likes", this.likes);

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

// Display the stored count immediately
LikeCounter.render();

if (likeBtn) {
    likeBtn.addEventListener("click", function() {
        LikeCounter.increment();
    });
} else {
    console.warn("like-btn not found on this page");
}


// ==========================================
// LAB 8 - ARRAYS AND LOOPS
// ==========================================

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


// ==========================================
// LAB 8 - CONDITIONALS
// ==========================================

// Conditional messages are handled by
// the LikeCounter.render() function above.


// ==========================================
// LAB 10 - PART 2: PERSISTENT DARK MODE
// ==========================================

const themeBtn = document.querySelector("#theme-btn");

// Apply saved preference when the page loads
if (getSavedItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

if (themeBtn) {
    themeBtn.addEventListener("click", function() {

        // Toggle the dark mode class
        document.body.classList.toggle("dark-mode");

        // Save the user's preference
        const isDark =
            document.body.classList.contains("dark-mode");

        saveItem("theme", isDark ? "dark" : "light");
    });
} else {
    console.warn("theme-btn not found on this page");
}


// ==========================================
// LAB 8 - TESTING
// ==========================================

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


// ==========================================
// LAB 9 - CAT FACTS API
// ==========================================

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

console.log("Lab 9 JavaScript loaded successfully.");


// ==========================================
// LAB 10 - PART 3: GEOLOCATION API
// ==========================================

const locationBtn =
    document.querySelector("#location-btn");

const locationDisplay =
    document.querySelector("#location-display");

if (locationBtn && locationDisplay) {

    locationBtn.addEventListener("click", function() {

        // Check browser support
        if (!("geolocation" in navigator)) {
            locationDisplay.textContent =
                "Geolocation isn't supported.";
            return;
        }

        // Show a message while waiting
        locationDisplay.textContent =
            "Requesting your location...";

        navigator.geolocation.getCurrentPosition(

            // Success callback
            function(position) {
                const lat =
                    position.coords.latitude.toFixed(2);

                const lon =
                    position.coords.longitude.toFixed(2);

                locationDisplay.textContent =
                    `You're near ${lat}, ${lon}`;
            },

            // Error callback
            function(error) {
                if (error.code === 1) {
                    locationDisplay.textContent =
                        "Location access was denied.";
                } else {
                    locationDisplay.textContent =
                        "Unable to retrieve your location.";
                }

                console.warn(
                    "Geolocation error:",
                    error.message
                );
            }
        );
    });

} else {
    console.warn("Location elements not found.");
}


// ==========================================
// LAB 10 - PART 4: FEATURE DETECTION
// ==========================================

// localStorage is checked by storageAvailable().
//
// Geolocation is checked using:
// "geolocation" in navigator
//
// The Lab 9 API request uses response.ok
// to handle unsuccessful server responses.


// ==========================================
// LAB 10 - PART 5: FINAL TESTING
// ==========================================

console.log("Lab 10 JavaScript loaded successfully.");
console.log("Saved likes:", LikeCounter.likes);
console.log("Saved theme:", getSavedItem("theme"));
console.log("Storage available:", canUseStorage);