<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import * as VMdEditor from '@kangc/v-md-editor'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'

// Импорты CSS оставляем здесь (или переносим в nuxt.config)
import '@kangc/v-md-editor/lib/theme/style/github.css'
import 'prismjs/themes/prism.css'

const { data, pending, error } = await useFetch('/api/hello', {
  method: 'POST',
  body: { name: 'Александр2222' }
})

const isEditing = ref(false)
const markdownText = ref(data?.value?.content || '# Привет!')
const isPrismReady = ref(false)

onMounted(async () => {
  const prism = await import('prismjs');
  VMdEditor.use(githubTheme, { Prism: prism.default || prism });

  isPrismReady.value = true;
})
</script>

<template>
  <div>
    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>

    <div v-else>
      <button @click="isEditing = !isEditing">
        {{ isEditing ? 'В режим просмотра' : 'Редактировать' }}
      </button>

      <!-- ClientOnly изолирует редактор от серверного рендеринга -->
      <ClientOnly>
        <div v-if="isPrismReady">
          <v-md-editor 
            v-if="isEditing" 
            v-model="markdownText" 
            height="600px" 
            placeholder="Введите текст..."
          />
          <v-md-preview 
            v-else 
            :text="markdownText" 
            class="prose dark:prose-invert max-w-none p-4 border rounded" 
          />
        </div>
        
        <!-- Fallback пока грузится Prism -->
        <div v-else class="h-[600px] flex items-center justify-center border">
          Загрузка редактора...
        </div>
      </ClientOnly>
    </div>
  </div>
</template>