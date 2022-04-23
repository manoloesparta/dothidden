<template>
  <div id="UsernameModal" class="modal text-center" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div
          class="modal-body m-5 mx-sm-auto d-flex flex-column justify-content-center"
        >
          <img
            class="mx-auto mb-4"
            src="../assets/dothidden.svg"
            alt=""
            width="198"
          />
          <h1 class="h3 mb-3 fw-normal">DotHidden</h1>

          <div class="mb-2">
            <input
              type="text"
              v-model="username"
              class="form-control text-center"
              :class="{ 'is-invalid': error.length > 0 }"
              id="usernameInput"
              aria-describedby="usernameInputFeedback"
              placeholder="Username"
            />
            <div
              v-if="error.length > 0"
              id="usernameInputFeedback"
              class="invalid-feedback"
            >
              {{ error }}
            </div>
          </div>

          <button
            :disabled="!isValidUsername"
            @click="enterUsername"
            class="w-100 btn btn-primary"
          >
            {{ isHost ? "Create Lobby" : "Join Lobby" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsernameModal",
  emits: ["entered"],
  props: {
    isHost: {
      type: Boolean,
      default: false,
    },
    lobbyID: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      error: "",

      username: "",
    };
  },
  computed: {
    isValidUsername() {
      return this.username.length >= 3 && this.username.length <= 12;
    },
  },
  methods: {
    async enterUsername() {
      if (!this.isValidUsername) {
        this.error = "Username needs to between 3 and 12 characters!";
        return;
      }

      if (this.lobbyID.length === 6) {
        let response = await fetch(
          `http://localhost:8080/game/${this.lobby_id}/players`,
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          let json_response = await response.json();
          let lobby_users = json_response.names || [];

          if (this.username in lobby_users) {
            this.error = "Username already exist!";
            return;
          }
        }
      }

      this.error = "";
      this.$emit("entered", this.username);
    },
  },
};
</script>
