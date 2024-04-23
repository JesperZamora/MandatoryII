<script>
  import { user } from "../stores/generalStore.js"

  function handleLogout() {
		$user = null;
	}
</script>

<button on:click={handleLogout}>Logout</button>