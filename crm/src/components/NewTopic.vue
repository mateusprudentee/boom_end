<script>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

export default {
  name: 'NewTopicDialog',
  emits: ['close', 'created'],
  props: {
    currentCategory: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const $q = useQuasar()
    const route = useRoute()
    
    const form = ref({
      title: '',
      category: props.currentCategory || '',
      content: '',
      tags: [],
      isSticky: false,
      isLocked: false,
      notifyReplies: true
    })
    
    const categories = ref([
      'Anúncios e Novidades',
      'Suporte',
      'Eventos',
      'Sugestões',
      'Off-topic'
    ])
    
    const tagOptions = ref([
      'Dúvida',
      'Bug',
      'Sugestão',
      'Discussão',
      'Ajuda',
      'Importante'
    ])
    
    const editorToolbar = [
      ['left', 'center', 'right', 'justify'],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['token', 'hr', 'link', 'custom_btn'],
      ['print', 'fullscreen'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
        },
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana'
          ]
        },
        'removeFormat'
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['undo', 'redo'],
      ['viewsource'],
      ['insertImage', 'uploadImage'],
      ['spoiler'],
      ['emoji']
    ]
    
    const isLoading = ref(false)
    const hasTitleError = ref(false)
    const hasContentError = ref(false)
    
    const categoryColor = computed(() => {
      const category = form.value.category
      if (category.includes('Anúncios')) return 'red'
      if (category.includes('Suporte')) return 'blue'
      if (category.includes('Eventos')) return 'green'
      if (category.includes('Sugestões')) return 'orange'
      return 'grey'
    })
    
    onMounted(() => {
      // Se a categoria veio da rota, definir como padrão
      if (route.params.category) {
        form.value.category = route.params.category
      }
    })
    
    async function handleSubmit() {
      // Validação
      hasTitleError.value = !form.value.title.trim()
      hasContentError.value = !form.value.content.trim()
      
      if (hasTitleError.value || hasContentError.value) {
        $q.notify({
          type: 'negative',
          message: 'Por favor, preencha todos os campos obrigatórios'
        })
        return
      }
      
      isLoading.value = true
      
      try {
        const response = await fetch('http://localhost:3001/api/forum/topics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            title: form.value.title,
            category: form.value.category,
            content: form.value.content,
            tags: form.value.tags,
            isSticky: form.value.isSticky,
            isLocked: form.value.isLocked,
            notifyReplies: form.value.notifyReplies
          })
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Erro ao criar tópico')
        }
        
        const newTopic = await response.json()
        emit('created', newTopic)
        $q.notify({
          type: 'positive',
          message: 'Tópico criado com sucesso!',
          position: 'top'
        })
        emit('close')
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message || 'Erro ao criar tópico',
          position: 'top'
        })
        console.error('Error creating topic:', error)
      } finally {
        isLoading.value = false
      }
    }
    
    function handleCancel() {
  // Verificar se há conteúdo não salvo
  if (form.value.title || form.value.content) {
    $q.dialog({
      dark: true,
      title: 'Descartar alterações?',
      message: 'Você tem alterações não salvas. Deseja realmente sair?',
      persistent: true,
      ok: {
        label: 'Sair',
        color: 'negative',
        flat: true
      },
      cancel: {
        label: 'Continuar editando',
        color: 'primary',
        flat: true
      }
    }).onOk(() => {
      emit('close')
    })
  } else {
    emit('close')
  }
}
    
    return {
      form,
      categories,
      tagOptions,
      editorToolbar,
      isLoading,
      hasTitleError,
      hasContentError,
      categoryColor,
      handleSubmit,
      handleCancel
    }
  }
}
</script>

