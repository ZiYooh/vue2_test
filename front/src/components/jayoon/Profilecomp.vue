<template>
	<div class="container">
		<div class="jumbotron mt-5">
			<div class="col-sm-8 mx-auto">
				<h1 class="text-center">My Profile</h1>
			</div>

			<table class="table col-md-6 mt-5 mx-auto">
				<thead class="thead-dark">
					<tr>
						<th scope="col">기업명</th>
						<td scope="col">{{ compName }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">기업번호</th>
						<td scope="col">{{ compNum }}</td>
					</tr>
				</thead>
				<thead class="thead-dark">
					<tr>
						<th scope="col">이메일</th>
						<td scope="col">{{ email }}</td>
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
