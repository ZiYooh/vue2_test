<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">
            Register An Account
          </h1>
          <div class="form-group">
            <label for="firstName">성</label>
            <input
              type="text"
              v-model="firstName"
              class="form-control"
              name="firstName"
              placeholder="First Name"
            />
          </div>
          <div class="form-group">
            <label for="lastName">이름</label>
            <input
              type="text"
              v-model="lastName"
              class="form-control"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div class="form-group">
            <label for="email">이메일</label>
            <input
              type="email"
              v-model="email"
              class="form-control"
              name="email"
              placeholder="Enter Your Email Address"
            />
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              v-model="password"
              class="form-control"
              name="password"
              placeholder="Enter Your password"
            />
          </div>

          <div class="form-group">
            <br />
            <label for="sex">성별</label>
            <br />
            <input type="radio" id="male" value="남" v-model="sex" />
            <label for="sex">남</label>
            <br />
            <input type="radio" id="female" value="여" v-model="sex" />
            <label for="sex">여</label>
            <br />
          </div>
          <div class="form-group">
            <br />
            <label for="location">지역</label>
            <br />
            <select v-model="location">
              <option disabled value="">지역을 선택하세요</option>
              <option>서울</option>
              <option>부산</option>
              <option>대구</option>
              <option>인천</option>
              <option>광주</option>
              <option>대전</option>
              <option>울산</option>
              <option>세종</option>
              <option>제주</option>
              <option>경기</option>
              <option>강원</option>
              <option>충북</option>
              <option>충남</option>
              <option>경북</option>
              <option>경남</option>
              <option>전북</option>
              <option>전남</option>
            </select>
          </div>

          <button class="btn btn-lg btn-primary btn-block" type="submit">
            Register Now
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sex: "",
      location: "",
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:5000/users/register", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          sex: this.sex,
          location: this.location,
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
