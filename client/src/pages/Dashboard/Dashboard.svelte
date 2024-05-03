<script>
  import { BASE_URL } from "../../stores/generalStore";
  import { fetchGet } from "../../util/api";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";

  let secret;

  onMount(async () => {
    const data = await fetchGet($BASE_URL + "/api/dashboard");
    secret = data.message;
    toast.success("Successful login!");
  });
</script>

<main>
  <h3>{secret}</h3>
  <!-- <Toaster /> -->
</main>

<style>
</style>
