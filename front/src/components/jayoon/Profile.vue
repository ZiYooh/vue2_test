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
                  <td>{{ sex }}</td>
                </tr>
                <tr>
                  <td>나이대</td>
                  <td>{{ age }}</td>
                </tr>
                <tr>
                  <td>지역</td>
                  <td>{{ location }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import jwtDecode from "jwt-decode";
export default {
	data() {
		const token = localStorage.usertoken;
		const decoded = jwtDecode(token);
		return {
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			sex: decoded.sex,
      age: decoded.age,
			location: decoded.location,
			email: decoded.email,
		};
	},
};
</script>

<style scoped>
td {
	background-color: white;
}
</style>
