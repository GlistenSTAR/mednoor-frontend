<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  import { register } from "../../apis/auth";
  import { errors } from "../../store";

  const { addNotification } = getNotificationsContext();

  onMount(() => {
    errors.set({});
  });

  let newUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  };

  let errs = {};

  errors.subscribe((value) => {
    errs = value;
  });

  const signUp = async () => {
    const res = await register(newUser);
    if (res === "success") {
      addNotification({
        text: "Successfully registered",
        position: "top-right",
        type: "success",
        removeAfter: 3000,
      });
    } else {
      addNotification({
        text: "Error occured",
        position: "top-right",
        type: "danger",
        removeAfter: 3000,
      });
    }
  };
</script>

<div class="d-flex justify-content-center content-p">
  <form class="text-left py-3 register" on:submit|preventDefault={signUp}>
    <div class="form-group">
      <label for="firstName">Firstname:</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter first name"
        name="firstName"
        id="firstName"
        bind:value={newUser.firstName}
      />
      {#if errs.firstName}
        <div class="mt-2 text-red">{errs.firstName}</div>
      {/if}
    </div>
    <div class="form-group">
      <label for="lastName">Lastname:</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter last name"
        name="lastName"
        id="lastName"
        bind:value={newUser.lastName}
      />
      {#if errs.lastName}
        <div class="mt-2 text-red">{errs.lastName}</div>
      {/if}
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        class="form-control"
        placeholder="Enter email"
        name="email"
        id="email"
        bind:value={newUser.email}
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
        bind:value={newUser.password}
      />
      {#if errs.password}
        <div class="mt-2 text-red">{errs.password}</div>
      {/if}
    </div>
    <div class="form-group">
      <label for="password2">Confirm Password:</label>
      <input
        type="password"
        class="form-control"
        placeholder="Confirm password"
        name="password2"
        id="password2"
        bind:value={newUser.password2}
      />
      {#if errs.password2}
        <div class="mt-2 text-red">{errs.password2}</div>
      {/if}
    </div>
    <button type="submit" class="btn btn-primary">SignUp</button>
  </form>
</div>

<style>
  .register {
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
