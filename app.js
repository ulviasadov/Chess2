const board = document.querySelector("#board");
let playerDisplay = document.querySelector(".player");
let infoDisplay = document.querySelector(".info-display");
const width = 8;
let playerGo = "white";
playerDisplay.textContent = playerGo;



const startPieces = [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
];

const createBoard = () => {
    startPieces.forEach((piece, i) => {
        const square = document.createElement("div");
        const row = Math.floor((63 - i) / 8) + 1;

        square.classList.add("square");
        square.id = i;
        reverseIds()
        square.innerHTML = piece;
        square.firstChild?.setAttribute("draggable", true);
        square.firstChild?.classList.add("draggable")
        board.append(square)

        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? "lightblue" : "darkblue");
        } else {
            square.classList.add(i % 2 === 0 ? "darkblue" : "lightblue")
        }


        if (i <= 15) {
            square.firstChild.firstChild.classList.add("black")
        }

        if (i >= 48) {
            square.firstChild.firstChild.classList.add("white")
        }
    })
};

createBoard();


const allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener("dragstart", dragStart);
    square.addEventListener("dragover", dragOver);
    square.addEventListener("drop", dragDrop);
})

let startPositionId;
let draggedElement;

function dragStart(e) {
    startPositionId = e.target.parentNode.getAttribute("id");
    draggedElement = e.target
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);
    const taken = e.target.classList.contains("piece");
    const valid = checkIfValid(e.target);
    const opponentGo = playerGo === "white" ? "black" : "white";
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkForWin()
            changePlayer()
            console.log("taken by opponent works")
            return
        }

        if (taken && !takenByOpponent) {
            infoDisplay.style.display = "block";
            infoDisplay.style.opacity = "1";
            infoDisplay.textContent = "222You cannot go here!";
            setTimeout(() => infoDisplay.textContent = "", 2000);
            setTimeout(() => infoDisplay.style.opacity = "0", 1500);
            setTimeout(() => infoDisplay.style.display = "none", 2000);
            return
        }

        if (valid) {
            e.target.append(draggedElement);
            checkForWin()
            changePlayer();
            return
        }

    }

}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute("id")) || Number(target.parentNode.getAttribute("id"));
    const startId = Number(startPositionId);
    const piece = draggedElement.id;

    console.log("startId", startId)
    console.log("targetId", targetId)
    console.log("piece", piece)

    switch (piece) {
        case "pawn":
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
            if (starterRow.includes(startId) && startId + width * 2 === targetId || startId + width === targetId && document.querySelector(`[id = "${startId + width}"]`).firstChild === null || startId + width - 1 === targetId && document.querySelector(`[id = "${startId + width - 1}"]`).firstChild || startId + width + 1 === targetId && document.querySelector(`[id = "${startId + width + 1}"]`).firstChild) {
                console.log("works")
                return true;
            } else {
                infoDisplay.style.display = "block";
                infoDisplay.style.opacity = "1";
                infoDisplay.textContent = "You cannot go here!";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                setTimeout(() => infoDisplay.style.opacity = "0", 1500);
                setTimeout(() => infoDisplay.style.display = "none", 2000);
            }
            break;
        case "knight":
            if (startId + width * 2 - 1 === targetId || startId + width * 2 + 1 === targetId || startId + width - 2 === targetId || startId + width + 2 === targetId ||
                startId - width * 2 - 1 === targetId || startId - width * 2 + 1 === targetId || startId - width - 2 === targetId || startId - width + 2 === targetId
            ) {
                return true
            } else {
                infoDisplay.style.display = "block";
                infoDisplay.style.opacity = "1";
                infoDisplay.textContent = "You cannot go here!";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                setTimeout(() => infoDisplay.style.opacity = "0", 1500);
                setTimeout(() => infoDisplay.style.display = "none", 2000);
            }
            break;
        case "bishop":
            if (startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 6 + 6}"]`).firstChild ||

                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 6 - 6}"]`).firstChild ||

                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 6 + 6}"]`).firstChild ||

                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 6 - 6}"]`).firstChild
            ) {
                return true
            } else {
                infoDisplay.style.display = "block";
                infoDisplay.style.opacity = "1";
                infoDisplay.textContent = "You cannot go here!";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                setTimeout(() => infoDisplay.style.opacity = "0", 1500);
                setTimeout(() => infoDisplay.style.display = "none", 2000);
            }
            break;
        case "rook":
            if (
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6}"]`).firstChild ||

                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6}"]`).firstChild ||

                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild && !document.querySelector(`[id="${startId + 6}"]`).firstChild ||

                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild && !document.querySelector(`[id="${startId - 6}"]`).firstChild
            ) {
                return true
            } else {
                infoDisplay.style.display = "block";
                infoDisplay.style.opacity = "1";
                infoDisplay.textContent = "You cannot go here!";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                setTimeout(() => infoDisplay.style.opacity = "0", 1500);
                setTimeout(() => infoDisplay.style.display = "none", 2000);
            }
            break;
        case "queen":
            if (
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 6 + 6}"]`).firstChild ||

                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 6 - 6}"]`).firstChild ||

                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[id = "${startId - width * 6 + 6}"]`).firstChild ||

                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[id = "${startId + width * 6 - 6}"]`).firstChild ||

                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[id="${startId + width}"]`).firstChild && !document.querySelector(`[id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[id="${startId + width * 6}"]`).firstChild ||

                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[id="${startId - width}"]`).firstChild && !document.querySelector(`[id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[id="${startId - width * 6}"]`).firstChild ||

                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[id="${startId + 1}"]`).firstChild && !document.querySelector(`[id="${startId + 2}"]`).firstChild && !document.querySelector(`[id="${startId + 3}"]`).firstChild && !document.querySelector(`[id="${startId + 4}"]`).firstChild && !document.querySelector(`[id="${startId + 5}"]`).firstChild && !document.querySelector(`[id="${startId + 6}"]`).firstChild ||

                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[id="${startId - 1}"]`).firstChild && !document.querySelector(`[id="${startId - 2}"]`).firstChild && !document.querySelector(`[id="${startId - 3}"]`).firstChild && !document.querySelector(`[id="${startId - 4}"]`).firstChild && !document.querySelector(`[id="${startId - 5}"]`).firstChild && !document.querySelector(`[id="${startId - 6}"]`).firstChild
            ) {
                return true
            } else {
                infoDisplay.style.display = "block";
                infoDisplay.style.opacity = "1";
                infoDisplay.textContent = "You cannot go here!";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                setTimeout(() => infoDisplay.style.opacity = "0", 1500);
                setTimeout(() => infoDisplay.style.display = "none", 2000);
            }
            break;
        case "king":
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId + width + 1 === targetId ||
                startId + width - 1 === targetId ||
                startId - width === targetId ||
                startId - width + 1 === targetId ||
                startId - width - 1 === targetId
            ) {
                return true
            } else {
                infoDisplay.style.display = "block";
                infoDisplay.style.opacity = "1";
                infoDisplay.textContent = "You cannot go here!";
                setTimeout(() => infoDisplay.textContent = "", 2000);
                setTimeout(() => infoDisplay.style.opacity = "0", 1500);
                setTimeout(() => infoDisplay.style.display = "none", 2000);
            };
    }
}

