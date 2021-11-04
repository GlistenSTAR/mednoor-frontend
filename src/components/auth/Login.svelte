<script>
  import { login } from "../../apis/auth";

  let userData = {
    email: "",
    password: "",
  };

  const signIn = () => {
    const res = login(userData);
    // console.log(res);
  };
</script>

<div class="d-flex justify-content-center">
  <form class="text-left py-3 login" on:submit|preventDefault={signIn}>
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
    </div>
    <button type="submit" class="btn btn-primary">SignIn</button>
  </form>
</div>

<style>
  .login {
    width: 50vw;
  }
</style>
