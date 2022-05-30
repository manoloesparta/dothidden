const BASE_URL = 'http://localhost:8080'
const WS_BASE_URL = 'ws://localhost:8080'

// Socket connection
const socket = io(WS_BASE_URL)

// Application
const app = document.getElementById('app')
const state = {
  user: {
    username: '',
    socket: socket,
    isHost: false,
    locationInterval: null, 
  },
  lobby: {
    current: '',
    pending: '',
    users: [],
  },
  player: {
    role: 'hider',
    alive: true,
    position: {
      x: 0,
      y: 0,
    }
  }
}

// Home elements
const homeDiv = document.getElementById('home')
const lobbyInput = document.getElementById('lobby-input')
const joinLobbyButton = document.getElementById('join-lobby-button')
const createLobbyButton = document.getElementById('create-lobby-button')

// Set username host
const setUsernameHostDiv = document.getElementById('host-set-username')
const usernameHostInput = document.getElementById('host-username-input')
const confirmUsernameHostButton = document.getElementById('host-confirm-username')

// Set username guest
const setUsernameGuestDiv = document.getElementById('guest-set-username')
const usernameGuestInput = document.getElementById('guest-username-input')
const confirmUsernameGuestButton = document.getElementById('guest-confirm-username')

// Lobby
const lobbyDiv = document.getElementById('lobby')
const lobbyUsers = document.getElementById('lobby-users')
const lobbyId = document.getElementById('lobby-id')
const startGameButton = document.getElementById('start-game')

// Countdown
const countdownDiv = document.getElementById('countdown')
const countdownTime = document.getElementById('countdown-time')

// Game hiders
const gameHidersDiv = document.getElementById('game-hiders')
const seekerDistance = document.getElementById('seeker-distance')
const latestEvent = document.getElementById('latest-event')

// Game seekers
const gameSeekersDiv = document.getElementById('game-seeker')
const hidersDistances = document.getElementById('hiders-distances')

// Result
const resultDiv = document.getElementById('result')
const resultMessage = document.getElementById('result-message')
