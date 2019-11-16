export class Feature {
  constructor(name, enabled = false) {
    this.name = name;
    this.enabled = enabled;
  }
}

export const Features = {
  a: new Feature("a", false),
  b: new Feature("b", false),
};
