import { Seeker, Hider, Player } from './Players'
import { GameEventsManager } from './GameEventsManager';

export class Game {
  public seeker: Seeker;
  public hiders: Array<Hider>;
  private eventsManager: GameEventsManager;
  private aliveHiders: Array<Hider>;
  private emitter: any;

  private seekInterval: NodeJS.Timer;
  private timeoutWin: NodeJS.Timer;
  private hideInterval: NodeJS.Timer;
  private checkInterval: NodeJS.Timer;

  public constructor() {
    this.eventsManager = new GameEventsManager();
    this.hiders = [];
  }

  public addHider(player: Player) {
    if(!this.emitter) {
      this.emitter = player.emitter;
    }
    const hider: Hider = Hider.fromPlayer(player);
    this.hiders.push(hider);
    this.eventsManager.subscribe('hide', hider);
  }

  public addSeeker(player: Player) {
    if(!this.emitter) {
      this.emitter = player.emitter;
    }
    const seeker: Seeker = Seeker.fromPlayer(player);
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
      this.emitter('game.winner', { winner: this.seeker.name })
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
      this.emitter('game.winner', { winner: this.aliveHiders.map((hider) => hider.name) });
    }, 30 * 1000);
    this.emitter('game.start', { seeker: this.seeker.name });
  }

  public stop() {
    clearInterval(this.seekInterval);
    clearInterval(this.hideInterval);
    clearInterval(this.checkInterval);
    clearTimeout(this.timeoutWin);
    this.emitter('game.stop', { status: 'stop' });
  }
}
