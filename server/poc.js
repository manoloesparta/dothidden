const randInt = (max) => Math.floor(Math.random() * max);

class GameEventsManager {
  constructor() {
    this.listeners = {
      hide: [],
      seek: [],
    };
  }

  subscribe(event, listener) {
    this.listeners[event].push(listener);
  }

  unsubscribe(event, listener) {
    this.listeners[event] = this.listeners[event].filter((item) => item !== listener);
  }

  notify(event, data) {
    this.listeners[event].map((item) => item.update(data));
  }
}
class Player {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  proximity(hider) {
    const first = (hider.x - this.x) ** 2;
    const second = (hider.y - this.y) ** 2;
    return Math.sqrt(first + second);
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  goCrazy() {
    this.interval = setInterval(() => {
      this.moveTo(randInt(100), randInt(100));
    }, 1 * 1000);
    setTimeout(() => {
      clearInterval(this.interval);
    }, 60 * 1000);
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
}

class Seeker extends Player {
  update(hiders) {
    const encode = (index) => String.fromCharCode(index + 65);
    hiders
      .map((hider) => this.proximity(hider).toFixed(2))
      .map((distance, index) => console.log(`${this.name}: Hider${encode(index)} is ${distance}m away`));
  }
}

class Game {
  constructor(id) {
    this.id = id;
    this.eventsManager = new GameEventsManager();
    this.seeker = null;
    this.hiders = [];
    this.players = [];
  }

  addHider(player) {
    const hider = new Hider(player.name, player.x, player.y);
    hider.goCrazy();
    this.hiders.push(hider);
    this.eventsManager.subscribe('hide', hider);
  }

  addSeeker(player) {
    const seeker = new Seeker(player.name, player.x, player.y);
    seeker.goCrazy();
    this.seeker = seeker;
    this.eventsManager.subscribe('seek', seeker);
  }

  gameLoop() {
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

  start() {
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

  stop() {
    clearTimeout(this.timeoutWin);
    clearInterval(this.seekInterval);
    clearInterval(this.hideInterval);
    clearInterval(this.checkInterval);
  }

  addPlayer(fren) {
    this.players.push(fren);
  }

  assignRoles() {
    const hiderId = randInt(this.players.length);
    this.addSeeker(this.players[hiderId]);
    this.players.splice(hiderId, 1);
    this.players.forEach((fren) => this.addHider(fren));
  }
}

const partida = new Game('XJSDG');

const daw = new Player('Daw', 5, 2);
const mizael = new Player('Mizael', 6, 6);
const dagz = new Player('DAGZ', 1, 5);

partida.addPlayer(daw);
partida.addPlayer(mizael);
partida.addPlayer(dagz);
partida.assignRoles();
partida.start();
