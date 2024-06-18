<template>
  <div>
    <div class="container">

      <TableReserve :columns="columns" :tableData="tableData"  :viewFunc="handleView"
                   :delFunc="handleRefused" :changePage="changePage" :editShow="false"
                    :pass-func="handelPass"
                    :total="page.total"
                    :currentPage="page.index"
                    :pageSize="page.size">

        <template #status="{ rows }">
          <el-tag type="success" v-if="rows.status">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>

        <template #permissions="{ rows }">
          <el-button type="primary" size="small" plain @click="handlePermission(rows)">管理</el-button>
        </template>
      </TableReserve>
    </div>

    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData">
        <template #status="{ rows }">
          <el-tag type="success" v-if="rows.status">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </TableDetail>
    </el-dialog>
    <el-dialog title="权限管理" v-model="visible2" width="500px" destroy-on-close>
      <RolePermission :permiss-options="permissOptions"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="reserve-manage">

import {ETC_ACCEPTED_API, RESERVE_PASS_API, RESERVE_REFUSED_API} from '@/api/broker_api'
import {ref, reactive} from 'vue';
import {ReserveManage} from '@/types/reserve-manage';
import TableReserve from '@/components/table-reserve.vue';
import TableDetail from '@/components/table-detail.vue';
import RolePermission from './role-permission.vue'
import {get} from '@/api/axios'

const formatSex = (sex) => {
  return sex ? '男' : '女';
};

// 预约状态 0等待受理 1通过 2过期 3拒绝
const formatStatus = (reserveStatus) => {
  switch (reserveStatus) {
    case 0: return '等待受理';
    case 1: return '通过';
    case 2: return '超时未处理';
    case 3: return '已拒绝';
  }
};

// TODO 这里再写两个接口  通过审批与拒绝审批  即可

// 表格相关
let columns = ref([
  {type: 'index', label: '序号', width: 55, align: 'center'},
  {prop: 'reserveId', label: '预约id', visible: false},
  {prop: 'reserveName', label: '申请人姓名'},
  {prop: 'reserveSex', label: '申请人性别', formatter: formatSex},
  {prop: 'reservePhone', label: '联系电话'},
  {prop: 'updateDatetime', label: '申请时间'},
  {prop: 'startDatetime', label: '预约时间'},
  {prop: 'endDatetime', label: '结束时间'},
  {prop: 'reserveStatus', label: '申请状态', formatter: formatStatus},
  {prop: 'operator', label: '操作', width: 250},
])
const page = reactive({
  index: 1, // 当前页
  size: 10,
  total: 0,
})
const tableData = ref<ReserveManage[]>([]);

const getData = async () => {
  const res = await get(ETC_ACCEPTED_API, {'nextPage': page.index});
  tableData.value = res.data.reserves;
  page.total = res.data.totalCount;
  page.index = res.data.currentPage;
  page.size = res.data.pageTotal;
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

// 通过相关
const handelPass = (row) => {
  get(RESERVE_PASS_API, {'reserveId': row.reserveId});
  getData();
};

const handleView = (row: ReserveManage) => {
  viewData.value.row = {...row}
  viewData.value.list = [
    {
      prop: 'index',
      label: '序号',
    },
    {
      prop: 'reserveName',
      label: '申请人姓名',
    },
    {
      prop: 'reserveSex',
      label: '申请人性别',
    },
    {
      prop: 'reservePhone',
      label: '申请人联系电话',
    },
    {
      prop: 'createDatetime',
      label: '申请时间',
    },
    {
      prop: 'startDatetime',
      label: '预约时间',
    },
    {
      prop: 'endDatetime',
      label: '结束时间',
    },
  ]
  visible1.value = true;
};

// 拒绝相关
const handleRefused = (row) => {
  get(RESERVE_REFUSED_API, {'reserveId': row.reserveId});
  getData();
}

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

</script>

<style scoped>

</style>