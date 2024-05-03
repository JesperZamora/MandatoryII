<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import About from "./pages/About/About.svelte";
  import Profile from "./pages/Profile/Profile.svelte"
  import Register from "./pages/Register/Register.svelte"
  import Login from "./components/Login.svelte"
  import PrivateRoute from "./components/routes/PrivateRoute.svelte";
  

</script>

<Router>
  <nav>
    <Link to='/'>Home</Link>
    <Link to='/about'>About </Link>
    <Link to='/profile'>Profile</Link>
    <Link to='/register'>Register</Link>
  </nav>
  <div>
    <Route path="/"><Home/></Route>
    <Route path="/about"><About/></Route>
    <Route path="/login"><Login /></Route>
    <PrivateRoute path="/profile" let:location>
      <Profile/>
    </PrivateRoute>
    <Route path="/register"><Register/></Route>
  </div>
</Router>