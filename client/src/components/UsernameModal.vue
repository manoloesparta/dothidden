<template>
  <div id="UsernameModal" class="modal text-center" tabindex="-1">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-body d-flex flex-column justify-content-center">
          <img
            class="mx-auto mb-4"
            src="../assets/dothidden.svg"
            alt=""
            width="198"
          />
          <h1 class="h3 mb-3 fw-normal">DotHidden</h1>

          <div class="form-floating">
            <input
              type="text"
              class="mb-2 form-control text-center"
              id="usernameInput"
              placeholder="Username"
            />
            <label for="usernameInput">Username</label>
          </div>

          <button class="w-100 btn btn-primary">Join</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UsernameModal",
};
</script>
