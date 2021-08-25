<template>
    <v-content class="mx-15 mt-15">
    <h2 class="text-center mb-3">묻고 답하기(Q&A)</h2>
    <v-simple-table class="mx-15" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              번호
            </th>
            <th class="text-left">
              제목
            </th>
            <th class="text-left">
              작성자
            </th>
            <th class="text-left">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>02</td>
            <td><router-link to="/" class="link">투표 개설 질문 입니다</router-link></td>
            <td>기업 회원1</td>
            <td>2021/01/02</td>
          </tr>
          <tr>
            <td>01</td>
            <td>질문 입니다</td>
            <td>회원1</td>
            <td>2021/01/01</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-content>
</template>

<script>

</script>

<style>
.link{
text-decoration: none;
}
</style>
