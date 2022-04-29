export class Player {
  name: string;
  x: number;
  y: number;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  proximity(player: Player): number {
    const first = (player.x - this.x) ** 2;
    const second = (player.y - this.y) ** 2;
    return Math.sqrt(first + second);
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Hider extends Player {
  alive: boolean;
  
  constructor(name: string, x: number, y: number) {
    super(name, x, y);
    this.alive = true;
  }

  update(seeker: any) {
    const distance = this.proximity(seeker);
    if (distance < 3) {
      this.alive = false;
      console.log(`${this.name} is dead`);
    }
    console.log(`${this.name}: Seeker is ${distance.toFixed(2)}m away`);
  }

  static fromPlayer(player: Player): Hider {
    return new Hider(player.name, player.x, player.y);
  }
}

export class Seeker extends Player {
  update(hiders: any) {
    const encode = (index) => String.fromCharCode(index + 65);
    hiders
      .map((hider) => this.proximity(hider).toFixed(2))
      .map((distance, index) => console.log(`${this.name}: Hider${encode(index)} is ${distance}m away`));
  }

  static fromPlayer(player: Player): Seeker {
    return new Seeker(player.name, player.x, player.y);
  }
}
