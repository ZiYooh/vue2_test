<template>
  <v-main>
    <v-content class="mx-15">
		<v-card
      class="mx-auto px-8 mt-7"
      max-width="1000"
    >
    <v-row>
      <v-col class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">
						회원가입 (일반회원)
					</h1>
          <v-item-group>
            <label for="firstName">성</label>
            <v-text-field
              type="text"
              v-model="firstName"
              class="form-control"
              name="firstName"
              label="First Name"></v-text-field>
            </v-item-group>
          <v-item-group>
            <label for="lastName">이름</label>
            <v-text-field
              type="text"
              v-model="lastName"
              class="form-control"
              name="lastName"
              label="Last Name"></v-text-field> 
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
          <label>성별</label>
          <v-radio-group
            v-model="sex">
            <v-radio
              id="male"
              value="남"
            >
              <template v-slot:label>
                <div><strong>남</strong></div>
              </template>
            </v-radio>
            <v-radio
              id="female"
              value="여"
            >
              <template v-slot:label>
                <div><strong>여</strong></div>
              </template>
            </v-radio>
          </v-radio-group>
          <label for="age">나이대</label>
          <v-select
            v-model="age"
            :items="age_list"
            placeholder="나이대를 선택하세요"
            prepend-icon="mdi-account-clock"
            outlined
          ></v-select>
          <label for="location">지역</label>
          <v-select
            v-model="location"
            :items="locations_list"
            placeholder="지역을 선택하세요"
            prepend-icon="mdi-map"
            outlined
          ></v-select>
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sex: "",
      age: "",
      location: "",
      locations_list: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
                  '제주', '경기', '강원', '충북', '충남', '경북', '경남', '전북', '전남'],
      age_list: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
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
          age: this.age,
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
