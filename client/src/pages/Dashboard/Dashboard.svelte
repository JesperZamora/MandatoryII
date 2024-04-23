<script>
  import { BASE_URL } from "../../stores/generalStore";
  import { fetchGet } from "../../util/api";
  import { onMount } from "svelte";

  let secret;

  onMount(async () => {
    const data = await fetchGet($BASE_URL + "/api/dashboard");
    secret = data.message;
    console.log(data);
  });


</script>

<main>
  <h3>{secret}</h3>
</main>

<style>

</style>