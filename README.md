![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Connect 4


![connect4](https://media.git.generalassemb.ly/user/15120/files/da59cd00-fec9-11e8-9c1d-06c8821c1fb6)

Connect 4 is a game where players attempt to make a line of four pieces in a 7 x 6 grid. Players can drop their pieces into columns, so that their piece rests in the lowest available space in that column.

The winner is the first to create a line of four in any direction, including diagonally. If the board is filled before a line of 4 can be made, the game is declared a draw.

## Resources

* [How to play Connect 4 - Youtube](https://www.youtube.com/watch?v=H3FYRM9a0i4)
* [Connect Four - Wikipedia](https://en.wikipedia.org/wiki/Connect_Four)

## Game instructions

* The game is playable for two players on the same computer, taking turns to make their moves.


## Technical Flow

* Players must provide their names before the game can start through the modal box. If both names aren't provided when the 'start playing' button is clicked, an alert will pop up. 
* The first player will start the game. 
* Players can't pick a disk if the disk below hasn't been selected yet unless it's the first row. It will only move to the next player once the disk selected is valide.
* On each click, the function to check the score is called. It will check if there are 4 consecutive occurences of the current player's disk within the row, column and diagonal range of the selected disk.
* If the score is 4, the current player wins and a model box displaying the name of the winner will pop up.
* Players can choose to continue playing and resetting the game.
* The game can be reset at any point.


## Improvements

* Prettier CSS and responsive layout.
* Add the option to play against the computer.


