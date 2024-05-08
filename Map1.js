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
    setInterval(update, 150); // slowed down to 150 milliseconds
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
        question: "What does HTML stand for?",
        answers: ["Hyper Text Markup Language", "High Tech Markup Language", "Home Tool Markup Language", "Hyperlinking Text Markup Logic"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Which tag is used to define an unordered list in HTML?",
        answers: ["<ol>", "<list>", "<ul>", "<li>"],
        correctAnswer: "<ul>"
    },
    {
        question: "Which attribute is used to define inline styles in HTML?",
        answers: ["id", "format", "class", "style"],
        correctAnswer: "style"
    },
    {
        question: "Which element is used to create a hyperlink in HTML?",
        answers: [" <link>", "<hyper>", "<a>", "<href>"],
        correctAnswer: "<a>"
    },
    {
        question: "What does the <img> tag define in HTML?",
        answers: ["Image", "Inline Frame", "Input Control", "Internal Link"],
        correctAnswer: "Image"
    },
    {
        question: "What is the correct HTML for creating a checkbox? Type the correct letter",
        answers: ["A.<checkbox>", "B.<check>", "C.<input type=''check''>", "D.<input type=''checkbox''>"],
        correctAnswer: "D"
    },
    {
        question: "Which tag is used to define a table row in HTML?",
        answers: ["<td>", "<tr>", "<table-row>", "<th>"],
        correctAnswer: "<tr>"
    },
    {
        question: "What does HTML5 introduce for embedding audio content?",
        answers: ["<audio>", "<music>", "<play>", "<sound>"],
        correctAnswer: "<audio>"
    },
    {
        question: "Which tag is used to define the header of a document or section in HTML?",
        answers: ["<header>", "<heading>", "<head>", "<title>"],
        correctAnswer: "<head>"
    },
    {
        question: "Which attribute is used to specify the URL of the page that the link goes to in HTML?",
        answers: ["url", "link", "href", "src"],
        correctAnswer: "href"
    },
    {
        question: "What is the correct HTML tag for creating a hyperlink to an email address?",
        answers: ["<mail>", "<email>", "<a>", "<mailto>"],
        correctAnswer: "<mailto>"
    },
    {
        question: "What is the correct way to comment out multiple lines of code in HTML? Type the correct letter",
        answers: ["A.<!-- This is a comment -->", "B./* This is a comment */", "C.// This is a comment", "D.<!-- This is a comment //"],
        correctAnswer: "A"
    },
    {
        question: "Which attribute is used to specify the width of a table border in HTML?",
        answers: ["border-size", "border-width", "border", "border-style"],
        correctAnswer: "border"
    },
    {
        question: "What does the <meta> tag do in HTML? Type the correct letter",
        answers: ["A.Defines a hyperlink", "B.Defines metadata about an HTML document", "C.Defines a paragraph", "D.Defines a section of navigation links"],
        correctAnswer: "B"
    },
    {
        question: "Which attribute is used to define alternative text for an image?",
        answers: ["alt", "title", "description", "image-alt"],
        correctAnswer: "alt"
    },
];

function showPopup() {
   
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

    if (points >= 10) {
        // Redirect to another HTML file
        window.location.href = "Map2.html";
    }
}