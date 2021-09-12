<template>
	<v-main>
		<h1 class="text-center">User List</h1>
		<v-row>
			<v-col md="6" class="mt-5 mx-auto">
				<v-simple-table>
          <template v-slot:default>
						<thead>
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
