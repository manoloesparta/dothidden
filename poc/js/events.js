// Creating a lobby events
createLobbyButton.addEventListener('click', (event) => {
  hideDiv(homeDiv)
  showDiv(setUsernameHostDiv)
})

confirmUsernameHostButton.addEventListener('click', async (event) => {
  const username = usernameHostInput.value

  const gameRes = await postReq(`${BASE_URL}/game`, {host: username})
  const gameJson = await gameRes.json()
  const lobby = gameJson.code

  const usersRes = await getReq(`${BASE_URL}/game/${lobby}/players`)
  const usersJson = await usersRes.json()
  const users = usersJson.names

  state.lobby.current = lobby
  state.lobby.users = users
  state.user.username = username
  state.user.isHost = true

  state.user.socket.emit('game.join', {lobbyId: lobby, username: username})
  
  hideDiv(setUsernameHostDiv)
  showDiv(lobbyDiv)
  showDiv(startGameButton)
  lobbyId.innerHTML = lobby
  for(const name of state.lobby.users) {
    const elem = `<p>${name}</p>`
    lobbyUsers.innerHTML += elem
  }
})

// Joining a lobby events
joinLobbyButton.addEventListener('click', (event) => {
  const lobby = lobbyInput.value
  state.lobby.pending = lobby

  hideDiv(homeDiv)
  showDiv(setUsernameGuestDiv)
})

confirmUsernameGuestButton.addEventListener('click', (event) => {
  const username = usernameGuestInput.value
  const lobby = state.lobby.pending

  postReq(`${BASE_URL}/game/${lobby}/players/${username}`, {})

  state.lobby.current = lobby
  state.user.username = username
  state.user.isHost = false

  state.user.socket.emit('game.join', {lobbyId: lobby, username: username})

  hideDiv(setUsernameGuestDiv)
  showDiv(lobbyDiv)
  lobbyId.innerHTML = lobby
})

// Lobby update
state.user.socket.on('lobby.update', (event) => {
  lobbyUsers.innerHTML = ''
  for(const name of event.names) {
    const elem = `<p>${name}</p>`
    lobbyUsers.innerHTML += elem
  }
})

// Start game
startGameButton.addEventListener('click', (event) => {
  const lobby = state.lobby.current
  state.user.socket.emit('lobby.countdown', {time: 3, lobbyId: lobby})
})

// Countdown
state.user.socket.on('lobby.countdown', (event) => {
  hideDiv(lobbyDiv)
  showDiv(countdownDiv)

  const lobby = state.lobby.current
  let timeLeft = event.time

  const countdown = setInterval(() => {
    countdownTime.innerHTML = timeLeft
    timeLeft -= 1

    if(timeLeft < 0) {
      clearInterval(countdown)
      state.user.socket.emit('game.start', { lobbyId: lobby })
    } 
  }, 1 * 1000)
})

// Game events
state.user.socket.on('game.start', (event) => {
  hideDiv(countdownDiv)

  if(state.user.username === event.seeker) {
    state.player.role = 'seeker'
    showDiv(gameSeekersDiv)
  }
  
  if(state.player.role === 'hider') {
    showDiv(gameHidersDiv)
  }
})

state.user.socket.on('game.stop', (event) => {
  hideDiv(gameHidersDiv)
  hideDiv(gameSeekersDiv)  
})

state.user.socket.on('game.winner', (event) => {
  showDiv(resultDiv)
  resultMessage.innerHTML = event.message;
  setTimeout(() => {
    hideDiv(resultDiv)
    showDiv(lobbyDiv)
  }, 5 * 1000)
})

state.user.socket.on('hider.update', (event) => {
  seekerDistance.innerHTML = event.seeker;
})

state.user.socket.on('seeker.update', (event) => {
  console.log(`seeker update: ${event.hiders}`)
})

state.user.socket.on('hider.dead', (event) => {
  console.log(`hider dead: ${event.name}`)
})