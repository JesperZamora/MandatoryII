<script>
  import { navigate } from "svelte-navigator";
  import { fetchPost } from "../util/api";
  import { BASE_URL } from "../stores/generalStore";
  import toast, { Toaster } from "svelte-french-toast";

  let username = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let signupError = "";

  function validateInputs() {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!email.includes("@")) {
      return "Please enter a valid email address.";
    }
    return "";
  }

  async function signupUser(event) {
    event.preventDefault();
    signupError = validateInputs();

    if (signupError) {
      console.error(signupError);
      return;
    }

    try {
      const user = { username, email, password };
      const data = await fetchPost($BASE_URL + "/api/signup", user);

      if (data.created) {
        toast.promise(
          new Promise((resolve, reject) => {
            setTimeout(resolve, 1000);
            setTimeout(() => navigate("/login"), 1500);
          }),
          {
            loading: "Signing up...",
            success: "Successfully signed up!",
            error: "Could not sign up.",
          }
        );
      } else {
        signupError = data.message || "Registration failed for unknown reasons";
      }
    } catch (err) {
      console.log("Sign up error:", err);
      signupError =
        err.message || "Failed to sign up due to network or server error";
    }
  }
</script>

<form on:submit={signupUser}>
  <h3>Sign up to make a profile</h3>
  <div>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} required />
  </div>
  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} required />
  </div>
  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required />
  </div>
  <div>
    <label for="confirmPassword">Confirm Password:</label>
    <input
      id="confirmPassword"
      type="password"
      bind:value={confirmPassword}
      required
    />
  </div>
  <div>
    <button type="submit">Sign Up</button>
  </div>
  {#if signupError}
    <p style="color: red;">{signupError}</p>
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
