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
                  <td>기업명</td>
                  <td>{{ compName }}</td>
                </tr>
                <tr>
                  <td>기업번호</td>
                  <td>{{ compNum }}</td>
                </tr>
                <tr>
                  <td>이메일</td>
                  <td>{{ email }}</td>
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
			compName: decoded.compName,
			compNum: decoded.compNum,
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
