<template>
  <v-main>
    <v-row>
      <v-col md="6" class="mt-5 mx-auto">
        <v-form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">
						원하는 투표를 설정하세요
					</h1>
          <v-item-group>
            <label for="voteName">투표 제목</label>
            <v-text-field
              type="text"
              v-model="voteName"
              class="form-control"
              name="voteName"
              label="투표 제목"></v-text-field>
          </v-item-group>
          <v-item-group>
            <label for="startDate">투표 시작일</label>
            <v-text-field
              type="date"
              v-model="startDate"
              class="form-control"
              name="startDate"
              label="투표 시작일"></v-text-field> 
          </v-item-group>
          <v-item-group>
            <label for="endDate">투표 마감일</label>
            <v-text-field
              type="date"
              v-model="endDate"
              class="form-control"
              name="endDate"
              label="투표 마감일"></v-text-field> 
          </v-item-group>
          <v-item-group>
            <label for="candidate1">후보 등록</label>
            <v-text-field
              outlined
              dense
              type="text"
              v-model="candidate1"
              class="form-control"
              name="voteName"
              placeholder="후보1"></v-text-field>
            <v-text-field
              outlined
              dense
              type="text"
              v-model="candidate2"
              class="form-control"
              name="voteName"
              placeholder="후보2"></v-text-field>
            <v-text-field
              outlined
              dense
              type="text"
              v-model="candidate3"
              class="form-control"
              name="voteName"
              placeholder="후보3"></v-text-field>
          </v-item-group>
          <v-item-group>
            <label for="description">투표 설명</label>
            <v-text-field
              type="textarea"
              v-model="description"
              class="form-control"
              name="description"
              placeholder="투표의 목적과 정보를 적으세요"></v-text-field>
          </v-item-group>
          <v-btn large block color="info" type="submit">
            투표 만들기!
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import axios from "axios";
import router from "../../router";

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
          router.push({ name: "HelloWorld" });
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
