<template>
  <main class="main-menu d-flex flex-column justify-content-center">
    <form class="m-5 text-center">
      <img class="mb-4" src="../assets/dothidden.svg" alt="" width="198" />
      <h1 class="h3 mb-3 fw-normal">DotHidden</h1>

      <div class="form-floating">
        <input
          type="text"
          class="mb-2 form-control text-center"
          id="lobbyIdInput"
          placeholder="Lobby ID"
        />
        <label for="lobbyIdInput" center="text-center">Lobby ID</label>
      </div>

      <button class="w-100 btn btn-primary" type="submit">JOIN</button>

      <div class="checkbox mb-3">
        <hr />
      </div>

      <button class="w-100 btn btn-primary" type="submit">CREATE</button>

      <p class="mt-5 mb-3 text-muted">© 2017–2021</p>
    </form>
  </main>
</template>

<script>
export default {
  name: "MainMenu",
};
</script>
