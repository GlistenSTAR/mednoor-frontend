<script>
  import { onMount } from "svelte";

  import { errors } from "../../store";

  onMount(() => {
    errors.set({});
  });
</script>

<h1 class="my-5">Welcome to MEDNOOR</h1>
