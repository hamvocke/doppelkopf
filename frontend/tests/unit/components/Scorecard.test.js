import Scorecard from "@/components/Scorecard";
import { Scorecard as ScorecardModel } from "@/models/scorecard";
import { Player } from "@/models/player";
import { mount } from "@vue/test-utils";

const players = [
  new Player("Player 1"),
  new Player("Player 2"),
  new Player("Player 3"),
  new Player("Player 4")
];

describe("Scorecard.vue", () => {
  it("should display scorecard", () => {
    const model = new ScorecardModel();
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: model,
        players: players
      }
    });

    expect(wrapper.find("table").exists()).toBe(true);
  });

  it("should display next round button", () => {
    const model = new ScorecardModel();
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: model,
        players: players
      }
    });

    expect(wrapper.find("button.next-round").exists()).toBe(true);
  });

  test("should emit next round event if next round button is clicked", () => {
    const model = new ScorecardModel();
    const wrapper = mount(Scorecard, {
      propsData: {
        scorecard: model,
        players: players
      }
    });
    wrapper.find("button.next-round").trigger("click");

    expect(wrapper.emitted().nextRound).toHaveLength(1);
  });
});
