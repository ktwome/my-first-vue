import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import type {Post, NewPost} from "@/types/board.ts";

export const useBoardStore = defineStore('board', () => {
  // 게시글 데이터 정의
  const posts = ref<Post[]>([]); // Post 타입, 기본값은 빈 배열.
  const currentID = ref(1); //기본값은 1

  // 모든 게시글 가져오기 (posts 게터)
  const getAllPosts = computed(() => posts.value);

  // ID를 통해 게시글 검색 후 가져오기
  const getPostByID = (id: number) => {
    return (posts.value.find(post => post.id === id));
  };

  // 게시글 추가하기
  const addPost = (newPost: NewPost) => {
    const now = new Date();
    const post: Post = {
      id: currentID.value++,
      ...newPost,
      created_at: now,
      updated_at: null,
      views: 0
    };
    posts.value.push(post);
    return post.id;
  };

  // 게시글 수정
  const updatePost = (id: number, updatedData:Partial<Post>) => {
    const postIndex = posts.value.findIndex(post =>
      post.id === id);

    if (postIndex !== -1) {
      posts.value[postIndex] = {
        ...posts.value[postIndex],
        ...updatedData
      };
      return true;
    }
    return false;
  };

  const deletePost = (id: number) => {
    const postIndex = posts.value.findIndex(post =>
      post.id === id);

    if (postIndex !== -1) {
      posts.value.splice(postIndex, 1);
      return true;
    }
    return false;
  };

  const incrementView = (id: number) => {
    const post = posts.value.find(post => post.id === id);
    if (post) {
      post.views += 1;
      return true;
    }
    return false;
  };

  // 초기 데이터 (테스트용)
  const initializeData = () => {
    const now = new Date();
    posts.value = [
      {
        id: currentID.value++,
        title: '당신의 첫 게시글입니다.',
        content: '안녕하세요, 첫 번째 게시글입니다.',
        author: 'Donald J. Trump',
        created_at: now,
        updated_at: null,
        views: 0
      },
      {
        id: currentID.value++,
        title: '두 번째 게시글',
        content: '안녕하세요, 두 번째 게시글입니다.',
        author: '김철수',
        created_at: new Date(now.getTime() - 86400000), // 1일 전
        updated_at: null,
        views: 5
      }
    ];
  };

  // 초기 데이터 로드
  initializeData();

  return {
    posts,
    getAllPosts,
    getPostByID,
    addPost,
    updatePost,
    deletePost,
    incrementView
  }
})
