
 // Abdullahi Abdi — Lab 7

 // Part 2 — Variables and Data Types
 const name = "Ada";
 let labsCompleted = 6;
 let isEnrolled = false;

 labsCompleted = labsCompleted + 1;

 console.log(`${name} has completed ${labsCompleted} labs.`);

 // Part 3 — Like Button
 const likeBtn = document.querySelector("#like-btn");
 const likeCount = document.querySelector("#like-count");

 let likes = 0;

 likeBtn.addEventListener("click", function() {
     likes = likes + 1;
     likeCount.textContent = `${likes} likes`;
 });

 // Part 4 — Dark Mode
 const themeBtn = document.querySelector("#theme-btn");

 themeBtn.addEventListener("click", function() {
     document.body.classList.toggle("dark");
 });
