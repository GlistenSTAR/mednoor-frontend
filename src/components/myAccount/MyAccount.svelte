<script>
  // import { register } from "../../apis/auth";
  import { auth } from "../../store";

  let userData = {
    firstName: "",
    lastName: "",
    email: "",
    oldPw: "",
    password: "",
    password2: "",
  };

  auth.user.subscribe((value) => {
    userData.firstName = value.firstName;
    userData.lastName = value.lastName;
    userData.email = value.email;
  });

  const updateUser = () => {};
  const changePW = () => {};
</script>

<div class="d-flex justify-content-between">
  <form
    class="text-left py-3 update-form"
    on:submit|preventDefault={updateUser}
  >
    <div class="form-group">
      <label for="firstName">First Name:</label>
      <input
        type="text"
        class="form-control"
        placeholder="Enter first name"
        name="firstName"
        id="firstName"
        bind:value={userData.firstName}
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
        bind:value={userData.lastName}
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
        bind:value={userData.email}
      />
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
</style>
