import {Seeker, Hider} from './Players'

export class Game {
  seeker: Seeker;
  hiders: Array<Hider>;

  constructor() {
    this.hiders = [];
  }
}
