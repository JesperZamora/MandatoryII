<script>
  import { useNavigate, useLocation } from "svelte-navigator";
	import { user, BASE_URL } from "../stores/generalStore.js";
  import { fetchPost } from "../util/api.js";

  const navigate = useNavigate();
	const location = useLocation();

  let username = '';
  let password = '';
  let loginError = false;

  async function loginUser(event) {
    event.preventDefault();

    const loginUser = { username, password }
    const data = await fetchPost($BASE_URL + "/api/login", loginUser);

 
    if (data.isMatch) {
      user.set({ username });
      const from = ($location.state && $location.state.from) || "/";
      navigate(from, { replace: true });
      console.log('Logged in successfully!');
    } else {
      console.log('Login failed!');
      loginError = true;
    }
  }

</script>


<h3>Login</h3>
<form on:submit={loginUser}>
  <div>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} required>
  </div>
  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required>
  </div>
  <div>
    <button type="submit">Login</button>
  </div>
  {#if loginError}
    <p>Login failed. Please check your username and password.</p>
  {/if}
</form>