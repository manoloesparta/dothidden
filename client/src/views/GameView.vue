<template>
  <div
    class="d-flex flex-column justify-content-center text-center"
    :style="backgroundStyle"
  >
    <div v-if="state === 'hidding'">
      <div>
        <h1 class="display-1"><em>128</em></h1>
        <br />
        <h1 class="display-1"><strong>HIDE</strong></h1>
      </div>
    </div>
    <div v-if="state === 'seek'">
      <div>
        <h3 class="display-1"><em>10:00</em></h3>
        <br />
        <img class="mb-4" src="../assets/dothidden.svg" alt="" width="198" />
      </div>
    </div>
    <div v-if="state === 'hide'">
      <div>
        <h3 class="display-1"><em>10:00</em></h3>
        <br />
        <img class="mb-4" src="../assets/dothidden.svg" alt="" width="198" />
        <br />
        <h1 class="display-1"><em>10 FT</em></h1>
        <br />
        <h1 class="display-1"><strong>AWAY</strong></h1>
      </div>
    </div>
    <div v-if="state === 'caught'"></div>
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
  },
  data() {
    return {
      // Game States:
      // hidding
      // playing
      state: "hide",

      user: "",

      delta: 0,
      distance: 1.0,
    };
  },
  computed: {
    backgroundStyle() {
      let bgc = "rgb(255, 255, 255)";
      if (this.distance >= 0.9) bgc = "rgb(255, 0, 0)";
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
  },
  mounted() {
    // setInterval(() => {
    //   if (this.distance >= 1.0) this.delta = -1;
    //   else if (this.distance <= 0.0) this.delta = 1;
    //   this.distance += 0.1 * this.delta;
    //   console.log(this.distance);
    // }, 250);
  },
};
</script>

<style scoped>
.hidding-color {
  background-color: #9932cc;
}

.seek-color {
  background-color: #ff0000;
}

.hide-color {
  background-color: #00bfff;
}

.caught-color {
  background-color: #dc143c;
}
</style>
