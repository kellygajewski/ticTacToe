//onclick: place x or o, check for win or can't game, if none then switch turn. if game is over, ask to play again. if yes, reset board. later, add score board

var rows = [['','',''],['','',''],['','','']];


var ticTacToeApp = angular.module('ticTacToeApp', ['firebase']);
ticTacToeApp.controller('TicTacToeController', function ($scope, $firebase) {

	var ticTacRef = new Firebase("https://kelly310tictactoe.firebaseio.com/games");//create object of type Firebase
	$scope.ticTac = $firebase(ticTacRef);

	//true=player 1's turn, false=player 2's turn
	$scope.gamesPlayed = 0;
	$scope.playerNum=null;


	var lastGame;
	// Ask for all existing game info from firebase, takes snapshot of everything in games folder, what it takes in will be gamesSnapshot
	ticTacRef.once('value', function(gamesSnapshot) {
		// get the actual games data
	  	var games = gamesSnapshot.val();//.val unwrapps angular junk, get real objects out of angulrified blob
		if(games === null) { //only valid first time running app unless wipe database
			// No games at all, so make a new game -- As if we're Areg
			lastGame = ticTacRef.push( {waiting: true} );
			$scope.playerNum = 1; //tracks  player 1
		}
		else {	// I do have at least one game out there...
		  var keys = Object.keys(games);
		  var lastGameKey = keys[ keys.length - 1 ];
		  lastGame = games[ lastGameKey ];
			console.log("This person's game: " + lastGameKey);//
		  if(lastGame.waiting) {
		  	// Currently someone is waiting 
		  	// Grab from Firebase its last game object
		  	lastGame = ticTacRef.child(lastGameKey);
		  	// Set a new game on this
		  	lastGame.set( {
		  		xWins: 0, 
		  		oWins:0, 
		  		waiting:false, 
		  		player1: false, 
		  		turnCount: 0,
		  		gameOver: false,
		  		message: "Tic Tac Toe",
		  		// won: false, 
		  		rows: [['','',''],['','',''],['','','']]} );
		  	$scope.playerNum = 2;
		  }
		  else {
		  	// Make a new game 
				lastGame = ticTacRef.push( {waiting: true} );
				$scope.playerNum = 1;
		  }
		// Attach the last game to what we're up to
	  $scope.game = $firebase(lastGame);
	}
});

	//place x or o 
	$scope.placeXO = function(r, c) {
		if ($scope.playerNum === 1) {
			$scope.player1 === true;
		}
		else if ($scope.playerNum === 2) {
			$scope.player1 === false;
		}
		if (($scope.game.rows[r][c] === "") && ($scope.game.gameOver === false) && ($scope.game.player1 === true)) {
				$scope.game.rows[r][c] = "X";
			}
		else if (($scope.game.rows[r][c] === "") && ($scope.game.player1 === false) && ($scope.game.gameOver === false)){
				$scope.game.rows[r][c] = "O";
			}
			$scope.checkWin(r,c);
		};

//check for win
	$scope.checkWin = function(r,c) {
		var j = [];
		var k = [];
		var l = [];
		for (var i = 0; i < 3; i++) {
			j.push($scope.game.rows[r][i]);
			k.push($scope.game.rows[i][c]);
			l.push($scope.game.rows[i][i]);
			}
			j=j.join('');
			k=k.join('');
			l=l.join('');
			var m = $scope.game.rows[0][2] + $scope.game.rows[1][1] + $scope.game.rows[2][0];
		
		
		if ((j.indexOf("XXX") === 0) || (k.indexOf("XXX") === 0) || (l.indexOf("XXX") === 0) || (m.indexOf("XXX") === 0)) {
			$scope.game.message = "X wins!";
			$scope.game.xWins++;
			$scope.game.gameOver = true;
		}

		else if ((j.indexOf("OOO") === 0) || (k.indexOf("OOO") === 0) || (l.indexOf("OOO") === 0) || (l.indexOf("OOO") === 0) || (m.indexOf("OOO") === 0)) {
			$scope.game.message = "O wins!";
			$scope.game.oWins++;
			$scope.game.gameOver = true;

		}

		else if (((j.indexOf("XO") == -1) && (j.indexOf("OX") == -1)) || ((k.indexOf("XO") == -1) && (k.indexOf("OX") == -1)) || ((l.indexOf("XO") == -1) && (l.indexOf("OX") == -1)) || ((m.indexOf("XO") == -1) && (m.indexOf("OX") == -1))) {
			$scope.turnHandler();
		}
		else {
			$scope.game.message = "Cat's game!";
			$scope.game.gameOver = true;
		}
		$scope.game.turnCount++;
		$scope.game.$save();
	};

	//decide whose turn
	$scope.turnHandler = function() {
		if ($scope.game.player1 === true) {
			$scope.game.player1 = false;
		}
		else {
			$scope.game.player1 = true;
		}
	};

	$scope.reset = function() {
		// $scope.gamesPlayed++;
		// if ($scope.gamesPlayed % 2 === 0) {
		// 	$scope.game.player1 = true;
		// 	$scope.playerNum = 1;
		// }
		// else {
		// 	$scope.game.player1 = false;
		// 	$scope.playerNum = 2;
		// }
		$scope.game.rows = [['','',''],['','',''],['','','']];
		$scope.game.gameOver = false;
		$scope.game.turnCount = 0;
		$scope.game.message = "Tic Tac Toe";
		$scope.game.$save();
	};


// if ($scope.playerNum === 2) {
// 	$scope.$watch('game.oWins', function(oWinsNew, oWinsOld) {
// 		if (oWinsNew > oWinsOld) {
// 			$scope.game.message = "O wins!";

// 		}
// 	});
// }
// else {
// 	$scope.$watch('game.xWins', function(xWinsNew, xWinsOld) {
// 		if (xWinsNew > xWinsOld) {
// 			$scope.game.message = "X wins!";
// 		}
// 	});
// }


});



