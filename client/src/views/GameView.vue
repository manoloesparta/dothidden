<template>
  <div
    class="d-flex flex-column justify-content-center text-center"
    :class="{
      'hidding-color': state === 'hidding',
      'seek-color': state === 'seek',
      'hide-color': state === 'hide',
      'caught-color': state === 'caught',
    }"
  >
    <div v-if="state === 'hidding'">
      <div>
        <h1 class="display-1"><em>128</em></h1>
        <br />
        <h1 class="display-1"><strong>HIDE</strong></h1>
      </div>
    </div>
    <div v-if="state === 'seek'"></div>
    <div v-if="state === 'hide'"></div>
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
      // seek
      // hide
      // caught
      state: "hidding",

      user: "",
    };
  },
};
</script>

<style scoped>
.hidding-color {
  background-color: #9932cc;
}

.seek-color {
  color: #dc143c;
}

.hide-color {
  color: #00bfff;
}

.caught-color {
  color: #ff0000;
}
</style>
