<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>
        <h4 class="">Ktwome's First Vue</h4>
      </v-app-bar-title>
      <v-spacer />
      <v-btn to="/">홈</v-btn>
      <v-btn to="/board" text>게시판</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <div class="text-center w-100">
        {{new Date().getFullYear()}} - <strong>Ktwome17</strong>
      </div>
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">

</script>

<style>
/* 글로벌 스타일 - scoped 아님 */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/variable/pretendardvariable.css");

/* 강제 적용을 위한 CSS */
.v-application *,
.v-application .text-h1,
.v-application .text-h2,
.v-application .text-h3,
.v-application .text-h4,
.v-application .text-h5,
.v-application .text-h6,
.v-application .text-subtitle-1,
.v-application .text-subtitle-2,
.v-application .text-body-1,
.v-application .text-body-2,
.v-application .text-button,
.v-application .text-caption,
.v-application .text-overline,
.v-btn,
.v-card,
.v-card-title,
.v-card-text {
  font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif !important;
  letter-spacing: normal !important;
}

</style>

