<script setup lang="ts">
import BoardList from "@/components/BoardList.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const createNewPost = () => {
  router.push('/board/create');
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="mb-6 font-bold">게시판</h1>
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            <span>게시글 목록</span>
            <v-btn color="primary" @click="createNewPost" dark>
              <v-icon icon="mdi-plus" />
              새 글 작성
            </v-btn>
          </v-card-title>
          <v-card-text>
            <BoardList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
