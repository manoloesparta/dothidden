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
            {{ is_host ? "Close" : "Leave" }}
          </button>
        </div>
      </div>
    </nav>

    <div class="card w-100" style="width: 18rem">
      <div class="card-header">{{ user }}</div>

      <ul class="list-group list-group-flush">
        <li
          v-for="username of usernames"
          :key="username"
          class="list-group-item d-flex"
        >
          <div>
            <span class="my-auto">{{ username }}</span>
            <div v-if="is_host" class="ms-auto">
              <button
                :disabled="isBusy"
                @click="kickUser(username)"
                type="button"
                class="btn btn-sm btn-danger"
              >
                KICK
              </button>
            </div>
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

    <UsernameModal
      :is_host="is_host"
      :lobby_id="lobby_id"
      @entered="joinLobby"
    />
  </main>
</template>

<script>
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
import io from "socket.io-client";

import UsernameModal from "../components/UsernameModal";

export default {
  name: "LobbyView",
  components: { UsernameModal },
  props: {
    is_host: {
      type: Boolean,
      default: false,
    },
    lobby_id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      socket: undefined,

      error: "",
      starting_game: false,
      kicking_user: false,

      usernameModal: undefined,

      user: "",
      usernames: [],
    };
  },
  computed: {
    isBusy() {
      return this.starting_game || this.kicking_user;
    },
  },
  mounted() {
    this.usernameModal = new bootstrap.Modal(
      document.getElementById("UsernameModal")
    );

    if (this.user.length == 0) {
      if (this.lobby_id.length !== 5 && !this.is_host) {
        this.$router.push("/");
      } else {
        this.usernameModal.show();
      }
    }

    this.socket = io("ws://localhost:8080");

    this.socket.on("lobby.update", (e) => {
      this.usernames = (e.names || []).filter(
        (username) => username !== this.user
      );
    });
  },
  methods: {
    async joinLobby(username) {
      this.user = username;

      let lobby_id = this.lobby_id;

      if (this.lobby_id.length === 5 && !this.is_host) {
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
      } else if (this.lobby_id.length === 0 && this.is_host) {
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
          lobby_id = json_response.code || "";
          if (lobby_id.length === 5)
            this.$router.push({ params: { lobby_id: lobby_id } });
        } else {
          console.log("Error: Couldn't create session!");
          return;
        }
      }

      this.usernameModal.hide();
    },
    closeLobby() {
      if (this.is_host) {
        console.log(`Closing lobby #${this.lobby_id}...`);
      } else {
        console.log(`Leaving lobby #${this.lobby_id}...`);
      }

      this.$router.push(`/`);
    },
    kickUser(user) {
      if (!this.is_host) return;

      console.log(`Kicking user ${user} from lobby #${this.lobby_id}...`);

      this.kicking_user = true;

      this.error = "Couldn't kick user!";
      this.kicking_user = false;
    },
    startGame() {
      if (!this.is_host) return;

      console.log(`Starting game for lobby #${this.lobby_id}...`);

      this.starting_game = true;

      this.error = "Couldn't start game!";
      this.starting_game = false;
    },
  },
};
</script>
