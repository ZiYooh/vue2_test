<template>
  <v-main>
    <v-content class="mx-15">
		<v-card
      class="mx-auto px-8 mt-7"
      max-width="1000"
    >
    <v-row>
      <v-col class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="registercomp">
          <h1 class="h3 mb-3 font-weight-normal">
						회원가입 (기업회원)
					</h1>
          <v-item-group>
            <label for="compName">기업명</label>
            <v-text-field
              type="text"
              v-model="compName"
              class="form-control"
              name="compName"
              label="Company Name"></v-text-field>
            </v-item-group>
          <v-item-group>
            <label for="compNum">사업자등록번호</label>
            <v-text-field
              type="text"
              v-model="compNum"
              class="form-control"
              name="compNum"
              label="Business registration number"></v-text-field> 
          </v-item-group>
          <v-item-group>
            <label for="email">이메일</label>
            <v-text-field
              type="email"
              v-model="email"
              class="form-control"
              name="email"
              label="Enter Your Email Address"></v-text-field> 
          </v-item-group>
          <v-item-group>
            <label for="email">비밀번호</label>
            <v-text-field
              type="password"
              v-model="password"
              class="form-control"
              name="password"
              label="Enter Your password"></v-text-field> 
          </v-item-group>
          <v-btn class="mb-5" large block color="primary" type="submit">
            회원가입
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    </v-card>
    </v-content>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      compName: "",
      compNum: "",
      email: "",
      password: "",
    };
  },
  methods: {
    registercomp() {
      axios
        .post("http://localhost:5000/users/registercomp", {
          compName: this.compName,
          compNum: this.compNum,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          router.push({ name: "Logincomp" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
