//given array containing array for each win condition

for (var i=0; i < 8; i++) { //for each of 8 win conditions
	if (winCondition[i].indexOf(index) != -1) { //if the square clicked on is in a particular win condition
		for (var j=0; j < 3; j++) { //for each of the squares in that win condition
			if (board[winCondition[i][j]] = marker) { //if the value in the board for that box in the win condition is equal to the current marker
				k++; //increment k
				if (k===3) { //if k is 3
					winFunction(); //then they win
				}
			}
		}
	}
}