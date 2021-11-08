<script>
  import { navigate } from "svelte-navigator";

  import { seletedTemp } from "../../store";

  export let model;
  export let delModel;

  const selectModel = async () => {
    seletedTemp.set(model);
    navigate(`/dashboard/template/${model.id}`, { replace: true });
  };
</script>

<tr>
  <td>{model.modelName}</td>
  <td
    ><button type="button" class="btn btn-primary btn-sm" on:click={selectModel}
      >Edit</button
    ></td
  >
  <td>
    <button
      type="button"
      id={model.id}
      class="btn btn-danger btn-sm"
      on:click={delModel}>Delete</button
    >
  </td>
</tr>
