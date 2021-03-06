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
        hand.push(card);
    }
    if (hand.length<numberOfCards){
        callback({error: 'not enough cards in deck'})
    }
    return [hand, deck];
};




module.exports = {createDeck, dealToHand};