<template>
  <div class="quiz-trump-non-trump">
    <h2>Trumpf oder Fehl?</h2>
    <transition name="card">
      <Card v-if="showCard" :card="cards[currentCard].card" />
    </transition>
    <div class="text">
      <div class="question">Diese Karte ist&hellip;</div>
      <button class="button trump" @click="checkAnswer(true)">
        Trumpf
      </button>
      <button class="button non-trump" @click="checkAnswer(false)">
        Fehl
      </button>
    </div>

    <transition name="message">
      <div v-if="lastMessage" class="result">
        {{ lastMessage }}
      </div>
    </transition>
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
          explanation: "Remember: The ten of hearts is the highest card in the game and is always trump"
        }
      ],
      currentCard: 0,
      lastMessage: "",
      showCard: true
    };
  },
  methods: {
    checkAnswer: function(answeredTrump) {
      let card = this.cards[this.currentCard];
      if (card.isTrump == answeredTrump) {
        // hack: need to hide and show on next tick to make transition work
        this.showCard = false;
        this.showMessage("🎉 Correct!");

        this.nextCard();
        this.$nextTick(() => {
          this.showCard = true;
        });
      } else {
        let message = "Nah, that's not right.";
        if (card.explanation) {
          message += ` ${card.explanation}`;
        }
        this.showMessage(message);
      }
    },
    showMessage: function(message) {
      this.lastMessage = message;

      setTimeout(() => {
        this.lastMessage = undefined;
      }, 4000);
    },
    nextCard: function() {
      this.currentCard = (this.currentCard + 1) % this.cards.length;
    }
  }
};
</script>

<style scoped>
@import "../../assets/css/colors.css";
@import "../../assets/css/button.css";

.quiz-trump-non-trump {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-enter-active {
  transition: all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card-enter {
  opacity: 0;
  transform: scale(2, 2);
}

.message-enter-active,
.message-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.message-leave-to,
.message-leave {
  opacity: 0;
}

.message-enter {
  opacity: 0;
  transform: scale(0.5, 0.5);
}

.text {
  margin-top: 32px;
}

.result {
  margin-top: 16px;
  font-size: 1.4em;
}

div {
  margin: 8px;
}
</style>
