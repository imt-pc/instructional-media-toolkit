const questions = document.querySelectorAll(".faq-question");

questions.forEach(q => {
    q.addEventListener("click", () => {

        const answer = q.nextElementSibling;

        // Close all answers
        document.querySelectorAll(".faq-answer").forEach(a => {
            if (a !== answer) {
                a.style.display = "none";
            }
        });

        // Toggle the clicked answer
        answer.style.display =
            answer.style.display === "block" ? "none" : "block";

    });
});