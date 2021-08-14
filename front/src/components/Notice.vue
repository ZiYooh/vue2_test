<template>
  <v-content class="mx-15 mt-15">
    <h1>공지사항 페이지 입니다</h1>
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
            <td>서버 점검 입니다</td>
            <td>관리자</td>
            <td>2021/01/02</td>
          </tr>
          <tr>
            <td>01</td>
            <td>공지사항 입니다</td>
            <td>관리자</td>
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

</style>
