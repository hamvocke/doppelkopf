import Scorecard from "@/components/Scorecard";
import { Scorecard as ScorecardModel } from "@/models/scorecard";
import { Player } from "@/models/player";
import { Score } from "@/models/score";
import { mount } from "@vue/test-utils";

let players;

const scorecard = new ScorecardModel();

function stubScore() {
  players[0].points = () => 120;
  players[1].points = () => 120;
  const stubbedScore = new Score(players);
  stubbedScore.winner = () => [players[0], players[2]];
  return stubbedScore;
}

beforeEach(() => {
  players = [
    new Player("Player 1", true),
    new Player("Player 2"),
    new Player("Player 3"),
    new Player("Player 4")
  ];
});

describe("Scorecard.vue", () => {
  it("should display scorecard", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: stubScore()
      }
    });

    expect(wrapper.find("table").exists()).toBe(true);
  });

  it("should display next round button", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: stubScore()
      }
    });

    expect(wrapper.find("button.next-round").exists()).toBe(true);
  });

  test("should emit next round event if next round button is clicked", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: stubScore()
      }
    });
    wrapper.find("button.next-round").trigger("click");

    expect(wrapper.emitted().nextRound).toHaveLength(1);
  });

  it("should show 'you won' message when player won", () => {
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: scorecard,
        players: players,
        currentScore: stubScore()
      }
    });

    expect(wrapper.find("h1.message").text()).toContain("Yay, you win!");
  });
});
