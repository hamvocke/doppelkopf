import { sampleSize } from "@/models/random";
import { Card, defaultCardOrder } from "@/models/card";
import { Hand } from "@/models/hand";

export function aHandWith(numberOfCards: number, ...cards: Card[]) {
  let cardsOnHand = cards;

  cardsOnHand.push(
    ...sampleSize(defaultCardOrder, numberOfCards - cards.length)
  );

  return new Hand(cardsOnHand);
}

export function aHandWithout(numberOfCards: number, excludedCard: Card) {
  let cards = sampleSize(
    defaultCardOrder.filter(
      card =>
        !(card.suit === excludedCard.suit && card.rank === excludedCard.rank)
    ),
    numberOfCards
  );
  return new Hand(cards);
}