function checkForWin() {
    const kings = Array.from(document.querySelectorAll("#king"))
    if (!kings.some(king => king.firstChild.classList.contains("white"))) {
        infoDisplay.style.display = "block";
        infoDisplay.style.opacity = "1";
        infoDisplay.textContent = "Black wins!";
        const allSquares = document.querySelectorAll(".square")
        allSquares.forEach(square => square.firstChild?.setAttribute("draggable", false))
    }
    if (!kings.some(king => king.firstChild.classList.contains("black"))) {
        infoDisplay.style.display = "block";
        infoDisplay.style.opacity = "1";
        infoDisplay.textContent = "White wins!";
        const allSquares = document.querySelectorAll(".square")
        allSquares.forEach(square => square.firstChild?.setAttribute("draggable", false))
    }
}    

function changePlayer() {
    // playerGo === "white" ? playerGo = "black" : playerGo = "white";
    if (playerGo === "white") {
        reverteIds();
        playerGo = "black";
    }
    else {
        reverseIds();
        playerGo = "white";
    }
    playerDisplay.textContent = playerGo;
}

function reverseIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => {
        square.setAttribute("id", (width * width - 1) - i);
    });
};

function reverteIds() {
    const allSquares = document.querySelectorAll(".square");
    allSquares.forEach((square, i) => {
        square.setAttribute("id", i)
    });
};