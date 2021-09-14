<template>
  <v-main>
    <v-row>
      <v-col md="6" class="mt-5 mx-auto">
        <v-card
          elevation="2"
          outlined
        >
          <v-card-title class="text-center">My Profile</v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>성</td>
                  <td>{{ firstName }}</td>
                </tr>
                <tr>
                  <td>이름</td>
                  <td>{{ lastName }}</td>
                </tr>
                <tr>
                  <td>이메일</td>
                  <td>{{ email }}</td>
                </tr>
                <tr>
                  <td>성별</td>
                  <td>{{ result[0].sex }}</td>
                </tr>
                <tr>
                  <td>나이대</td>
                  <td>{{ result[0].age }}</td>
                </tr>
                <tr>
                  <td>지역</td>
                  <td>{{ result[0].location }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-col class="text-right">
            <v-btn class="text-center" large color="success" @click='modify()'>
                회원정보 수정
            </v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from "axios";
import jwtDecode from "jwt-decode";

export default {
	data() {
		const token = localStorage.usertoken;
		const decoded = jwtDecode(token);
		return {
      profile: [],
      result : '',
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			email: decoded.email,
			sex: decoded.sex,
      age: decoded.age,
			location: decoded.location,
		};
	},
  created() {
		axios.get("http://localhost:5000/users/getprofile").then((response) => {
			this.profile = response.data;
        var email = this.email;
        this.result = this.profile.filter(function(param){
        return param.email === email;
      });
      console.log(this.result[0]);
		});
	},

  methods: {
    modify() {
      this.$router.push({ name: "ModProfile" , query: {firstName: this.firstName, lastName: this.lastName, email: this.email, sex: this.result[0].sex, age: this.result[0].age, location: this.result[0].location}});
    },
    // sakjei() {
    //   this.$router.push({ name: "Notice"});
		// },
  },
};
</script>

<style scoped>
td {
	background-color: white;
}
</style>
