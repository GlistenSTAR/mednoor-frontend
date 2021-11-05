<script>
  export let template;
</script>

<tr>
  <td>{template.firstName}</td>
  <td>{template.lastName}</td>
  <td>{template.Descriptions[0].date}</td>
  <td><button type="button" class="btn btn-primary btn-sm">Select</button></td>
  <td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>
</tr>
