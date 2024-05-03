<script>
  import { user } from "../stores/generalStore.js";
  import { BASE_URL } from "../stores/generalStore.js";
  import { fetchGet } from "../util/api.js";
  import toast, { Toaster } from "svelte-french-toast";

  async function handleLogout() {
    const data = await fetchGet($BASE_URL + "/api/logout");

    if(data) {
      $user = null;
      toast.success("You have been logged out!");
    }

  }
</script>

<button on:click={handleLogout}>Logout</button>

<style>
  button {
    border: none;
    font-size: 16px;
    padding: 5px;
    border-radius: 8px;
    background-color: rgb(18, 123, 18);
    color: white;
    width: 100px;
  }

  button:hover {
    background-color: rgb(14, 93, 14);
  }
</style>
