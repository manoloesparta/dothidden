<template>
  <main class="main-menu d-flex flex-column justify-content-center">
    <form v-on:submit.prevent class="m-5 text-center">
      <img class="mb-4" src="../assets/dothidden.svg" alt="" width="198" />
      <h1 class="h3 mb-3 fw-normal">DotHidden</h1>

      <div class="form-floating">
        <input
          type="text"
          class="mb-2 form-control text-center"
          id="lobbyIdInput"
          placeholder="Lobby ID"
          v-model="lobby_id"
        />
        <label for="lobbyIdInput">Lobby ID</label>
      </div>

      <button @click="joinLobby" class="w-100 btn btn-primary">Join</button>

      <div class="checkbox mb-3">
        <hr />
      </div>

      <button @click="createLobby" class="w-100 btn btn-primary">
        Create Lobby
      </button>

      <p class="mt-5 mb-3 text-muted">© 2021</p>
    </form>
  </main>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      lobby_id: "",
    };
  },
  methods: {
    joinLobby() {
      console.log(`Joining lobby #${this.lobby_id}...`);
    },
    createLobby() {
      console.log(`Creating lobby...`);
    },
  },
};
</script>
