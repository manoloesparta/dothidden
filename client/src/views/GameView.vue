<template>
  <div
    class="d-flex flex-column justify-content-center text-center"
    style="color: red"
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
            {{ role == "hider" ? "HIDE" : "SEEK" }}
          </strong>
        </h1>
        <div v-if="role === 'seeker'">
          <ul style="list-style: none">
            <li v-for="hider in hiders" :key="hider">
              <h1 v-if="hider.alive">
                <strong
                  >{{ hider["nickname"] }} : {{ hider["distance"] }}</strong
                >
              </h1>
              <h1 v-if="!hider.alive">
                <strong>{{ hider["name"] }} : dead</strong>
              </h1>
            </li>
          </ul>
        </div>
        <div v-else>
          <h1>
            <strong>The seeker is {{ distance }} units away</strong>
          </h1>
        </div>
        <br />
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
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
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
      hiders: [
        {
          name: "mani",
          nickname: "HiderA",
          alive: true,
          distance: 15.34,
        },
        {
          name: "bruh",
          nickname: "HiderB",
          alive: false,
          distance: 20.34,
        },
        {
          name: "manuel",
          nickname: "HiderC",
          alive: true,
          distance: 423,
        },
      ],
      role: "",
      AB: "",
      distance: 0.0,
      prevDistance: 0.0,
      hide_time: window.hide_time,
      game_time: 0,

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

    updateLocation() {
      const options = { enableHighAccuracy: true };
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const payload = {
            lobbyId: this.lobby_id,
            player: {
              name: this.user,
              type: this.role,
              position: {
                x: position.coords.longitude,
                y: position.coords.latitude,
              },
            },
          };
          this.socket.emit("server.player.position", payload);
          console.log("location");
        },
        (err) => console.error(err),
        options
      );
      return watchId;
    },

    async getResults() {
      let response = await fetch(
        `${process.env.VUE_APP_API_URL}/game/${this.lobby_id}/players`,
        {
          method: "GET",
        }
      );

      if (response.status === 200) {
        console.log("api works");
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
    const loop = setInterval(() => {
      this.hide_time -= 1;
      this.AB = this.updateLocation();
      if (this.hide_time <= 0) {
        clearInterval(loop);
        if (this.is_host == "true") {
          console.log(this.is_host);
          this.socket.emit("server.game.start", { lobbyId: this.lobby_id });
          console.log("obama");
        }
      }
    }, 1000);

    this.socket.on("client.seeker.update", (e) => {
      this.hiders = e.hiders;
    });

    this.socket.on("client.hider.update", (e) => {
      this.distance = e.seeker;
    });

    this.socket.on("client.game.stop", () => {
      navigator.geolocation.clearWatch(this.AB);
      this.getResults();
    });

    this.socket.on("client.game.winner", (e) => {
      console.log("HOST " + this.is_host);
      if (this.role == e.winner) {
        Swal.fire({
          icon: "success",
          title: "WINNER",
        }).then(() => {
          this.$router.push("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "LOSER",
        }).then(() => {
          this.$router.push("/");
        });
      }
    });

    this.socket.on("client.game.start", (e) => {
      if (this.user == e.seeker) {
        this.role = "seeker";
      } else {
        this.role = "hider";
      }
      this.state = "playing";
      //this.AB = this.updateLocation();
      this.game_time = e.duration;
      const willSmith = setInterval(() => {
        this.game_time -= 1;
        if (this.game_time <= 0) {
          clearInterval(willSmith);
        }
      }, 1000);
    });
  },
};
</script>
