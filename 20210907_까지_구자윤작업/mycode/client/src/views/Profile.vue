<template>
	<div class="container">
		<div class="jumbotron mt-5">
			<div class="col-sm-8 mx-auto">
				<h1 class="text-center">My Profile</h1>
			</div>

			<table class="table col-md-6 mt-5 mx-auto">
				<thead class="thead-dark">
					<tr>
						<th scope="col">성</th>
						<td scope="col">{{ firstName }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">이름</th>
						<td scope="col">{{ lastName }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">이메일</th>
						<td scope="col">{{ email }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">성별</th>
						<td scope="col">{{ sex }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">지역</th>
						<td scope="col">{{ location }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">Last Name</th>
						<td scope="col">{{ lastName }}</td>
					</tr>
				</thead>
			</table>
		</div>
	</div>
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
