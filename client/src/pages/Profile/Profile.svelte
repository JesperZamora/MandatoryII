<script>
  import { user } from "../../stores/generalStore.js"
  import SignOut from "../../components/SignOut.svelte";
  import Dashboard from "../Dashboard/Dashboard.svelte";
</script>

<h3>Welcome {$user.username}</h3>
<Dashboard/>
<SignOut/>

