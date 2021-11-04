<script>
  import { Router, Link } from "svelte-navigator";
  import { logout } from "../../apis/auth";

  import { auth } from "../../store";

  const logoutUser = () => {
    logout();
  };

  let isAuth;

  auth.isAuthenticated.subscribe((value) => {
    isAuth = value;
  });
</script>

<Router>
  <nav
    class="navbar navbar-expand-sm bg-dark navbar-dark py-2 px-4 justify-content-between"
  >
    <div class="d-flex">
      <Link class="navbar-brand " to="/">MEDNOOR</Link>
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
    {#if isAuth}
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" to="/myAccount">My Account</Link>
        </li>
        <li class="nav-item">
          <div class="nav-link logout-btn" on:click={logoutUser}>Logout</div>
        </li>
      </ul>
    {:else}
      <ul class="navbar-nav">
        <li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/register">Sign Up</Link>
        </li>
      </ul>
    {/if}
  </nav>
</Router>

<style>
  .logout-btn {
    cursor: pointer;
  }

  .navbar {
    overflow: hidden;
    position: fixed;
    width: 100vw;
    top: 0;
    z-index: 1;
  }
</style>
