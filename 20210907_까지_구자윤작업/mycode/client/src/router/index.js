import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logincomp from "../views/Logincomp.vue";
import Register from "../views/Register.vue";
import Registercomp from "../views/Registercomp.vue";
import Profile from "../views/Profile.vue";
import Profilecomp from "../views/Profilecomp.vue";
import UserList from "../views/UserList.vue";
import UserListcomp from "../views/UserListcomp.vue";
import MakeVote from "../views/MakeVote.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",// "/"로 접근할 경우 componet 로 보내줌
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/logincomp",
		name: "Logincomp",
		component: Logincomp,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/registercomp",
		name: "Registercomp",
		component: Registercomp,
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
	},
	{
		path: "/profilecomp",
		name: "Profilecomp",
		component: Profilecomp,
	},
	{
		path: "/userlist",
		name: "UserList",
		component: UserList,
	},
	{
		path: "/userlistcomp",
		name: "UserListcomp",
		component: UserListcomp,
	},
	{
		path: "/makevote",
		name: "MakeVote",
		component: MakeVote,
	},

	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	// }
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
