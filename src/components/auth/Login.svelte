<script>
  import { onMount } from "svelte";

  import { login } from "../../apis/auth";
  import { errors } from "../../store";

  onMount(() => {
    errors.set({});
  });

  let userData = {
    email: "",
    password: "",
  };

  let errs = {};

  errors.subscribe((value) => {
    errs = value;
  });

  const signIn = async () => {
    await login(userData);
  };
</script>

<div class="d-flex justify-content-center content-p">
  <form
    class="text-left py-3 login"
    on:submit|preventDefault={signIn}
    novalidate
  >
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        class="form-control"
        placeholder="Enter email"
        name="email"
        id="email"
        bind:value={userData.email}
      />
      {#if errs.email}
        <div class="mt-2 text-red">{errs.email}</div>
      {/if}
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter password"
        name="password"
        id="password"
        bind:value={userData.password}
      />
      {#if errs.password}
        <div class="mt-2 text-red">{errs.password}</div>
      {/if}
    </div>
    <button type="submit" class="btn btn-primary">SignIn</button>
  </form>
</div>

<style>
  .login {
    width: 50vw;
  }

  .text-red {
    color: red;
  }

  .content-p {
    padding-top: 5rem;
    padding-bottom: 2rem;
  }
</style>
