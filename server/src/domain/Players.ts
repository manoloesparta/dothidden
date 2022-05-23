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
  alive: boolean;
  
  constructor(name: string, x: number, y: number, emitter: any) {
    super(name, x, y, emitter);
    this.alive = true;
  }

  update(seeker: Seeker) {
    const distance = this.proximity(seeker);
    if (distance < 3) {
      this.alive = false;
      this.emitter('player.dead', { name: this.name })
    }
    this.emitter('hider.update', { seekerDistance: distance.toFixed(2) })
  }
}

export class Seeker extends Player {
  update(hiders: Array<Hider>) {
    const encode = (index) => String.fromCharCode(index + 65);
    const message: Map<string, string> = new Map<string, string>();

    for(const [index, hider] of hiders.entries()) {
      const distance = this.proximity(hider).toFixed(2);
      const name = 'Hider' + encode(index)
      message.set(name, distance)
    }

   this.emitter('seeker.update', { hiderDistance: message }) 
  }
}
