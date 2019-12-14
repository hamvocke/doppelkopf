<template>
  <div class="quiz-trump-non-trump">
    <Card :card="cards[currentCard].card" />
    <div>
      Is this card <button class="btn-trump" @click="checkAnswer(true)">trump</button> or
      <button class="btn-non-trump" @click="checkAnswer(false)">non-trump</button>?
    </div>

    <div class="result">
      {{ lastMessage }}
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { ace, jack, queen, king, ten, suits } from "@/models/card";

export default {
  name: "QuizTrumpNonTrump",
  components: { Card },
  data() {
    return {
      cards: [
        { card: ace.of(suits.clubs), isTrump: false },
        {
          card: ace.of(suits.diamonds),
          isTrump: true,
          explanation: "Remember: All diamonds are trump"
        },
        {
          card: jack.of(suits.spades),
          isTrump: true,
          explanation: "Remember: All jacks are trump"
        },
        {
          card: jack.of(suits.hearts),
          isTrump: true,
          explanation: "Remember: All jacks are trump"
        },
        { card: ten.of(suits.clubs), isTrump: false },
        { card: king.of(suits.hearts), isTrump: false },
        { card: ace.of(suits.spades), isTrump: false },
        {
          card: queen.of(suits.spades),
          isTrump: true,
          explanation: "Remember: All queens are trump"
        },
        {
          card: king.of(suits.diamonds),
          isTrump: true,
          explanation: "Remember: All diamonds are trump"
        },
        {
          card: ten.of(suits.hearts),
          isTrump: true,
          explanation: "Remember: The ten of hearts is the highest card in the game"
        }
      ],
      currentCard: 0,
      lastMessage: ""
    };
  },
  methods: {
    checkAnswer: function(answeredTrump) {
      let card = this.cards[this.currentCard];
      if (card.isTrump == answeredTrump) {
        this.lastMessage = "Correct!";
        this.nextCard();
      } else {
        this.lastMessage = "Nah, that's not right.";
        if (card.explanation) {
          this.lastMessage += ` ${card.explanation}`;
        }
      }
    },
    nextCard: function() {
      this.currentCard = (this.currentCard + 1) % this.cards.length;
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/colors.css";

.quiz-trump-non-trump {
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  margin: 8px;
}
</style>
