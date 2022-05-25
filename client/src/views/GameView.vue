<template>
  <div
    class="d-flex flex-column justify-content-center text-center"
    style="color: white"
    :style="backgroundStyle"
  >
    <div v-if="state === 'hidding'">
      <div>
        <h1 class="display-1">
          <em>{{ hide_time }}</em>
        </h1>
        <br />
        <h1 class="display-1"><strong>HIDE</strong></h1>
      </div>
    </div>

    <div v-if="state === 'playing'">
      <div>
        <h3 class="display-1">
          <em>{{ game_time_text }}</em>
        </h3>
        <br />
        <img class="mb-4" src="../assets/dothidden.svg" alt="" width="198" />
        <br />
        <h1 class="display-1">
          <strong>
            {{ role == "hidder" ? "HIDE" : "SEEK" }}
          </strong>
        </h1>
      </div>
    </div>

    <div v-if="state === 'results'" class="w-100 h-100 pt-5">
      <div class="w-100 h-100">
        <nav class="navbar navbar-light bg-light fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand">DotHidden #{{ lobby_id }}</a>
            <div class="d-flex">
              <button
                :disabled="isBusy"
                @click="toLobby"
                type="button"
                class="btn btn-danger"
              >
                Lobby
              </button>
            </div>
          </div>
        </nav>

        <div class="card w-100 h-100" style="width: 18rem">
          <ul class="list-group list-group-flush">
            <li
              v-for="result in results"
              :key="result[0]"
              class="list-group-item"
            >
              <div class="d-flex">
                <span class="my-auto">{{ result[0] }}</span>

                <div class="ms-auto">
                  <i>{{ padTime(result[1]) }}</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameView",
  props: {
    is_host: {
      type: Boolean,
      default: false,
    },
    lobby_id: {
      type: String,
      default: "",
    },
    user: {
      type: String,
      default: "",
    },
    socket: {
      default: window.socket,
    },
  },
  data() {
    return {
      // Game States:
      // hidding
      // playing
      // results
      state: "hidding",

      // Game Roles
      // hidder
      // seeker
      role: "hidder",
      distance: 0.0,
      hide_time: 10,
      game_time: 30,

      results: [],
    };
  },
  computed: {
    isBusy() {
      return this.game_time > 0;
    },
    backgroundStyle() {
      let bgc = "rgb(255, 255, 255)";
      if (this.state == "hidding") bgc = "#9932cc";
      else if (this.distance >= 0.9) bgc = "rgb(255, 0, 0)";
      else if (this.distance >= 0.8) bgc = "rgb(228, 0, 0)";
      else if (this.distance >= 0.7) bgc = "rgb(192, 0, 0)";
      else if (this.distance >= 0.6) bgc = "rgb(128, 0, 0)";
      else if (this.distance >= 0.5) bgc = "rgb(64, 32, 32)";
      else if (this.distance >= 0.4) bgc = "rgb(32, 64, 64)";
      else if (this.distance >= 0.3) bgc = "rgb(0, 128, 128)";
      else if (this.distance >= 0.2) bgc = "rgb(0, 192, 192)";
      else if (this.distance >= 0.1) bgc = "rgb(0, 228, 228)";
      else if (this.distance >= -1.0) bgc = "rgb(0, 255, 255)";
      return { backgroundColor: bgc };
    },
    game_time_text() {
      return this.padTime(this.game_time);
    },
  },
  methods: {
    padTime(seconds) {
      let minutes = Math.floor(seconds / 60);
      seconds = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },

    async getLocation() {
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location.coords);
        console.log(this.lobby_id);
        this.socket.emit("player.position", {
          lobbyId: this.lobby_id,
          player: {
            name: this.user,
            type: this.role,
            position: {
              x: location.coords.longitude,
              y: location.coords.latitude,
            },
          },
        });
      });
    },

    async getResults() {
      let response = await fetch(
        `${process.env.VUE_APP_API_URL}/game/${this.lobby_id}/players`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        let json_response = await response.json();
        let results = json_response.names || [];
        for (let index = 0; index < results.length; index++) {
          const username = results[index];
          results[index] = [
            username, // username
            Math.floor(Math.random() * 7), // caught time
          ];
        }
        this.results = results;
      } else {
        this.results = [];
      }
    },

    toLobby() {
      console.log(`Going to lobby #${this.lobby_id} as ${this.user}...`);
      this.$router.push({
        name: `lobby`,
        params: {
          is_host: this.is_host,
          lobby_id: this.lobby_id,
          user: this.user,
        },
      });
    },
  },
  mounted() {
    // USED TO SIMUlATE GAME ROUND; REMOVE FOR PRODUCTION
    this.state = "hidding";
    const loop = setInterval(() => {
      if (this.state == "hidding") {
        this.hide_time -= 1;
        if (this.hide_time <= 0) {
          this.state = "playing";
        }
      } else if (this.state == "playing") {
        this.getLocation();
        if (this.distance >= 1.0) this.delta = -1;
        else if (this.distance <= 0.0) this.delta = 1;
        this.distance += 0.1 * this.delta;
        this.game_time -= 1;
        if (this.game_time <= 0) {
          clearInterval(loop);
          this.state = "results";
          this.getResults();
        }
        console.log(this.distance);
      }
    }, 1000);
  },
};
</script>
