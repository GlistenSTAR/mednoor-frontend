<script>
  import { onMount } from "svelte";

  import { updateUserData, changePassword } from "../../apis/auth";
  import { auth, errors } from "../../store";

  onMount(() => {
    errors.set({});
  });

  let userData = {
    firstName: "",
    lastName: "",
    email: "",
    oldPw: "",
    password: "",
    password2: "",
  };

  let errs = {};

  errors.subscribe((value) => {
    errs = value;
  });

  auth.user.subscribe((value) => {
    userData.firstName = value.firstName;
    userData.lastName = value.lastName;
    userData.email = value.email;
  });

  const updateUser = async () => {
    await updateUserData(userData);
  };
  const changePW = async () => {
    await changePassword(userData);
  };
</script>

<div class="d-flex justify-content-between">
  <form
    class="text-left py-3 update-form"
    on:submit|preventDefault={updateUser}
  >
    <div class="form-group">
      <label for="firstName">Firstname:</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter first name"
        name="firstName"
        id="firstName"
        bind:value={userData.firstName}
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
        bind:value={userData.lastName}
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
        bind:value={userData.email}
      />
      {#if errs.email}
        <div class="mt-2 text-red">{errs.email}</div>
      {/if}
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
  </form>
  <form class="text-left py-3 pw-form" on:submit|preventDefault={changePW}>
    <div class="form-group">
      <label for="oldPw">Current Password:</label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter current password"
        name="oldPw"
        id="oldPw"
        bind:value={userData.oldPw}
      />
      {#if errs.oldPw}
        <div class="mt-2 text-red">{errs.oldPw}</div>
      {/if}
    </div>
    <div class="form-group">
      <label for="password">New Password:</label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter new password"
        name="password"
        id="password"
        bind:value={userData.password}
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
        bind:value={userData.password2}
      />
      {#if errs.password2}
        <div class="mt-2 text-red">{errs.password2}</div>
      {/if}
    </div>
    <button type="submit" class="btn btn-primary">Change Password</button>
  </form>
</div>

<style>
  .update-form {
    width: 30vw;
  }

  .pw-form {
    width: 30vw;
  }

  .text-red {
    color: red;
  }
</style>
