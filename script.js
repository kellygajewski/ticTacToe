//onclick: place x or o, check for win or can't game, if none then switch turn. if game is over, ask to play again. if yes, reset board. later, add score board

var ticTacToeApp = angular.module('ticTacToeApp', []);
ticTacToeApp.controller('TicTacToeController', function ($scope) {

	$scope.message = "Tic Tac Toe";

	//when i delete the contents of each cell, the display is distorted upon clicking a box
	$scope.rows = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];

	//true=player 1's turn, false=player 2's turn
	$scope.player1 = true;

	$scope.gameOver = false;

	$scope.gamesPlayed = 0;

	$scope.xWins = 0;

	$scope.oWins = 0;

	//place x or o 
	$scope.placeXO = function(r, c) {
		if (($scope.rows[r][c] == " ") && ($scope.gameOver === false)) {
			if ($scope.player1 === true) {
				$scope.rows[r][c] = "X";
			}
			else {
				$scope.rows[r][c] = "O";
			}
			$scope.checkWin(r,c);
		}
	};

//check for win
	$scope.checkWin = function(r,c) {
		var j = [];
		var k = [];
		var l = [];
		for (var i = 0; i < 3; i++) {
			j.push($scope.rows[r][i]);
			k.push($scope.rows[i][c]);
			l.push($scope.rows[i][i]);
			}
			j=j.join('');
			k=k.join('');
			l=l.join('');
			var m = $scope.rows[0][2] + $scope.rows[1][1] + $scope.rows[2][0];
		
		
		if ((j.indexOf("XXX") === 0) || (k.indexOf("XXX") === 0) || (l.indexOf("XXX") === 0) || (m.indexOf("XXX") === 0)) {
			$scope.message = "X wins!";
			$scope.xWins++;
			$scope.gameOver = true;
		}

		else if ((j.indexOf("OOO") === 0) || (k.indexOf("OOO") === 0) || (l.indexOf("OOO") === 0) || (l.indexOf("OOO") === 0) || (m.indexOf("OOO") === 0)) {
			$scope.message = "O wins!";
			$scope.oWins++;
			$scope.gameOver = true;

		}

		else if ((j.indexOf("XO") === -1) && (j.indexOf("OX") === -1) && (k.indexOf("XO") === -1) && (k.indexOf("OX") === -1) && (l.indexOf("XO") === -1) && (l.indexOf("OX") === -1) && (m.indexOf("XO") === -1) && (m.indexOf("OX") === -1)) {
			$scope.turnHandler();
		}
		else {
			$scope.message = "Cat's game!";
			$scope.gameOver = true;
		}
	};

	//decide whose turn-- works in JS example in console. 
	$scope.turnHandler = function() {
		if ($scope.player1 === true) {
			$scope.player1 = false;
		}
		else {
			$scope.player1 = true;
		}
	};

	$scope.reset = function() {
		$scope.gamesPlayed++;
		if ($scope.gamesPlayed % 2 === 0) {
			$scope.player1 = true;
		}
		else {
			$scope.player1 = false;
		}
		$scope.rows = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
		$scope.gameOver = false;
		$scope.message = "Tic Tac Toe";
	};


});

