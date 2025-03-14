<script setup lang="ts">
import {computed} from "vue";
import {useBoardStore} from "@/stores/board.ts";
import {useRouter} from "vue-router";
import type { Post } from '@/types/board';

const boardStore = useBoardStore();
const posts = computed(() => boardStore.getAllPosts);

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const router = useRouter();
const viewPost = (id: number) => {
  router.push(`/board/${id}`);
}

</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">번호</th>
        <th class="text-left">제목</th>
        <th class="text-left">작성자</th>
        <th class="text-left">작성일</th>
        <th class="text-left">조회수</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="post in posts"
        :key="post.id"
        @click="viewPost(post.id)"
        class="cursor-pointer hover-effect"
      >
        <td>{{post.id}}</td>
        <td>{{post.title}}</td>
        <td>{{post.author}}</td>
        <td>{{formatDate(post.created_at)}}</td>
        <td>{{post.views}}</td>
      </tr>
      <tr v-if="posts.length === 0">
        <td colspan="5" class="text-center py-5">
          게시글이 없습니다.
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.hover-effect:hover {
  background-color: rgba(0, 0, 0, 10%);
}
.cursor-pointer {
  cursor: pointer;
}

</style>
