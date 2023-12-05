export default class GameState {
  static from(object) {
    // TODO: create object
    const {team,} = object;
    return new GameState(team);
  }

  constructor(team) {
    this.team = team;
    this.selectedHero = null;
    this.heroAllowedSteps = null;
  }
}
