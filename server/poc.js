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

class Game {
  constructor(id) {
    this.id = id;
    this.eventsManager = new GameEventsManager();
    this.seeker = null;
    this.hiders = [];
  }

  addHider(hider) {
    this.hiders.push(hider);
    this.eventsManager.subscribe('hide', hider);
  }

  addSeeker(seeker) {
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
      this.moveTo(randInt(10), randInt(10));
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

const partida = new Game('XJSDG');

const marin = new Hider('Marin', 5, 0);
partida.addHider(marin);
const mizael = new Hider('Mizael', 7, 0);
partida.addHider(mizael);

const dagz = new Seeker('DAGZ', 0, 0);
partida.addSeeker(dagz);

marin.goCrazy();
mizael.goCrazy();
dagz.goCrazy();

partida.start();
