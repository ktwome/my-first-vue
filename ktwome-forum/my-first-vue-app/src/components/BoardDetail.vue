<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useBoardStore} from "@/stores/board.ts";

const props = defineProps<{
  id?: string;
}>();

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();

const post = ref<any>(null);
const loading = ref(true);
const error = ref(<string | null>(null));

onMounted(async () => {
  const postID = parseInt(props.id || route.options.params.id as string);

  if (isNaN(postID)){
    error.value = '유효하지 않은 게시글 ID입니다.';
    loading.value = false;
    return;
  }

  const foundPost = boardStore.getPostByID(postID);

  if (foundPost){
    post.value = foundPost;
    boardStore.incrementView(postID);
    loading.value = false;
  } else {
    error.value = '게시글을 찾을 수 없습니다.';
  }

  loading.value = false;
});

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const editPost = () => {
  router.push(`/board/${post.value.id}/edit`);
}

const deletePost = () => {
  if(confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
    boardStore.deletePost(post.value.id);
    router.push('/board');
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="loading">
          <!-- 로딩 -->
          <v-card-text>
            <v-progress-linear color="secondary" indeterminate height="10" class="mb-5"/>
            게시글을 불러오고 있어요..
          </v-card-text>
        </v-card>

        <!-- 에러 발생-->
        <v-card v-else-if="error">
          <v-card-text>
            <v-alert color="error" class="mb-6">{{error}}</v-alert>
            <v-btn to="/board" color="success" variant="tonal">목록으로 돌아가기</v-btn>
          </v-card-text>
        </v-card>

        <!--정상적으로 로드-->
        <v-card v-else>
          <v-card-title class="text-h4">
            {{post.title}}
          </v-card-title>

          <v-card-subtitle>
            <div class="d-flex justify-space-between">
              <span>작성자: {{post.author}}</span>
              <span>
                작성일: {{formatDate(post.created_at)}}
                <template v-if="post.updated_at">
                  (수정일: {{formatDate(post.updated_at)}})
                </template>
              </span>
            </div>
            <div class="text-right">조회수: {{post.views}}</div>
          </v-card-subtitle>

          <v-divider class="ma-5"/>

          <v-card-text>
            <div class="text-body-1 post-content">
              {{post.content}}
            </div>
          </v-card-text>

          <v-divider class="ma-5"/>

          <v-card-actions>
            <v-btn to="/board" color="success" variant="tonal">
              이전으로
            </v-btn>
            <v-spacer />
            <v-btn color="primary" @click="editPost">수정하기</v-btn>
            <v-btn color="error" @click="deletePost" variant="outlined">삭제하기</v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.post-content {
  min-height: 200px;
  white-space: pre-wrap;
}
</style>
