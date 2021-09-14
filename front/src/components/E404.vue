<template>
  <v-main class="mt-15 text-center">
    <span class="a404title">
      404
    </span><br>
    <span class="a404titlesub">
      PAGE NOT FOUND
    </span><br><br><br>
    <span class="adesc">
      잘못된 주소이거나 삭제된 페이지 입니다.
    </span><br><br>
    <v-btn
      text
      to="/"
    >
      처음으로
    </v-btn>
  </v-main>
</template>

<script>

</script>

<style>
.a404title {
  font-size: 80px;
}
.a404titlesub {
  font-size: 32px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.adesc {
  margin-top: 20px;
  margin-bottom: 32px;
}
</style>
