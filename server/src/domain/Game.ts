import { Seeker, Hider, Player } from "./Players";
import { GameEventsManager } from "./GameEventsManager";

export class Game {
  public seeker: Seeker;
  public hiders: Array<Hider>;
  private gameDuration: number;
  private eventsManager: GameEventsManager;
  private roomEmitter: any;
  private playerEmitter: any;

  private seekInterval: NodeJS.Timer;
  private timeoutWin: NodeJS.Timer;
  private hideInterval: NodeJS.Timer;
  private checkInterval: NodeJS.Timer;

  public constructor(
    rooEmitter: any,
    playerEmitter: any,
    gameDuration: number = 60
  ) {
    this.roomEmitter = rooEmitter;
    this.playerEmitter = playerEmitter;
    this.eventsManager = new GameEventsManager();
    this.hiders = [];
    this.gameDuration = gameDuration;
  }

  public addHider(player: Player) {
    const encode = (index) => String.fromCharCode(index + 65);
    const nick = `Hider${encode(this.hiders.length)}`;
    const hider: Hider = Hider.fromPlayer(
      player,
      nick,
      this.roomEmitter,
      this.playerEmitter
    );
    this.hiders.push(hider);
    this.eventsManager.subscribe("hide", hider);
  }

  public addSeeker(player: Player) {
    const seeker: Seeker = Seeker.fromPlayer(
      player,
      this.roomEmitter,
      this.playerEmitter
    );
    this.seeker = seeker;
    this.eventsManager.subscribe("seek", seeker);
  }

  private gameLoop() {
    const alives = this.hiders.filter((item) => item.alive);
    if (alives.length === 0) {
      this.stop();
      this.roomEmitter("client.game.winner", { winner: "seeker" });
    }
  }

  public start() {
    this.eventsManager.notify("seek", this.hiders);
    this.eventsManager.notify("hide", this.seeker);

    this.seekInterval = setInterval(() => {
      this.eventsManager.notify("seek", this.hiders);
    }, 1 * 1000);
    this.hideInterval = setInterval(() => {
      this.eventsManager.notify("hide", this.seeker);
    }, 3 * 1000);
    this.checkInterval = setInterval(() => {
      this.gameLoop();
    }, 0.5 * 1000);
    this.timeoutWin = setTimeout(() => {
      this.stop();
      this.roomEmitter("client.game.winner", { winner: "hider" });
    }, this.gameDuration * 1000);

    this.roomEmitter("client.game.start", {
      seeker: this.seeker.name,
      duration: this.gameDuration,
    });
  }

  public stop() {
    clearInterval(this.seekInterval);
    clearInterval(this.hideInterval);
    clearInterval(this.checkInterval);
    clearTimeout(this.timeoutWin);
    this.roomEmitter("client.game.stop", { status: "stop" });
  }
}
