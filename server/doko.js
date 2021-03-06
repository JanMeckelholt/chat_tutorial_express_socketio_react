const CARDS = [
    "Herz_Zehn",
    "Kreuz_Dame",
    "Pik_Dame",
    "Herz_Dame",
    "Karo_Dame",
    "Kreuz_Bube",
    "Pik_Bube",
    "Herz_Bube",
    "Karo_Bube",
    "Karo_Ass",
    "Karo_Zehn",
    "Karo_Koenig",
    "Kreuz_Ass",
    "Kreuz_Zehn",
    "Kreuz_Koenig",
    "Pik_Ass",
    "Pik_Zehn",
    "Pik_Koenig",
    "Herz_Ass",
    "Herz_Koenig"
  ];

let deck = [];
//const hand = [];



const createDeck = () => {
    deck = [];
    CARDS.forEach(card => {
        deck.push(card);
        deck.push(card);
    })
    return deck;
};

const dealToHand = (deck, numberOfCards, callback) => {
    let hand = [];
    while (deck.length >0 && hand.length<numberOfCards){
        const cardIndex = Math.floor(Math.random() * deck.length);
        const card = deck.splice(cardIndex, 1);
        hand.push(card[0]);
    }
    if (hand.length<numberOfCards){
        callback({error: 'not enough cards in deck'})
    }
   hand = sortHand(hand);
    return [hand, deck];
};

const sortHand = (hand) =>{
    // console.log('hand: '+hand);
    var len = hand.length;
    let sortedHand = hand;
    //  console.log(sortedHand[0]);
    for (var i = 0; i < len ; i++) {
        for(var j = 0 ; j < len - i - 1; j++){ 
            if (CARDS.indexOf(sortedHand[j]) > CARDS.indexOf(sortedHand[j + 1])) {
                var temp = sortedHand[j];
                sortedHand[j] = sortedHand[j+1];
                sortedHand[j + 1] = temp;
                console.log('temp' + temp)
            }
        }
    }
    // console.log('sortedHand after for: ' + sortedHand);
    // console.log(CARDS.indexOf(sortedHand[0][9]))
    // console.log(sortedHand[0])

    return sortedHand;
}


module.exports = {createDeck, dealToHand};