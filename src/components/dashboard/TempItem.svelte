<script>
  import { navigate } from "svelte-navigator";

  import { seletedTemp } from "../../store";

  export let template;
  export let deleteTemp;

  const selectTemp = async () => {
    seletedTemp.set(template);
    navigate(`/dashboard/template/${template.id}`, { replace: true });
  };
</script>

<tr>
  <td>{template.firstName}</td>
  <td>{template.lastName}</td>
  <td>{template.Descriptions[0].date}</td>
  <td
    ><button type="button" class="btn btn-primary btn-sm" on:click={selectTemp}
      >Select</button
    ></td
  >
  <td>
    <button
      type="button"
      id={template.id}
      class="btn btn-danger btn-sm"
      on:click={deleteTemp}>Delete</button
    >
  </td>
</tr>
