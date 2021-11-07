<script>
	import { Router, Route } from "svelte-navigator";
	import { onMount } from "svelte";
	import Notifications from "svelte-notifications";

	import { loadUser, logout } from "./apis/auth";

	import PrivateRoute from "./components/privateRoute/PrivateRoute.svelte";

	import Nabvar from "./components/layout/Nabvar.svelte";
	import Landing from "./components/layout/Landing.svelte";
	import Footer from "./components/layout/Footer.svelte";
	import Register from "./components/auth/Register.svelte";
	import Login from "./components/auth/Login.svelte";
	import Template from "./components/template/Template.svelte";
	import UpdateTemplate from "./components/template/UpdateTemplate.svelte";
	import MyAccount from "./components/myAccount/MyAccount.svelte";
	import Dashboard from "./components/dashboard/Dashboard.svelte";

	onMount(() => {
		if (localStorage.token) {
			loadUser();
		}

		window.addEventListener("storage", () => {
			if (!localStorage.token) logout();
		});
	});
	export let url = "";
</script>

<main class="bg-light">
	<Notifications>
		<Nabvar />
		<div class="container">
			<Router {url}>
				<Route path="/" component={Landing} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<PrivateRoute path="/dashboard/template">
					<Template />
				</PrivateRoute>
				<PrivateRoute path="/dashboard/template/:tempId">
					<UpdateTemplate />
				</PrivateRoute>
				<PrivateRoute path="/myAccount">
					<MyAccount />
				</PrivateRoute>
				<PrivateRoute path="/dashboard">
					<Dashboard />
				</PrivateRoute>
			</Router>
		</div>
		<Footer />
	</Notifications>
</main>

<style>
	main {
		text-align: center;
		padding: p;
		margin: 0 auto;
	}
</style>
