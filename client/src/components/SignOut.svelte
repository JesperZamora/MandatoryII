<script>
  import { user } from "../stores/generalStore.js"
  import { onMount } from "svelte";
  import toast, { Toaster } from 'svelte-french-toast';


  function handleLogout() {
    toast.success("You are now logged out");
		$user = null;
	}
</script>


<button on:click={handleLogout}>Logout</button>