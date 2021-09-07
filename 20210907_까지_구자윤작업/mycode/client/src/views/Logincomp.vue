<template>
	<div class="container">
		<div class="row">
			<div class="col-md-6 mt-5 mx-auto">
				<form v-on:submit.prevent="login">
					<h1 class="h3 mb-3 font-weight-normal">
						로그인하세요
					</h1>
					<div class="form-group">
						<label for="email">Email Address</label>
						<input type="email" v-model="email" class="form-control" name="email" placeholder="Enter Your Email Address" />
					</div>
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Your password" />
					</div>
					<button class="btn btn-lg btn-primary btn-block" type="submit">
						로그인
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import router from "../router";
import EventBus from "../components/EventBus";

export default {
	data() {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		login() {
			axios
				.post("http://localhost:5000/users/logincomp", {
					email: this.email,
					password: this.password,
				})
				
				.then((res) => {
					if (res.data.success == false) {
						//console.log("login failed");
						alert(res.data.message);
					}
					else{
						localStorage.setItem("usertoken", res.data);//성공했다면 data에 토큰이 있고, 실패했다면 err메시지담겨서옴
						this.email = "";
						this.password = "";
						this.emitMethod();//이거를 성공했을 때만 emit하도록해야함
					}
					router.push({ name: "Home" });
				})
				.catch((err) => {
					console.log(err);
				});
			//this.emitMethod();
		},
		emitMethod() {
			EventBus.$emit("logged-in-by-comp", "loggedincomp");
		},
	},
};
</script>
