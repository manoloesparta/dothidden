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
  },
  data() {
    return {
      // Game States:
      // hidding
      // playing
      state: "hidding",

      // Game Roles
      // hidder
      // seeker
      role: "hidder",
      distance: 0.0,
      hide_time: 10,
      game_time: 10,
    };
  },
  computed: {
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
      let minutes = Math.floor(this.game_time / 60);
      let seconds = this.game_time % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    },
  },
  mounted() {
    // USED TO SIMUlATE GAME ROUND; REMOVE FOR PRODUCTION
    const loop = setInterval(() => {
      if (this.state == "hidding") {
        this.hide_time -= 1;
        if (this.hide_time <= 0) this.state = "playing";
      } else if (this.state == "playing") {
        if (this.distance >= 1.0) this.delta = -1;
        else if (this.distance <= 0.0) this.delta = 1;
        this.distance += 0.1 * this.delta;
        this.game_time -= 1;
        if (this.game_time <= 0) {
          console.log(
            `Lobby #${this.lobby_id} finished game as ${this.user}...`
          );
          clearInterval(loop);
          this.$router.push({
            name: `lobby`,
            params: {
              is_host: this.is_host,
              lobby_id: this.lobby_id,
              user: this.user,
            },
          });
        }
        console.log(this.distance);
      }
    }, 1000);
  },
};
</script>
