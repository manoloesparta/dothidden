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

      <button
        :disabled="!isLobbyValid || isBusy"
        @click="joinLobby"
        class="w-100 btn btn-primary"
      >
        Join
      </button>

      <div class="checkbox mb-3">
        <hr />
      </div>

      <button
        :disabled="isBusy"
        @click="createLobby"
        class="w-100 btn btn-primary"
      >
        Create Lobby
      </button>

      <div
        v-if="error.length > 0"
        class="m-2 p-1 alert alert-danger"
        role="alert"
      >
        {{ error }}
      </div>

      <p class="mt-5 mb-3 text-muted">© 2021</p>
    </form>
  </main>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      error: "",
      lobby_id: "",
      joining_lobby: false,
      creating_lobby: false,
    };
  },
  computed: {
    isBusy() {
      return this.joining_lobby || this.creating_lobby;
    },
    isLobbyValid() {
      return this.lobby_id.length == 6;
    },
  },
  methods: {
    joinLobby() {
      if (this.isBusy) return;

      console.log(`Joining lobby #${this.lobby_id}...`);

      this.joining_lobby = true;

      this.error = "Lobby ID doesn't exist!";
      this.joining_lobby = false;
    },
    createLobby() {
      if (this.isBusy) return;

      console.log(`Creating lobby...`);

      this.creating_lobby = true;

      this.error = "Couldn't create lobby!";
      this.creating_lobby = false;
    },
  },
};
</script>
