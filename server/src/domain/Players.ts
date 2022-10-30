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
  public nickname: string;
  private playerEmitter: any;
  private rooEmitter: any;

  constructor(
    name: string,
    x: number,
    y: number,
    playerEmitter: any,
    roomEmitter: any,
    nickname: string
  ) {
    super(name, x, y);
    this.alive = true;
    this.playerEmitter = playerEmitter;
    this.rooEmitter = roomEmitter;
    this.nickname = nickname;
  }

  public update(seeker: Seeker) {
    const distance = this.proximity(seeker);
    if (distance < 0.01) {
      this.alive = false;
      this.rooEmitter("client.hider.dead", { name: this.name });
    }
    this.playerEmitter(this.name, "client.hider.update", {
      seeker: distance.toFixed(3),
    });
  }

  public static fromPlayer(
    player: Player,
    nickname: string,
    rooEmitter: any,
    playerEmitter: any
  ): Hider {
    return new Hider(
      player.name,
      player.x,
      player.y,
      playerEmitter,
      rooEmitter,
      nickname
    );
  }
}

export class Seeker extends Player {
  private playerEmitter: any;
  private rooEmitter: any;

  constructor(
    name: string,
    x: number,
    y: number,
    playerEmitter: any,
    roomEmitter: any
  ) {
    super(name, x, y);
    this.playerEmitter = playerEmitter;
    this.rooEmitter = roomEmitter;
  }

  public update(hiders: Array<Hider>) {
    const message: any = [];

    for (const hider of hiders) {
      message.push({
        name: hider.name,
        nickname: hider.nickname,
        alive: hider.alive,
        distance: this.proximity(hider).toFixed(3),
      });
    }

    this.playerEmitter(this.name, "client.seeker.update", { hiders: message });
  }

  public static fromPlayer(
    player: Player,
    roomEmitter: any,
    playerEmitter: any
  ): Seeker {
    return new Seeker(
      player.name,
      player.x,
      player.y,
      playerEmitter,
      roomEmitter
    );
  }
}
