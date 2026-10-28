<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'
import VMdEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import hljs from 'highlight.js'

VMdEditor.use(githubTheme, { Hljs: hljs })
VMdPreview.use(githubTheme, { Hljs: hljs })

const { data, pending, error } = await useFetch('/api/hello', {
  method: 'POST',
  body: { name: 'Александр2222' }
})

const isEditing = ref(false)
const markdownText = ref(data?.value?.content || '# Привет!')
</script>

<template>
  <div>
    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>

    <div v-else>
      <button @click="isEditing = !isEditing">
        {{ isEditing ? 'В режим просмотра' : 'Редактировать' }}
      </button>

      <VMdEditor
        v-if="isEditing"
        v-model="markdownText"
        :key="'editor-' + isEditing"
        height="600px"
        placeholder="Введите текст..."
      />
      <VMdPreview
        v-else
        :text="markdownText"
        class="prose dark:prose-invert max-w-none p-4 border rounded"
      />
    </div>
  </div>
</template>