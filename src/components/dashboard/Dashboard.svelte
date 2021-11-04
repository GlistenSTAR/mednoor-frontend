<script>
  import { Router, Link } from "svelte-navigator";

  let searchData = {
    firstName: "",
    lastName: "",
    date: "",
  };

  const searchTemp = () => {};
</script>

<Router>
  <div class="container-fluid content-p">
    <h4>You can create a new template!</h4>
    <Link to="/dashboard/template">
      <button type="button" class="btn btn-primary btn-lg">New Template</button>
    </Link>
    <hr />
    <h4>You can search the templates with First Name, Last Name, Date!</h4>
    <div class="d-flex justify-content-center">
      <form on:submit|preventDefault={searchTemp} class="text-left">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="firstName"
            bind:value={searchData.firstName}
          />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            name="lastName"
            bind:value={searchData.lastName}
          />
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input
            type="text"
            class="form-control"
            id="date"
            name="date"
            bind:value={searchData.date}
          />
        </div>
        <button type="submit" class="btn btn-success btn-lg">Search</button>
      </form>
    </div>
  </div>
</Router>

<style>
  .content-p {
    padding-top: 5rem;
    padding-bottom: 2rem;
  }

  .form-group {
    width: 50vw;
  }
</style>
