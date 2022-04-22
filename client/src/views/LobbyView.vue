<template>
  <main class="lobby mt-5 pt-2">
    <nav class="navbar navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand">DotHidden #{{ lobby_id }}</a>
        <div class="d-flex">
          <button type="button" class="btn btn-danger">
            {{ isHost ? "CLOSE" : "LEAVE" }}
          </button>
        </div>
      </div>
    </nav>

    <div class="card w-100" style="width: 18rem">
      <div class="card-header">Username</div>

      <ul class="list-group list-group-flush">
        <li v-for="i in 100" :key="i" class="list-group-item d-flex">
          <span class="my-auto">Username</span>
          <div v-if="isHost" class="ms-auto">
            <button type="button" class="btn btn-sm btn-danger">KICK</button>
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: "LobbyView",
  data() {
    return {
      lobby_id: "",
    };
  },
  computed: {
    isHost() {
      return true;
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.lobby_id = this.$route.params.lobby_id || "";
  },
};
</script>
