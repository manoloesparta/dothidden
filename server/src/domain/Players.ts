export class Player {
  public name: string;
  public x: number;
  public y: number;
  public emitter: any;

  constructor(name: string, x: number, y: number, emitter: any) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.emitter = emitter;
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
  
  constructor(name: string, x: number, y: number, emitter: any) {
    super(name, x, y, emitter);
    this.alive = true;
  }

  public update(seeker: Seeker) {
    const distance = this.proximity(seeker);
    if (distance < 0) {
      this.alive = false;
      this.emitter('hider.dead', { name: this.name })
    }
    this.emitter('hider.update', { seekerDistance: distance.toFixed(2) })
  }

  public static fromPlayer(player: Player): Hider {
    return new Hider(
      player.name,
      player.x,
      player.y,
      player.emitter
    );
  }
}

export class Seeker extends Player {
  public update(hiders: Array<Hider>) {
    const encode = (index) => String.fromCharCode(index + 65);
    const message: Map<string, string> = new Map<string, string>();

    for(const [index, hider] of hiders.entries()) {
      const distance = this.proximity(hider).toFixed(2);
      const name = 'Hider' + encode(index)
      message.set(name, distance)
    }

    this.emitter('seeker.update', { hiderDistance: Object.fromEntries(message) }) 
  }

  public static fromPlayer(player: Player): Seeker {
    return new Seeker(
      player.name, 
      player.x, 
      player.y, 
      player.emitter
    );
  }
}
