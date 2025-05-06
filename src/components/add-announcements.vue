<script setup lang="ts">
import { ref } from 'vue'
import { post } from '@/api/axios'
import { ANNOUNCEMENTS_SAVE } from '@/api/broker_api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import RichText from '@/components/RichText.vue'

const router = useRouter()

const form = ref({
  title: '',
  content: '',
  status: '1' // 1: 启用, 0: 禁用
})

const rules = {
  title: [
    { required: true, message: '请输入公告标题', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入公告内容', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择公告状态', trigger: 'change' }
  ]
}

const formRef = ref()

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    await post(ANNOUNCEMENTS_SAVE, form.value)
    ElMessage.success('添加成功')
    router.back()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<template>
  <div class="add-announcement-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>新增公告</span>
        </div>
      </template>
      
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        class="announcement-form"
      >
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入公告标题" />
        </el-form-item>
        
        <el-form-item label="公告内容" prop="content">
          <RichText v-model="form.content"></RichText>
        </el-form-item>
        
        <el-form-item label="公告状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.add-announcement-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-form {
  max-width: 800px;
  margin: 0 auto;
}
</style>