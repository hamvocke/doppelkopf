import { storiesOf } from '@storybook/vue'

import Scorecard from '../components/Scorecard'
import { Game } from '../models/game'

import '../assets/css/colors.css'
import '../assets/css/normalize.css'

const gameModel = new Game()

storiesOf('Scorecard', module)
.add('empty scorecard', () => ({
  components: { Scorecard },
  data () {
    return { game: gameModel }
  },
  template: '<Scorecard :scorecard="game.scorecard" />'
}))
