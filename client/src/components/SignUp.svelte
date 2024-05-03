<script>
  import { navigate } from "svelte-navigator";
  import { fetchPost } from "../util/api";
  import { BASE_URL } from "../stores/generalStore";
  let username = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let signupError = '';

  function validateInputs() {
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!email.includes('@')) {
      return 'Please enter a valid email address.';
    }
    return '';
  }

  async function signupUser(event) {
    event.preventDefault();
    signupError = validateInputs();

    if (signupError) {
      console.error(signupError);
      return;
    }
    
    try {
      const user = { username, email, password }
      const data = await fetchPost($BASE_URL + "/api/signup", user);
      
      if (data.created) {
        navigate("/profile");
      } else {
        signupError = data.message || 'Registration failed for unknown reasons';
      }
    } catch(err) {
      console.log("Sign up error:", err);
      signupError = err.message || 'Failed to sign up due to network or server error';
    }
  }
</script>

<h3>Sign Up</h3>
<form on:submit={signupUser}>
  <div>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} required>
  </div>
  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} required>
  </div>
  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required>
  </div>
  <div>
    <label for="confirmPassword">Confirm Password:</label>
    <input id="confirmPassword" type="password" bind:value={confirmPassword} required>
  </div>
  <div>
    <button type="submit">Sign Up</button>
  </div>
  {#if signupError}
    <p style="color: red;">{signupError}</p>
  {/if}
</form>
