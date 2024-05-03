<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import About from "./pages/About/About.svelte";
  import Profile from "./pages/Profile/Profile.svelte"
  import Register from "./pages/Register/Register.svelte"
  import Login from "./components/Login.svelte"
  import PrivateRoute from "./routes/PrivateRoute.svelte";
  import toast, { Toaster } from "svelte-french-toast";

</script>

<Router>
  <header>
    <nav>
      <div class="logo">
        <h1>My-App</h1>
      </div>
      <div class="links">
        <Link to='/'>Home</Link>
        <Link to='/about'>About </Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/register'>Register</Link>
      </div>
    </nav>
  </header>
  <div>
    <Route path="/"><Home/></Route>
    <Route path="/about"><About/></Route>
    <Route path="/login"><Login /></Route>
    <PrivateRoute path="/profile" let:location>
      <Profile/>
    </PrivateRoute>
    <Route path="/register"><Register/></Route>
  </div>
  <Toaster />
</Router>

<style>
  header {
    position: fixed;
    top: 0;
    width: 100%;
  }
  nav { 
    padding: 12px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

</style>