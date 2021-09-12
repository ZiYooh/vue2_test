<template>
	<v-main>
		<h1 class="text-center">User List</h1>
		<v-row>
			<v-col md="6" class="mt-5 mx-auto">
				<v-simple-table>
          <template v-slot:default>
						<thead class="thead-dark">
							<tr>
								<th scope="col">#</th>
								<th scope="col">First Name</th>
								<th scope="col">Last Name</th>
								<th scope="col">Email</th>
								<th scope="col">Sex</th>
								<th scope="col">Location</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(user, index) in users" :key="user.id">
								<td>{{ index + 1 }}</td>
								<td>{{ user.firstName }}</td>
								<td>{{ user.lastName }}</td>
								<td>{{ user.email }}</td>
								<td>{{ user.sex }}</td>
								<td>{{ user.location }}</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
	</v-main>
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
		axios.get("http://localhost:5000/users/userlist").then((response) => {
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
