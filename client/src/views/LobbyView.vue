<template>
  <main class="lobby mt-5 pt-2">
    <nav class="navbar navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand">DotHidden #{{ lobby_id }}</a>
        <div class="d-flex">
          <button
            :disabled="isBusy"
            @click="closeLobby"
            type="button"
            class="btn btn-danger"
          >
            {{ isHost ? "Close" : "Leave" }}
          </button>
        </div>
      </div>
    </nav>

    <div class="card w-100" style="width: 18rem">
      <div class="card-header">{{ user }}</div>

      <ul class="list-group list-group-flush">
        <li v-for="i in 100" :key="i" class="list-group-item d-flex">
          <span class="my-auto">Username</span>
          <div v-if="isHost" class="ms-auto">
            <button
              :disabled="isBusy"
              @click="kickUser(i)"
              type="button"
              class="btn btn-sm btn-danger"
            >
              KICK
            </button>
          </div>
        </li>
      </ul>
    </div>

    <button
      :disabled="isBusy"
      @click="startGame"
      type="button"
      class="btn btn-secondary btn-lg my-2 position-fixed bottom-0 start-50 translate-middle-x"
    >
      Start Game
    </button>

    <UsernameModal :isHost="isHost" :lobbyID="lobby_id" @entered="joinLobby" />
  </main>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

import UsernameModal from "../components/UsernameModal";

export default {
  name: "LobbyView",
  components: { UsernameModal },
  props: {
    isHost: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      error: "",
      starting_game: false,
      kicking_user: false,

      usernameModal: undefined,

      lobby_id: this.$route.params.lobby_id || "",
      user: "",
      users: [],
    };
  },
  mounted() {
    this.usernameModal = new bootstrap.Modal(
      document.getElementById("UsernameModal")
    );

    // console.log(this.$route);
    // console.log(this.$route.params.lobby_id);

    if (this.user.length == 0) {
      if (this.lobby_id.length !== 5 && !this.isHost) {
        this.$router.push("/");
      } else {
        this.usernameModal.show();
      }
    }
  },
  computed: {
    isBusy() {
      return this.starting_game || this.kicking_user;
    },
  },
  methods: {
    async joinLobby(username) {
      if (this.lobby_id.length === 5 && !this.isHost) {
        console.log(`Joining lobby #${this.lobby_id} as ${username}...`);

        let response = await fetch(
          `http://localhost:8080/game/${this.lobby_id}/players/${username}`,
          {
            method: "POST",
          }
        );

        if (response.status !== 200) {
          return;
        }
      } else if (this.lobby_id.length === 0 && this.isHost) {
        // TODO Create Lobby with Host Username
        console.log(`Creating lobby as ${username}...`);

        let response = await fetch("http://localhost:8080/game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: username,
          }),
        });

        if (response.status === 200) {
          let json_response = await response.json();
          this.lobby_id = json_response.code || "";
        } else {
          console.log("Error: Couldn't create session!");
          return;
        }
      }

      this.user = username;
      this.usernameModal.hide();

      this.$router.push({
        path: `/lobby/${this.lobby_id}`,
      });
    },
    closeLobby() {
      if (this.isHost) {
        console.log(`Closing lobby #${this.lobby_id}...`);
      } else {
        console.log(`Leaving lobby #${this.lobby_id}...`);
      }

      this.$router.push(`/`);
    },
    kickUser(user) {
      if (!this.isHost) return;

      console.log(`Kicking user ${user} from lobby #${this.lobby_id}...`);

      this.kicking_user = true;

      this.error = "Couldn't kick user!";
      this.kicking_user = false;
    },
    startGame() {
      if (!this.isHost) return;

      console.log(`Starting game for lobby #${this.lobby_id}...`);

      this.starting_game = true;

      this.error = "Couldn't start game!";
      this.starting_game = false;
    },
  },
};
</script>
