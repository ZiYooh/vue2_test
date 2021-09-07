<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">
            원하는 투표를 설정하세요
          </h1>
          <div class="form-group">
            <label for="voteName">투표 제목</label>
            <input
              type="text"
              v-model="voteName"
              class="form-control"
              name="voteName"
              placeholder="투표 제목"
            />
          </div>
          <div class="form-group">
            <label for="startDate">투표 시작일</label>
            <input
              type="date"
              v-model="startDate"
              class="form-control"
              name="startDate"
              placeholder="투표 시작일"
            />
          </div>
          <div class="form-group">
            <label for="endDate">투표 마감일</label>
            <input
              type="date"
              v-model="endDate"
              class="form-control"
              name="endDate"
              placeholder="투표 마감일"
            />
          </div>
          <div class="form-group">
            <label for="candidate1">후보 등록</label>
            <input
              type="text"
              v-model="candidate1"
              class="form-control"
              name="candidate1"
              placeholder="후보1"
            />
            <input
              type="text"
              v-model="candidate2"
              class="form-control"
              name="candidate2"
              placeholder="후보2"
            />
            <input
              type="text"
              v-model="candidate3"
              class="form-control"
              name="candidate3"
              placeholder="후보3"
            />
          </div>
          
          <div class="form-group">
            <label for="description">투표 설명</label>
            <input
              type="textarea"
              v-model="description"
              class="form-control"
              name="description"
              placeholder="투표의 목적과 정보를 적으세요"
            />
          </div>
          <!---
          <div class="form-group">
            <label for="description">투표 배너 첨부</label>
            <input
              @change='onInputImage()'
              ref="voteImage"
              type="file"
              class="form-control"
              name="voteImage"
            />
          </div>
          -->

          <button class="btn btn-lg btn-primary btn-block" type="submit">
            투표 만들기!
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  data() {
    return {
      voteName: "",
      startDate: "",
      endDate: "",
      cadidate1: "",
      cadidate2: "",
      cadidate3: "",
      description: "",
      //voteImage: "",
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:5000/users/makevote", {
          voteName: this.voteName,
          startDate: this.startDate,
          endDate: this.endDate,
          candidate1: this.candidate1,
          candidate2: this.candidate2,
          candidate3: this.candidate3,
          description: this.description,
          //voteImage: this.voteImage,
        })
        .then(() => {
          router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /*
    onInputImage(){
      this.voteimage = this.$refs.voteImage.files
      console.log(this.voteimage)
    },
    */
  },
};
</script>
