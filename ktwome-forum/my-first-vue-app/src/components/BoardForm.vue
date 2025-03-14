<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useBoardStore} from "@/stores/board.ts";
import type {NewPost} from "@/types/board.ts";

const error = ref<string | null>(null);
const loading = ref(false);

const title = ref('');
const content = ref('');
const author = ref('');

const boardStore = useBoardStore();
const router = useRouter();

onMounted(() => {
  if (isEditMode.value) {
    const postID = parseInt(props.id || route.params.id as string);
    if (isNaN(postID)) {
      error.value = '유효하지 않은 게시글 ID입니다.';
      return;
    }

    const post = boardStore.getPostByID(postID);

    if (post) {
      title.value = post.title;
      content.value = post.content;
      author.value = post.author;
    } else {
      error.value = '게시글을 찾을 수 없습니다.';
    }
  }
})
const submitForm = () => {
  if (!title.value.trim()){
    alert('제목을 입력해주세요!');
    return;
  }
  if (!content.value.trim()){
    alert('내용을 입력해주세요!');
    return;
  }
  if (!author.value.trim()){
    alert('작성자 이름을 입력해주세요!');
    return;
  }

  loading.value = true;

  try {
    if (isEditMode.value) {
      const postID = parseInt(props.id || route.params.id as string);
      boardStore.updatePost(postID, {
        title: title.value,
        content: content.value,
        author: author.value
      });
      router.push(`/board/${postID}`);
    }
    else {
      const newPost:NewPost = {
        title : title.value,
        content : content.value,
        author: author.value
      };

      const newID = boardStore.addPost(newPost);
      router.push(`/board/${newID}`);
    }
  } catch (e) {
    error.value = '게시글 저장 중 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};

const props = defineProps<{
  id?: string;
}>();

const route = useRoute();
const isEditMode = computed(() => {
  return !!props.id || !!route.params.id;
});

const cancel = () => {
  if (isEditMode.value) {
    router.push(`/board/${props.id || route.params.id as string}`);
  } else {
    router.push('/board');
  }
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{isEditMode ? '게시글 수정' : '새 게시글 작성'}}
          </v-card-title>

          <v-card-text>
            <!-- 에러-->
            <v-container v-if="error">
              <v-alert type="error" class="mb-4">
                {{error}}
              </v-alert>
              <v-btn
                color="error"
                to="/board"
                :disabled="loading"
                :loading="loading"
                class="mr-2"
              >돌아가기</v-btn>
            </v-container>

            <v-form v-else @submit.prevent="submitForm">
              <v-text-field
                v-model="title"
                label="제목"
                required
                :disabled="loading"
              />

              <v-text-field
                v-model="author"
                label="작성자"
                required
                :disabled="loading"
              />

              <v-textarea
                v-model="content"
                label="내용"
                required
                :disabled="loading"
                rows="10"
              />

              <div class="d-flex justify-end">
                <v-btn
                  color="primary"
                  type="submit"
                  :disabled="loading"
                  :loading="loading"
                  class="mr-2"
                >
                  {{ isEditMode ? '수정하기' : '작성하기'}}
                </v-btn>
                <v-btn
                  @click="cancel"
                  :disabled="loading"
                  color="error"
                  variant="tonal">
                  취소
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
