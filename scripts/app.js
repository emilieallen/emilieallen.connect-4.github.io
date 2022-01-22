
function init() {
    // Variables
    const grid = document.querySelector(".grid")
    const rawCount = 6
    const colCount = 7
    
    let currentPlayer = '';

    const playerDiskIdDict = {
        'player-1': {'diskId': 'firstPlayerDisk', 'name': '', 'score': 0},
        'player-2': {'diskId': 'secondPlayerDisk', 'name': '', 'score': 0}
    };

    const cellPositionDict = {};

    // Static Functions

    const displayScore = () => {
        document.getElementById("player1score").innerText = `${playerDiskIdDict['player-1']['name']}: ${playerDiskIdDict['player-1']['score']}`;
        document.getElementById("player2score").innerText = `${playerDiskIdDict['player-2']['name']}: ${playerDiskIdDict['player-2']['score']}`;
    }

    const displayWinner = () => {
        modal.style.display = "block"; // Open Window
        document.getElementById("modal1").style.display = "none"; // Hide input names modal
        document.getElementById("modal2").style.display = "block"; // Show scores modal 
        document.getElementById("congrats").innerHTML = `&#127882 ${playerDiskIdDict[currentPlayer]['name']} Wins !! `;
    }

    const displayDraw = () => {
        modal.style.display = "block"; // Open Window
        document.getElementById("modal1").style.display = "none"; // Hide input names modal
        document.getElementById("modal2").style.display = "block"; // Show scores modal 
        document.getElementById("congrats").innerHTML = "It's a Draw!! ";
    }

    const initialisePlayer = () => {
        currentPlayer = 'player-1';
        document.getElementById("player1score").style.backgroundColor = 'rgb(55,168,199)';
        document.getElementById("player2score").style.backgroundColor = '';
    };

    const nextPlayer = () => {
        // Re-assign current player
        currentPlayer === 'player-1' ? currentPlayer = 'player-2' : currentPlayer = 'player-1';
        
        // Add background color to the current player's div in the scoring table
        if (currentPlayer === 'player-1') {
            document.getElementById("player1score").style.backgroundColor = 'rgb(55,168,199)';
            document.getElementById("player2score").style.backgroundColor = '';
        }
        if (currentPlayer === 'player-2') {
            document.getElementById("player1score").style.backgroundColor = '';
            document.getElementById("player2score").style.backgroundColor = 'rgb(230, 218, 56)';
        }

    };

    // Grid Functions

    /**
     * @name createGrid
     * @description Create a 6*7 grid with onclick event, ID & class name. Initialise first player.
     */
    function createGrid() {
        // create 6 rows
        for (let i=1; i <= rawCount; i++) {
          const elem = document.createElement("div");
          elem.className = `row ${i}`;
          grid.appendChild(elem);
        // create 7 cols
          for (let c=1; c <= colCount; c++) {
            const subElem = document.createElement("div");
            let cellId = c + 7 * (i - 1);
            subElem.id = `${cellId}`;
            subElem.className = `x${c} y${i} freeDisk`;
            subElem.addEventListener("click", handleMoleClick);
            elem.appendChild(subElem);
            
            cellPositionDict[cellId] = {'x':`x${c}`, 'y':`y${i}`};
          };
        };
        initialisePlayer();
      }

    /**
     * @name resetGrid
     * @description Reset all 3rd class names to freeDisk (change disk color to grey).
     */
    const resetGrid = () => {
        // Reset class name of all disks to 'freeDisk'
        for (let i=1; i<=42; i++){
            const cellClassList = document.getElementById(`${i}`).classList;
            if (!cellClassList.contains('freeDisk')) {
                cellClassList.remove(`${cellClassList[2]}`);
                cellClassList.add('freeDisk');
            };
        };
    }

    // Scoring functions

    /**
     * @name leftDiagonalCells
     * @description Get all class names within the left diagonal of clicked disk.
     * @returns {string} String of all class names within the min-max range.
     */
    const leftDiagonalCells = (classList) => {
        // Position of clicked disk
        let x = Number(classList[0][1]);
        let y = Number(classList[1][1]);

        // Min & Max positions of all disks within the diagional range
        let iMin = Math.max(1, x - y + 1);
        let iMax = Math.min(7, x - y + 6);

        // Get class names of all disk within the above min max range
        let result = []; 
        for (let i=iMin; i<=iMax;i++) {
            result.push(`.x${i}.y${i + y - x}`);
        }
        result = result.join(); 
        
        return document.querySelectorAll(result);
    };

    /**
     * @name rightDiagonalCells
     * @description Get all class names within the right diagonal of clicked disk.
     * @returns {string} String of all class names within the min-max range.
     */
    const rightDiagonalCells = (classList) => {
        // Position of clicked disk
        let x = Number(classList[0][1]);
        let y = Number(classList[1][1]);

        // Min & Max positions of all disks within the diagional range
        let iMin = Math.max(1, x + y - 6);
        let iMax = Math.min(7, x + y - 1);

        // Get class names of all disk within the above min max range
        let result = []; 
        for (let i=iMin; i<=iMax;i++) {
            result.push(`.x${i}.y${x + y - i}`);
        }
        result = result.join();
        
        return document.querySelectorAll(result);
    };

    /**
     * @name straightConsecutiveOccurence
     * @description Get the number of consecutive occurence of current player's disk in an array of class names.
     * Update & display score when there's a winner & reset grid.
     * @returns {number} number
     */

    function straightConsecutiveOccurence(classList) {
        function getScore(array) {
            // Get diskID of current player
            const player = playerDiskIdDict[currentPlayer]['diskId'];

            // Loop through class list of each element (disk div)
            let number = 0;
            [...array].forEach(element => {
                if (number < 4 && element.classList[2] === player) {
                    // if player's disk ID in list increase score by 1
                    number++;
                    if (number === 4) {
                        // if 4 occurences display score, winner & reset the grid
                        playerDiskIdDict[currentPlayer]['score'] ++;
                        displayScore();
                        displayWinner();
                        resetGrid();
                    };
                } else {
                    // Reset score to 0 if no occurence
                    number = 0;
                }});
            return number;
        }
        
        // Store scores (usefull for debugging & testing)
        var obj = {
            'hScore': getScore(document.getElementsByClassName(classList[1])),
            'vScore': getScore(document.getElementsByClassName(classList[0])),
            'rDiagScore': getScore(rightDiagonalCells(classList)),
            'lDiagScore': getScore(leftDiagonalCells(classList))
          };
    }

    /**
     * @name handleMoleClick
     * @description Validate player's selection, assign new class name, check score & call next player.
     * @param {e} onclick event handler
     */
    function handleMoleClick(e) {
        const classList = document.getElementById(`${e.target.id}`).classList;
        if (!classList.contains('firstPlayerDisk') || !classList.contains('secondPlayerDisk')) {
            const validateClick = () => {
                classList.remove('freeDisk');
                classList.add(playerDiskIdDict[currentPlayer]['diskId']);
                straightConsecutiveOccurence(classList);
                nextPlayer();
            }
            if (e.target.id < 36 && (document.getElementById(`${Number(e.target.id) + 7}`).classList.contains('firstPlayerDisk') || document.getElementById(`${Number(e.target.id)+7}`).classList.contains('secondPlayerDisk'))) {
                validateClick();
            } else if (e.target.id >= 36) {
                validateClick();
            };
        }
        if (document.getElementsByClassName('freeDisk').length == 0) {
            displayDraw();
            resetGrid();
        }
    }

    // User Interface Functions & Variables

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    document.getElementById("submitNames").addEventListener("click", function() {
        const fInput = document.getElementById("fname").value;
        const sInput = document.getElementById("lname").value;

        // check if both names are provided
        if (fInput && sInput) {
            playerDiskIdDict['player-1']['name'] = fInput;
            playerDiskIdDict['player-2']['name'] = sInput;
            modal.style.display = "none"; // close modal
            displayScore(); // display names & scores
        } else {
            window.alert('Please provide both names !');
        }

    });

    /**
     * @name resetInputs
     * @description Reset all player's variables (name, score) & reinitialise grid.
     */
    const resetInputs = () => {
        result = window.confirm('Are you sure you want to reset the game?');
        if (result) {
            document.getElementById("fname").value = '';
            document.getElementById("lname").value = '';
            playerDiskIdDict['player-1']['score'] = 0;
            playerDiskIdDict['player-2']['score'] = 0;
            playerDiskIdDict['player-1']['name'] = '';
            playerDiskIdDict['player-2']['name'] = '';
            modal.style.display = "block";  // Open window
            document.getElementById("modal2").style.display = "none"; // Hide score modal
            document.getElementById("modal1").style.display = "block"; // Show input names modal
            initialisePlayer();
            resetGrid();
        }
    }

    // Add event listener to both button using the resetInputs function
    document.getElementById("resetBtn").addEventListener("click", resetInputs);
    document.getElementById("reset-game").addEventListener("click", resetInputs);

    /**
     * @name continuePlaying
     * @description Reset grid but keep the current names & scores.
     */
    const continuePlaying = () => {
        document.getElementById("modal2").style.display = "none";
        modal.style.display = "none";
        initialisePlayer();
    }

    // Add event listener to button using the continuePlaying function
    document.getElementById("keep-playing").addEventListener("click", continuePlaying);

    
    // create the grid
    createGrid();
  
  }
  
  document.addEventListener('DOMContentLoaded', init)
