class Player {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  proximity(player) {
    const first = (player.x - this.x) ** 2;
    const second = (player.y - this.y) ** 2;
    return Math.sqrt(first + second);
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Hider extends Player {
  constructor(name, x, y) {
    super(name, x, y);
    this.alive = true;
  }

  update(seeker) {
    const distance = this.proximity(seeker);
    if (distance < 3) {
      this.alive = false;
      console.log(`${this.name} is dead`);
    }
    console.log(`${this.name}: Seeker is ${distance.toFixed(2)}m away`);
  }

  static fromPlayer(player) {
    return Hider(player.name, player.x, player.y);
  }
}

class Seeker extends Player {
  update(hiders) {
    const encode = (index) => String.fromCharCode(index + 65);
    hiders
      .map((hider) => this.proximity(hider).toFixed(2))
      .map((distance, index) => console.log(`${this.name}: Hider${encode(index)} is ${distance}m away`));
  }

  static fromPlayer(player) {
    return Seeker(player.name, player.x, player.y);
  }
}

module.exports = { Player, Hider, Seeker };
