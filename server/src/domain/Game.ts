import { Seeker, Hider, Player } from './Players'
import { GameEventsManager } from './GameEventsManager';

export class Game {
  private seeker: Seeker;
  private hiders: Array<Hider>;
  private eventsManager: GameEventsManager;

  private aliveHiders: Array<Hider>;

  private seekInterval: NodeJS.Timer;
  private timeoutWin: NodeJS.Timer;
  private hideInterval: NodeJS.Timer;
  private checkInterval: NodeJS.Timer;

  public constructor() {
    this.eventsManager = new GameEventsManager();
    this.hiders = [];
  }

  public addHider(player: Player) {
    const hider = new Hider(player.name, player.x, player.y);
    this.hiders.push(hider);
    this.eventsManager.subscribe('hide', hider);
  }

  public addSeeker(player) {
    const seeker = new Seeker(player.name, player.x, player.y);
    this.seeker = seeker;
    this.eventsManager.subscribe('seek', seeker);
  }

  private gameLoop() {
    this.hiders
      .filter((item) => !item.alive)
      .map((item) => this.eventsManager.unsubscribe('hide', item));

    this.aliveHiders = this.aliveHiders
      .filter((item) => item.alive);

    const alives = this.hiders.filter((item) => item.alive);
    if (alives.length === 0) {
      this.stop();
      console.log(`${this.seeker.name} wins!`);
    }
  }

  public start() {
    this.aliveHiders = this.hiders;
    this.seekInterval = setInterval(() => {
      this.eventsManager.notify('seek', this.aliveHiders);
    }, 2 * 1000);
    this.hideInterval = setInterval(() => {
      this.eventsManager.notify('hide', this.seeker);
    }, 4 * 1000);
    this.checkInterval = setInterval(() => {
      this.gameLoop();
    }, 1 * 1000);
    this.timeoutWin = setTimeout(() => {
      this.stop();
      console.log('Hiders wins!');
    }, 30 * 1000);
  }

  private stop() {
    clearTimeout(this.timeoutWin);
    clearInterval(this.seekInterval);
    clearInterval(this.hideInterval);
    clearInterval(this.checkInterval);
  }
}