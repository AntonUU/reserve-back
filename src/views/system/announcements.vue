<template>
  <div>
    <div class="container">

      <TableAnnouncements :columns="columns"
                          :tableData="tableData"
                          :viewFunc="handleView"
                          :changePage="changePage"
                          :del-func="delFun"
                          :edit-func="editFun"
                    :pass-func="handelPass"
                    :total="page.total"
                    :currentPage="page.index"
                    :pageSize="page.size">

        <template #status="{ rows }">
          <el-tag type="danger" v-if="rows.status">禁用</el-tag>
          <el-tag type="success" v-else>启用</el-tag>
        </template>

        <template #permissions="{ rows }">
          <el-button type="primary" size="small" plain @click="handlePermission(rows)">管理</el-button>
        </template>
      </TableAnnouncements>
    </div>

    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData">
        <template #status="{ rows }">
          <el-tag type="danger" v-if="rows.status">禁用</el-tag>
          <el-tag type="success" v-else>启用</el-tag>
        </template>
      </TableDetail>
    </el-dialog>
    <el-dialog title="权限管理" v-model="visible2" width="500px" destroy-on-close>
      <RolePermission :permiss-options="permissOptions"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="reserve-manage">

import {ANNOUNCEMENTS_ALL,
      ANNOUNCEMENTS_DEL,
} from '@/api/broker_api'
import {ref, reactive} from 'vue';
import {ReserveManage} from '@/types/reserve-manage';
import TableAnnouncements from '@/components/table-announcement.vue';
import TableDetail from '@/components/table-detail.vue';
import RolePermission from './role-permission.vue'
import {get} from '@/api/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const formatSex = (sex) => {
  return sex ? '男' : '女';
};

// 表格相关
let columns = ref([
  {type: 'index', label: '序号', width: 55, align: 'center'},
  {prop: 'id', label: 'id', visible: false},
  {prop: 'title', label: '公告标题'},
  {prop: 'status', label: '发布状态'},
  {prop: 'publishDate', label: '发布时间'},
  {prop: 'expiryDate', label: '过期时间'},
  {prop: 'createdAt', label: '创建时间'},
  {prop: 'updatedAt', label: '更新时间'},
  {prop: 'operator', label: '操作', width: 250},
])

const page = reactive({
  index: 1, // 当前页
  size: 10,
  total: 0,
})

const tableData = ref<ReserveManage[]>([]);

const getData = async () => {
  const res = await get(ANNOUNCEMENTS_ALL)
  tableData.value = res.data
  page.total = res.data.length
  page.index = 1
  page.size = 10
};

getData();

// 当前页码变化的事件
const changePage = (val: number) => {
  page.index = val;
  getData();
};


// 查看详情弹窗相关
const visible1 = ref(false);

const viewData = ref({
  row: {},
  list: [],
  column: 1
});

const handleView = (row: ReserveManage) => {
  viewData.value.row = {...row}
  viewData.value.list = [
    {
      prop: 'index',
      label: '序号',
    },
    {
      prop: 'title',
      label: '公告标题',
    },
    {
      prop: 'status',
      label: '公告状态',
    },
    {
      prop: 'publishDate',
      label: '发布日期',
    },
    {
      prop: 'expiryDate',
      label: '过期时间',
    },
    {
      prop: 'createdAt',
      label: '创建时间',
    },
    {
      prop: 'updatedAt',
      label: '更新时间',
    },
  ]
  visible1.value = true;
};

// 权限管理弹窗相关
const visible2 = ref(false);
const permissOptions = ref({})

const handlePermission = (row: ReserveManage) => {
  visible2.value = true;
  permissOptions.value = {
    id: row.id,
    permiss: row.permiss
  };
}

const handelPass = () => {
  // TODO: Implement pass function if needed
}

const editFun = () => {
  router.push('/system/announcements/add')
}

const delFun = async (row: any) => {
  const res = await get(`${ANNOUNCEMENTS_DEL}/${row.id}`)
  console.log(res)
  await getData()
}

</script>

<style scoped>

</style>