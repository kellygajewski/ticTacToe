//given array containing array for each win condition

$scope.winCombos = [[0,1,2], [3,4,5],[6,7,8],[0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

for (var i=0; i < winCombos.length; i++) { //for each of 8 win conditions
	if (winCombos[i].indexOf(c) != -1) { //if the square clicked on is in a particular win condition
		for (var j=0; j < 3; j++) { //for each of the squares in that win condition
			if (cells[winCombos[i][j]] = x) { //if the value in the board for that box in the win condition is equal to the current marker
				k++; //increment k
				if (k===3) { //if k is 3
					x wins; //then they win
				}
			}
		}
	}
}