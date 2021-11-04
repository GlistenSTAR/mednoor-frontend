<script>
  import { register } from "../../apis/auth";

  let newUser = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  };

  const signUp = () => {
    register(newUser);
  };
</script>

<div class="d-flex justify-content-center">
  <form class="text-left py-3 register" on:submit|preventDefault={signUp}>
    <div class="form-group">
      <label for="firstName">First Name:</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter first name"
        name="firstName"
        id="firstName"
        bind:value={newUser.firstName}
      />
    </div>
    <div class="form-group">
      <label for="lastName">Last Name:</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter last name"
        name="lastName"
        id="lastName"
        bind:value={newUser.lastName}
      />
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
    </div>
    <button type="submit" class="btn btn-primary">SignUp</button>
  </form>
</div>

<style>
  .register {
    width: 50vw;
  }
</style>
