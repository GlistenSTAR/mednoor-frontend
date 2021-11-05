<script>
  import { Router, Link } from "svelte-navigator";

  import { search_result } from "../../store";

  import TempItem from "./TempItem.svelte";
  import { deleteTemplate, searchTemplate } from "../../apis/template";

  let searchKeys = {
    firstName: "",
    lastName: "",
    date: "",
  };

  let temps = [];

  search_result.subscribe((v) => {
    temps = v;
  });

  const searchTemp = async () => {
    await searchTemplate(searchKeys);
  };

  const deleteTemp = async (e) => {
    let removeIndex = temps.findIndex((temp) => {
      return temp.id.toString() === e.target.id.toString();
    });

    temps.splice(removeIndex, 1);
    search_result.set(temps);

    deleteTemplate(e.target.id);
  };
</script>

<Router>
  <div class="container-fluid content-p">
    <!-- Create temp -->
    <h4>You can create a new template!</h4>
    <Link to="/dashboard/template">
      <button type="button" class="btn btn-primary btn-lg">New Template</button>
    </Link>
    <hr />
    <!-- Input search data -->
    <h4>
      You can search the templates with "First Name", "Last Name", "Date" and
      then update it!
    </h4>
    <div class="d-flex justify-content-center mb-4">
      <form on:submit|preventDefault={searchTemp} class="text-left">
        <div class="form-group">
          <label for="firstName">Firstname:</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            name="firstName"
            placeholder="Enter firstname"
            bind:value={searchKeys.firstName}
          />
        </div>
        <div class="form-group">
          <label for="lastName">Lastname:</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            placeholder="Enter lastname"
            name="lastName"
            bind:value={searchKeys.lastName}
          />
        </div>
        <div class="form-group">
          <label for="date">Date:</label>
          <input
            type="text"
            class="form-control"
            id="date"
            placeholder="Enter date"
            name="date"
            bind:value={searchKeys.date}
          />
        </div>
        <button type="submit" class="btn btn-success btn-lg">Search</button>
      </form>
    </div>
    <!-- Search result -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Date</th>
          <th>Select</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each temps as temp}
          <TempItem template={temp} {deleteTemp} />
        {/each}
      </tbody>
    </table>
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

  .text-red {
    color: red;
  }
</style>
