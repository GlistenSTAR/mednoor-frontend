<script>
  import { onMount } from "svelte";

  import { errors } from "../../store";

  onMount(() => {
    errors.set({});
  });
</script>

<h1 class="content-p">Welcome to MEDNOOR</h1>

<style>
  .content-p {
    padding-top: 8rem;
    padding-bottom: 5rem;
  }
</style>
