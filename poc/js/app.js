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
      state.user.socket.emit('server.player.position', 
        {
          lobbyId: state.lobby.current,
          player: {
            name: state.user.name,
            type: state.player.role,
            position: {
              x: position.coords.latitude, 
              y: position.coords.longitude
            }
          }
        }
      );
    });
  }, 1 * 1000)
}
