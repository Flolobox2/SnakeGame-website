//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;
var lives = 3;
var points = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    // Randomly spawn snake head
    snakeX = Math.floor(Math.random() * cols) * blockSize;
    snakeY = Math.floor(Math.random() * rows) * blockSize;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 125); // slowed down to 125 milliseconds
}


function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        showPopup();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Wrap around the board
    if (snakeX < 0) snakeX = board.width - blockSize;
    if (snakeX >= board.width) snakeX = 0;
    if (snakeY < 0) snakeY = board.height - blockSize;
    if (snakeY >= board.height) snakeY = 0;

    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            lives -= 1;
            if (lives <= 0) {
                gameOver = true;
                alert("You died!");
                resetGame();
            } else {
                alert("You lost a life!");
                resetSnake();
            }
        }
    }
}

function resetSnake() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
}

function resetGame() {
    resetSnake();
    gameOver = false;
    lives = 3;
    points = 0;
    document.getElementById("points").innerText = "Points: 0";
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Define an array of questions
var questions = [
    {
        question: "What does CSS stand for?",
        answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Solutions", "Code Style Syntax"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "Which property is used to change the background color of an element?",
        answers: ["color", "background-color", "background", "bgcolor"],
        correctAnswer: "background-color"
    },
    {
        question: "How can you select an element with the id ''header'' in CSS?",
        answers: ["#header", ".header", "header", "id:header"],
        correctAnswer: "#header"
    },
    {
        question: "Which CSS property is used to control the spacing between individual characters in a text?",
        answers: [" word-spacing", "text-spacing", "letter-spacing", "character-spacing"],
        correctAnswer: "letter-spacing"
    },
    {
        question: "Which CSS property is used to make text bold?",
        answers: ["bold", "font-bold", "text-weight", "font-weight"],
        correctAnswer: "font-weight"
    },
    {
        question: "What is the default value of the position property in CSS?",
        answers: ["fixed", "static", "absolute", "relative"],
        correctAnswer: "static"
    },
    {
        question: "Which CSS property is used to create rounded corners on elements?",
        answers: ["border-radius", "corner-radius", "rounded-corners", "border-style"],
        correctAnswer: "border-radius"
    },
    {
        question: "How can you make a list item have no bullets or numbers in CSS? Type the correct letter",
        answers: ["A.list-type: none", "B.list-style-type: none", "C.list-decoration: none", "D.list-bullet: none"],
        correctAnswer: "B"
    },
    {
        question: "Which CSS property is used to change the size of an image?",
        answers: ["image-size", "size", "height", "width"],
        correctAnswer: "width"
    },
    {
        question: "What is the correct CSS syntax to make all the <p> elements of a page have a red color? Type the correct letter",
        answers: ["A.p {text-color: red;}", "B.p {foreground-color: red;}", "C.p {color: red;}", "D.p {font-color: red;}"],
        correctAnswer: "C"
    },
    {
        question: "Which CSS property is used to specify the space between lines of text?",
        answers: ["line-height", "text-spacing", "spacing", "line-spacing"],
        correctAnswer: "line-heightf"
    },
    {
        question: "How can you center align text horizontally in CSS? Type the correct letter",
        answers: ["A.align: center;", "B.text-align: center;", "C.center-align: text;", "D.align-text: center;"],
        correctAnswer: "B"
    },
    {
        question: "Which CSS property is used to set the size of the font?",
        answers: ["font-size", "text-size", "font-style", "size"],
        correctAnswer: "font-size"
    },
    {
        question: "How do you group multiple selectors to apply the same styles to them? Type the correct letter",
        answers: ["A.Using plus signs between selectors", "B.Using curly braces between selectors", "C.Using commas between selectors", "D.Using semicolons between selectors"],
        correctAnswer: "C"
    },
    {
        question: "Which CSS property is used to control the appearance of text when it exceeds the width of its containing element?",
        answers: ["text-wrap", "overflow", "text-overflow", "wrap-text"],
        correctAnswer: "text-overflow"
    },
];

function showPopup() {
    if (questions.length === 0) {
        alert("No more questions available!");
        return;
    }

    // Randomly select a question from the array
    let randomIndex = Math.floor(Math.random() * questions.length);
    let selectedQuestion = questions[randomIndex];

    let answer = prompt(selectedQuestion.question + "\n\n" + selectedQuestion.answers.join("\n"));

    if (answer && answer.trim().toLowerCase() === selectedQuestion.correctAnswer.toLowerCase()) {
        alert("Correct Answer!");
        snakeBody.push([snakeX, snakeY]); // Snake becomes longer
        points++;
    } else {
        alert("Wrong Answer!");
        lives--;
        if (lives <= 0) {
            gameOver = true;
            alert("You died!");
            resetGame();
        }
    }
    
    // Remove the asked question from the array
    questions.splice(randomIndex, 1);
    
    placeFood(); // Respawn food

    // Update points display
    let pointsDisplay = document.getElementById("points");
    pointsDisplay.innerText = "Points: " + points;
}