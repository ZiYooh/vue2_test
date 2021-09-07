<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="registercomp">
          <h1 class="h3 mb-3 font-weight-normal">
            Register As Company
          </h1>
          <div class="form-group">
            <label for="compName">기업명</label>
            <input
              type="text"
              v-model="compName"
              class="form-control"
              name="compName"
              placeholder="기업명"
            />
          </div>
          <div class="form-group">
            <label for="compNum">사업자등록번호</label>
            <input
              type="text"
              v-model="compNum"
              class="form-control"
              name="compNum"
              placeholder="사업자등록번호"
            />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              name="email"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              name="password"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button class="btn btn-lg btn-primary btn-block" type="submit">
            지금 등록하기
          </button>
        </form>
      </div>
    </div>
  </div>
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
          router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