<template>
    <q-card class="new-topic-dialog dark-theme">
      <!-- Cabeçalho -->
      <q-card-section class="dialog-header bg-grey-10">
        <div class="row items-center no-wrap full-width">
          <div class="text-h5 text-weight-bold text-orange">Novo Tópico</div>
          <q-space />
          <div class="row" style="align-items: right; justify-content: right; align-self: right; margin-left: auto;">
            <q-chip 
              v-if="form.category"
              :label="form.category"
              color="grey-9"
              text-color="white"
              class="q-mr-sm"
            />
            <q-btn 
              icon="close" 
              flat 
              round 
              dense 
              @click="handleCancel"
            />
          </div>
        </div>
      </q-card-section>

      <!-- Conteúdo principal -->
      <q-card-section class="scroll dialog-content">
        <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
          <!-- Campo de título -->
          <q-input 
            v-model="form.title"
            placeholder="Título do tópico"
            :rules="[val => !!val || 'Campo obrigatório']"
            :error="hasTitleError"
            error-message="O título é obrigatório"
            filled
            class="title-input"
            input-class="text-white"
          />

          <q-input 
            v-model="form.content"
            placeholder="Mensagem"
            style="margin-top: -10px;"
            filled
            type="textarea"
            class="message-input"
            input-class="text-white"
          />
          
          <!-- Editor de conteúdo -->
          <q-editor
            v-model="form.content"
            :toolbar="editorToolbar"
            min-height="400px"
            :class="{ 'has-error': hasContentError }"
            content-class="bg-grey-9"
            toolbar-toggle-color="orange"
            toolbar-text-color="white"
            toolbar-bg="grey-8"
            toolbar-outline
          />
          <div v-if="hasContentError" class="text-negative q-mt-xs">O conteúdo é obrigatório</div>
          
          <!-- Opções avançadas (já aberto) -->
          <q-expansion-item
            label="Opções avançadas"
            header-class="text-subtitle1 text-weight-medium bg-grey-10"
            class="advanced-options"
            default-opened
          >
            <div class="q-pa-md q-gutter-y-sm" style="width: 400px;">
              <q-checkbox 
                v-model="form.isSticky"
                label="Fixar tópico (aparecerá no topo da lista)"
                color="red"
                dense
              />
              <q-checkbox 
                v-model="form.isLocked"
                label="Trancar tópico (impedir novas respostas)"
                color="red"
                dense
              />
              <q-checkbox 
                v-model="form.notifyReplies"
                label="Receber notificações de novas respostas"
                color="red"
                dense
              />
            </div>
          </q-expansion-item>
        </q-form>
      </q-card-section>
      
      <!-- Rodapé -->
      <q-card-actions align="right" class="dialog-footer bg-grey-10">
        <q-btn 
          label="Cancelar" 
          flat 
          color="white" 
          @click="handleCancel"
          class="cancel-btn q-mr-sm"
        />
        <q-btn 
          label="Publicar" 
          color="primary" 
          :loading="isLoading"
          @click="handleSubmit"
          :disable="!form.title || !form.content"
        />
      </q-card-actions>
    </q-card>
</template>

<style scoped lang="scss">
.new-topic-dialog {
  background: #000000;
  color: white;
  width: 700px;
  max-width: 90vw;
  font-family: 'Ubuntu', sans-serifs;
  border-radius: 20px;
  border: 1px solid rgb(31, 31, 31);
  
  &.dark-theme {
    background: #0c0c0c;
    
    :deep(.q-field--filled .q-field__control) {
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border-radius: 4px;
      
      &:before {
        border-color: rgba(255, 255, 255, 0.2);
      }
      
      &:hover:before {
        border-color: rgba(255, 165, 0, 0.5);
      }
    }
    
    :deep(.q-field__label) {
      color: rgba(255, 255, 255, 0.6);
    }
    
    :deep(.q-field__native) {
      color: white;
    }
    
    :deep(.q-chip) {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  
  .dialog-header {
    border-bottom: 1px solid rgb(37, 37, 37);
    padding: 16px;
    
    .row.items-center {
      gap: 8px;
    }
  }
  
  .dialog-content {
    padding: 20px;
    max-height: 70vh;
    overflow-y: auto;
  }
  
  .dialog-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 16px;
    
    .cancel-btn:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  .title-input {
    :deep(.q-field__control) {
      height: 56px;
      font-size: 1.1rem;
    }
  }
  
  .message-input {
    :deep(.q-field__control) {
      min-height: 300px;
    }
  }
  
  .advanced-options {
    :deep(.q-expansion-item__content) {
      border: 1px solid rgba(54, 54, 54, 0.2);
      border-radius: 4px;
      color: gray;
    }
  }
  
  :deep(.q-editor) {
    border: 1px solid rgba(255, 165, 0, 0.3);
    border-radius: 4px;
    
    &.has-error {
      border-color: #f44336;
    }
    
    .q-editor__toolbar {
      border-bottom: 1px solid rgba(255, 165, 0, 0.2);
    }
    
    .q-editor__content {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}

@media (max-width: 600px) {
  .new-topic-dialog {
    width: 100%;
    max-width: 100%;
    margin: 0;
    border-radius: 0;
    
    .dialog-content {
      padding: 12px;
    }
    
    .title-input {
      :deep(.q-field__control) {
        height: 48px;
        font-size: 1rem;
      }
    }
    
    .message-input {
      :deep(.q-field__control) {
        min-height: 300px;
      }
    }
  }
}
</style>