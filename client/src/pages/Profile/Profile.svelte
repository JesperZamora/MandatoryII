<script>
  import { user } from "../../stores/generalStore.js";
  import SignOut from "../../components/SignOut.svelte";
  import Dashboard from "../Dashboard/Dashboard.svelte";
</script>

<main>
  <div>
    <h3>You are now logged in as <span>{$user.username}</span></h3>
  </div>
  <div>
    <Dashboard />
  </div>
  <div>
    <SignOut />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  span {
    color: rgb(18, 123, 18);
  }

  div {
    padding: 10px;
  }
</style>
