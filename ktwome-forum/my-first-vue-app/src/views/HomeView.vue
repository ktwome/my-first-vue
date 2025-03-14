<script setup lang="ts">
import { ref } from 'vue'
const counter = ref(0)
function upCounter() {
  counter.value++
}

const name = defineModel('name')
function submit() {
  alert(name.value)
}
</script>

<template>
  <v-app>
    <v-card>
      <v-card-title class="text-h4 font-weight-bold"> This is the home page </v-card-title>

      <v-card-text>
        <p class="text-h6">안녕하세요 홈페이지입니다.</p>
        <p>
          여기는 홈페이지에요. 그래요. 별건 없습니다.
        </p>
        <p>
          저희는 게시판이 메인이에요. 그 쪽으로 가보시는 건 어떤가요?
        </p>
      </v-card-text>

      <v-form @submit.prevent="submit" style="max-width: 500px">
        <v-text-field
          label="여기에 무언가를 작성해보세요"
          v-model="name"
          max-width="70%"
        />
        <v-spacer/>
        <v-btn color="success" @click="submit" variant="tonal">엔터를 누르세요.. 그래도 이 버튼을 눌러도 지장은 없어요</v-btn>
      </v-form>

      <v-card-actions>
        <v-btn color="secondary" variant="tonal" @click="upCounter">
          현재 클릭수 : {{ counter }}
        </v-btn>
        <v-spacer />
        <v-btn color="success" variant="flat" to="/board">
          그러면 게시판으로 이동할게요.
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>
