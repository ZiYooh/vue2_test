<template>
  <v-main>
		<v-content class="mx-15">
		<v-card
      class="mx-auto px-8 mt-7"
      max-width="1000"
    >
    <v-row>
      <v-col class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">
						로그인 (일반회원)
					</h1>
          <v-item-group>
            <label for="email">이메일 주소</label>
            <v-text-field
              type="email"
              v-model="email"
              class="form-control"
              name="email"
              label="Enter Your Email Address"></v-text-field>
            </v-item-group>
          <v-item-group>
            <label for="password">암호</label>
            <v-text-field
              type="password"
              v-model="password"
              class="form-control"
              name="password"
              label="Enter Your password"></v-text-field> 
          </v-item-group>
          <v-btn class="mb-5" large block color="primary" type="submit">
            로그인
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
		</v-card>
		</v-content>
  </v-main>
</template>

<script>
import axios from 'axios';
import router from '../../router';
//import EventBus from '../EventBus';

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
				.post("http://localhost:5000/users/login", {
					email: this.email,
					password: this.password,
				})
				.then((res) => {
					let token = res.data;
					if (res.data.success == false) {
						console.log(token);
						alert(res.data.message);
					}
					else{
						localStorage.setItem("usertoken", res.data);//성공했다면 data에 토큰이 있고, 실패했다면 err메시지담겨서옴
						this.email = "";
						this.password = "";
						//this.$store.state.user = 1;
						//console.log(this.$store.state.user);
						this.$store.dispatch("update_user", 1);
						//this.emitMethod();//이거를 성공했을 때만 emit하도록해야함
					}
					router.push({ name: "HelloWorld" });
				})
				.catch((err) => {
					console.log(err);
				});
			
		},
		// emitMethod() {
		// 	EventBus.$emit("logged-in", "loggedin");
		// },
	},
};
</script>