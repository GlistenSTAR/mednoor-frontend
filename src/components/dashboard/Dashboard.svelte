<script>
  import { Router, Link, navigate } from "svelte-navigator";
  import { getNotificationsContext } from "svelte-notifications";

  import { search_result, models, seletedTemp } from "../../store";

  import TempItem from "./TempItem.svelte";
  import ModelItem from "./ModelItem.svelte";
  import {
    deleteTemplate,
    searchTemplate,
    getModels,
    deleteModel,
  } from "../../apis/template";
  import { onMount } from "svelte";
  import { each } from "svelte/internal";

  const { addNotification } = getNotificationsContext();

  let searchKeys = {
    firstName: "",
    lastName: "",
    date: "",
  };

  let myModels = [];

  let temps = [];

  onMount(() => {
    getModels();
  });

  models.subscribe((value) => {
    myModels = value;
  });

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

    const res = await deleteTemplate(e.target.id);

    if (res === "success") {
      addNotification({
        text: "Template successfully deleted",
        position: "top-right",
        type: "success",
        removeAfter: 3000,
      });
    }
  };

  const delModel = async (e) => {
    let removeIndex = myModels.findIndex((model) => {
      return model.id.toString() === e.target.id.toString();
    });

    myModels.splice(removeIndex, 1);
    models.set(myModels);

    const res = await deleteModel(e.target.id);

    if (res === "success") {
      addNotification({
        text: "Model successfully deleted",
        position: "top-right",
        type: "success",
        removeAfter: 3000,
      });
    }
  };

  const seletModel = async (e) => {
    let index = myModels.findIndex((model) => {
      return model.id.toString() === e.target.value.toString();
    });

    let selectedModel = myModels.slice(index, index + 1);
    seletedTemp.set(selectedModel[0]);
    navigate(`/dashboard/template/${selectedModel[0].modelName}`, {
      replace: true,
    });
  };
</script>

<Router>
  <div class="container-fluid content-p">
    <!-- Create temp -->
    <h4>You can create a new template or select a model.</h4>
    <div class="d-flex justify-content-center mt-3">
      <Link to="/dashboard/template">
        <button type="button" class="btn btn-primary btn-lg mr-3"
          >New Template</button
        >
      </Link>
      <select
        class="form-control d-flex model-select form-control-lg"
        name="model"
        id="model"
        on:change={seletModel}
      >
        <option value="" disabled selected>Select model</option>
        {#each myModels as model}
          <option value={model.id}>{model.modelName}</option>
        {/each}
      </select>
    </div>
    <hr />
    <!-- Show templates and models -->
    <h4>You can search the templates and models.</h4>
    <ul class="nav nav-pills d-flex justify-content-center mb-3">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#template"
          >Templates</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#models">Models</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div class="tab-pane container active" id="template">
        <!-- Input search keys -->
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
      <div
        class="tab-pane container fade d-flex justify-content-center"
        id="models"
      >
        <table class="table table-hover model-table">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {#each myModels as myModel}
              <ModelItem model={myModel} {delModel} />
            {/each}
          </tbody>
        </table>
      </div>
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

  .model-select {
    width: 20vw;
    min-width: 180px;
    max-width: 300px;
  }

  .model-table {
    width: 80%;
  }
</style>
