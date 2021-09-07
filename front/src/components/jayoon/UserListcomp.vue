<template>
	<div class="container">
		<div class="jumbotron mt-5">
			<div class="col-sm-8 mx-auto">
				<h1 class="text-center">User List</h1>
			</div>
			<table class="table mt-5 mx-auto">
				<thead class="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">기업명</th>
						<th scope="col">기업번호</th>
						<th scope="col">이메일</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(user, index) in users" :key="user.id">
						<td>{{ index + 1 }}</td>
						<td>{{ user.compName }}</td>
						<td>{{ user.compNum }}</td>
						<td>{{ user.email }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			users: [],
		};
	},
	created() {
		axios.get("http://localhost:5000/users/userlistcomp").then((response) => {
			this.users = response.data;
		});
	},
};
</script>

<style scoped>
td {
	background-color: white;
}
</style>
