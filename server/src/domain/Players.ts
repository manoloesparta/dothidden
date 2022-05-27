import { randInt } from '../utils/utils';

export class Player {
  public name: string;
  public x: number;
  public y: number;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  protected proximity(player: Player): number {
    const first = (player.x - this.x) ** 2;
    const second = (player.y - this.y) ** 2;
    return Math.sqrt(first + second);
  }

  public moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Hider extends Player {
  public alive: boolean;
  private playerEmitter: any;
  private rooEmitter: any;
  
  constructor(name: string, x: number, y: number, playerEmitter: any, roomEmitter: any) {
    super(name, x, y);
    this.alive = true;
    this.playerEmitter = playerEmitter;
    this.rooEmitter = roomEmitter;
  }

  public update(seeker: Seeker) {
    const distance = randInt(0, 10);
    if (distance < 3) {
      this.alive = false;
      this.rooEmitter('hider.dead', { name: this.name })
    }
    this.playerEmitter(this.name, 'hider.update', { seeker: distance.toFixed(2) })
  }

  public static fromPlayer(player: Player, rooEmitter: any, playerEmitter: any): Hider {
    return new Hider(
      player.name,
      player.x,
      player.y,
      playerEmitter,
      rooEmitter
    );
  }
}

export class Seeker extends Player {
  private playerEmitter: any;
  private rooEmitter: any;

  constructor(name: string, x: number, y: number, playerEmitter: any, roomEmitter: any) {
    super(name, x, y);
    this.playerEmitter = playerEmitter;
    this.rooEmitter = roomEmitter;
  }

  public update(hiders: Array<Hider>) {
    const encode = (index) => String.fromCharCode(index + 65);
    const message: Map<string, string> = new Map<string, string>();

    for(const [index, hider] of hiders.entries()) {
      const distance = this.proximity(hider).toFixed(2);
      const name = 'Hider' + encode(index)
      message.set(name, randInt(10,20))
    }

    this.playerEmitter(this.name, 'seeker.update', { hider: Object.fromEntries(message) }) 
  }

  public static fromPlayer(player: Player, roomEmitter: any, playerEmitter: any): Seeker {
    return new Seeker(
      player.name, 
      player.x, 
      player.y,
      playerEmitter,
      roomEmitter,
    );
  }
}
