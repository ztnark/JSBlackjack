function Card(value,suit){
	this.value = value;
	this.suit = suit;
}

function Player(firstName){
	this.firstName = firstName;
	this.cards = []
	this.animate = function(card){
		var image = convertCard(card)
		$('.player-cards').append("<li><img src='../blackjack/assets/Decks/trad/"+image+"'></li>")	
	}
}

function Dealer(){
	this.cards = []
	this.animate = function(card){
		var image = convertCard(card)
		$('.dealer-cards').append("<li><img src='../blackjack/assets/Decks/trad/"+image+"'></li>")	
	}
}

function newGame(){
	deck = [];
	player = new Player("Jeff");
	dealer = new Dealer();
	for(var i=1;i<14;i++){
		deck.push(new Card(i,'c'));
		deck.push(new Card(i,'d'));
		deck.push(new Card(i,'h'));
		deck.push(new Card(i,'s'));
	}
	$('.player-cards li').remove();
	$('.dealer-cards li').remove();
}

function convertCard(card){
	switch(card.value)
	{
		case 1:
		x="a";
		break;
		case 10:
		x="t";
		break;
		case 11:
		x="j";
		break;
		case 12:
		x="q";
		break;
		case 13:
		x="k";
		break;
		default:
		x=card.value;
	}
	return x+card.suit+".png"
}





function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function deal(){
	return shuffle(deck).pop();
}

function total(cards){
	var total = 0
	for(i=0;i<cards.length;i++){
		total += cards[i].value > 10 ? 10 : cards[i].value;
	}
	return total;
}

function dealersTurn(){
	var sum = total(dealer.cards);
	dealer.animate(dealer.cards[1])
	console.log("Dealer shows " + sum)
	while(sum < 17 && sum < 22){
		var newCard = deal()
		dealer.cards.push(newCard);
		dealer.animate(newCard);
		sum = total(dealer.cards);
		console.log("Dealer hits for a total of "+ sum)
	}
	if(sum > 21){
		console.log("Dealer busts");
	}
	declareWinner()
}

function declareWinner(){
	if(total(player.cards) > total(dealer.cards) && total(player.cards) < 22 || total(dealer.cards) > 21 && total(player.cards) < 22){
		console.log(player.firstName+ " wins!")
	}
	else{
		console.log("Player loses")
	}
	$('.player-actions').append('<button class="new-game">New Game</button>');
}

function play(player){
	player.cards.push(deal());
	player.cards.push(deal());
	dealer.cards.push(deal());
	dealer.cards.push(deal());
	for(i=0;i < player.cards.length;i++){
		player.animate(player.cards[i])
	};
	var upCard = dealer.cards[0].value > 10 ? 10 : dealer.cards[0].value
	dealer.animate(dealer.cards[0])
	console.log("Player has "+total(player.cards))
	console.log("Dealer is showing a " + upCard )
}





$(document).on('ready',function(){


newGame();
play(player);

$('.hit').on('click',function(event){
	event.preventDefault();
	var newCard=deal();
	player.cards.push(newCard);
	player.animate(newCard);
	var sum = total(player.cards);
	console.log("Player has "+ sum);
	if(sum > 21){
		console.log("Player busts");
		$('.stick').trigger('click')
	}
})

$('.stick').on('click',function(event){
	event.preventDefault();
	dealersTurn();
})

$('.player-actions').on('click','.new-game',function(){
	newGame();
	play(player);
	$('.new-game').hide();
});


})








