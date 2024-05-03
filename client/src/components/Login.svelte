<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { user, BASE_URL } from "../stores/generalStore.js";
  import { fetchPost } from "../util/api.js";

  const navigate = useNavigate();
  const location = useLocation();

  let username = "";
  let password = "";
  let loginError = false;

  async function loginUser(event) {
    event.preventDefault();

    const loginUser = { username, password };
    const data = await fetchPost($BASE_URL + "/api/login", loginUser);

    if (data.isMatch) {
      user.set({ username });
      const from = ($location.state && $location.state.from) || "/";
      navigate(from, { replace: true });
    } else {
      console.log("Login failed!");
      loginError = true;
    }
  }
</script>

<form on:submit={loginUser}>
  <h3>Login to access your dashboard</h3>
  <div>
    <label for="username">Username</label>
    <input
      id="username"
      type="text"
      bind:value={username}
      placeholder="JohnnyBravo"
      required
    />
  </div>
  <div>
    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      bind:value={password}
      placeholder="********"
      required
    />
  </div>
  <div>
    <button type="submit">Login to your profile</button>
  </div>
  {#if loginError}
    <p>Login failed. Please check your username and password.</p>
  {/if}
</form>

<style>
  h3 {
    text-align: center;
    padding: 5px;
    margin-bottom: 10px;
  }

  form {
    padding: 10px 20px;
    border: solid 1px lightgrey;
    border-radius: 10px;
    width: 300px;
    background: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: auto;
  }

  div {
    display: flex;
    flex-direction: column;
    padding: 5px;
    gap: 6px;
    margin-bottom: 8px;
  }

  label {
    font-size: 16px;
    font-weight: 400px;
  }

  input {
    border: solid 1px rgb(241, 241, 241);
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 8px;
    background-color: rgb(247, 247, 247);
  }

  button {
    border: none;
    font-size: 16px;
    padding: 5px;
    border-radius: 8px;
    background-color: rgb(18, 123, 18);
    color: white;
  }

  button:hover {
    background-color: rgb(14, 93, 14);
  }
</style>
