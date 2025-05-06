<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IEditorConfig } from '@wangeditor/editor'

export default {
  components: { Editor, Toolbar },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref(props.modelValue)

    // 监听 modelValue 的变化
    watch(() => props.modelValue, (newVal) => {
      valueHtml.value = newVal
    })

    // 监听 valueHtml 的变化，触发 update:modelValue 事件
    watch(valueHtml, (newVal) => {
      emit('update:modelValue', newVal)
    })

    const toolbarConfig = {
      toolbarKeys: [
        'headerSelect',
        'bold',
        'italic',
        'underline',
        'through',
        'color',
        'bgColor',
        '|',
        'bulletedList',
        'numberedList',
        'todo',
        '|',
        'emotion',
        'insertLink',
        'uploadImage',
        'insertTable',
        'codeBlock',
        'divider',
        '|',
        'undo',
        'redo',
        '|',
        'fullScreen'
      ]
    }

    const editorConfig: Partial<IEditorConfig> = { 
      placeholder: '请输入内容...',
      MENU_CONF: {
        uploadImage: {
          // 自定义上传图片
          customUpload(file: File, insertFn: any) {
            // 将图片转换为 base64
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              // 插入图片
              insertFn(reader.result)
            }
          }
        }
      }
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
}
</script>