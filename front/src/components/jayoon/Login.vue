<template>
  <v-main>
    <v-row>
      <v-col md="6" class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">
						Please Sign In
					</h1>
          <v-item-group>
            <label for="email">Email Address</label>
            <v-text-field
              type="email"
              v-model="email"
              class="form-control"
              name="email"
              label="Enter Your Email Address"></v-text-field>
            </v-item-group>
          <v-item-group>
            <label for="password">Password</label>
            <v-text-field
              type="password"
              v-model="password"
              class="form-control"
              name="password"
              label="Enter Your password"></v-text-field> 
          </v-item-group>
          <v-btn large block color="primary" type="submit">
            Sign In
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from 'axios';
import router from '../../router';
import EventBus from '../EventBus';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:5000/users/login', {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.success == false) {
            // console.log("login failed");
            alert(res.data.message);
          } else {
            localStorage.setItem('usertoken', res.data);// 성공했다면 data에 토큰이 있고, 실패했다면 err메시지담겨서옴
            this.email = '';
            this.password = '';
            this.emitMethod();// 이거를 성공했을 때만 emit하도록해야함
          }
          router.push({ name: 'HelloWorld' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    emitMethod() {
      EventBus.$emit('logged-in', 'loggedin');
    },
  },
};
</script>
