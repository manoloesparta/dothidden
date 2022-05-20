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
          class="list-group-item"
        >
          <div class="d-flex">
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
      v-if="is_host"
      :disabled="isBusy || !canStart"
      @click="startGame"
      type="button"
      class="btn btn-lg my-2 position-fixed bottom-0 start-50 translate-middle-x"
      :class="{
        'btn-secondary': !canStart,
        'btn-success': canStart,
      }"
    >
      Start Game
    </button>

    <UsernameModal
      ref="usernameModal"
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

      left: false,

      error: "",
      starting_game: false,
      kicking_user: false,

      usernameModal: undefined,

      user: "",
      usernames: [],
      lobbyIdCopy: this.lobby_id,
    };
  },
  computed: {
    isBusy() {
      return this.starting_game || this.kicking_user;
    },

    canStart() {
      return this.usernames.length >= 1;
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

    this.socket = io(process.env.VUE_APP_SOCKET_URL);

    this.socket.on("lobby.update", (e) => {
      if (e.lobby == this.lobby_id) {
        if (!e.names.includes(this.user)) {
          this.left = true;
          this.$router.push("/");
        }
        this.usernames = (e.names || []).filter(
          (username) => username !== this.user
        );
      }
    });
  },
  methods: {
    async joinLobby(username) {
      this.user = username;

      let lobby_id = this.lobby_id;

      if (this.lobby_id.length === 5 && !this.is_host) {
        console.log(`Joining lobby #${this.lobby_id} as ${username}...`);
        let response = await fetch(
          `${process.env.VUE_APP_API_URL}/game/${this.lobby_id}/players/${username}`,
          {
            method: "POST",
          }
        );

        if (response.status !== 200) {
          this.$refs.usernameModal.setError("Couldn't join session!");
          return;
        }
      } else if (this.lobby_id.length === 0 && this.is_host) {
        console.log(`Creating lobby as ${username}...`);

        let response = await fetch(`${process.env.VUE_APP_API_URL}/game`, {
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
          this.$refs.usernameModal.setError("Couldn't create session!");
          return;
        }
      }

      this.usernameModal.hide();
    },
    async closeLobby() {
      if (this.is_host) {
        console.log(`Closing lobby #${this.lobby_id}...`);
        let response = await fetch(
          `${process.env.VUE_APP_API_URL}/game/${this.lobby_id}`,
          {
            method: "DELETE",
          }
        );

        if (response.status !== 204) {
          this.error = "Couldn't close game!";
        }
      } else {
        this.kickUser(this.user);
        console.log(`Leaving lobby #${this.lobby_id}...`);
      }

      this.$router.push(`/`);
    },
    async kickUser(user) {
      console.log(`Kicking user ${user} from lobby #${this.lobby_id}...`);

      this.kicking_user = true;

      let response = await fetch(
        `${process.env.VUE_APP_API_URL}/game/${this.lobby_id}/players/${user}`,
        {
          method: "DELETE",
        }
      );

      if (response.status !== 204) {
        this.error = "Couldn't kick user!";
        this.kicking_user = false;
      }
    },
    startGame() {
      if (!this.is_host) return;

      console.log(`Starting game for lobby #${this.lobby_id}...`);

      this.starting_game = true;

      this.error = "Couldn't start game!";
      this.starting_game = false;
    },
    confirmLeave() {
      return window.confirm(
        `Do you really want to ${this.is_host ? "close" : "leave"} the lobby?`
      );
    },
    confirmStayInLobby() {
      return this.confirmLeave();
    },
    beforeWindowUnload(e) {
      if (!this.left || this.confirmStayInLobby()) {
        e.preventDefault();
        e.returnValue = "";
      }
    },
  },
  created() {
    window.addEventListener("beforeunload", this.beforeWindowUnload);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.beforeWindowUnload);
  },
  beforeRouteLeave(to, from, next) {
    if (this.left || this.confirmStayInLobby()) {
      this.usernameModal.hide();
      next();
    } else {
      next(false);
    }
  },
};
</script>
