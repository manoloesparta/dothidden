[setUsernameGuestDiv, 
  setUsernameHostDiv, 
  lobbyDiv, 
  countdownDiv, 
  gameHidersDiv, 
  gameSeekersDiv, 
  resultDiv,
  startGameButton].map((div) => hideDiv(div))

navigator.geolocation.getCurrentPosition(() => {}) 

const startLocationUpdates = () => {
  return setInterval(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const payload = {
        lobbyId: state.lobby.current,
        player: {
          name: state.user.username,
          type: state.player.role,
          position: {
            x: position.coords.latitude, 
            y: position.coords.longitude
          }
        }
      }
      state.user.socket.emit('server.player.position', payload);
    });
  }, 1 * 1000)
}
