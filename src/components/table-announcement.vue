<template>
  <div>
    <div class="table-toolbar" v-if="hasToolbar">
      <div class="table-toolbar-left">
        <slot name="toolbarBtn"></slot>
      </div>
      <div class="table-toolbar-right flex-center">
        <template v-if="multipleSelection.length > 0">
          <el-tooltip effect="dark" content="删除选中" placement="top">
            <el-icon class="columns-setting-icon" @click="delSelection(multipleSelection)">
              <Delete/>
            </el-icon>
          </el-tooltip>
          <el-divider direction="vertical"/>
        </template>
        <el-button style="margin-right: 20px" type="success" size="small" :icon="View" @click="editFunc()">
          新增
        </el-button>
        <el-tooltip effect="dark" content="刷新" placement="top">
          <el-icon class="columns-setting-icon" @click="refresh">
            <Refresh/>
          </el-icon>
        </el-tooltip>
        <el-divider direction="vertical"/>
        <el-tooltip effect="dark" content="列设置" placement="top">
          <el-dropdown :hide-on-click="false" size="small" trigger="click">
            <el-icon class="columns-setting-icon">
              <Setting/>
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="c in columns">
                  <el-checkbox v-model="c.visible" :label="c.label"/>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
      </div>
    </div>
    <el-table class="mgb20" :style="{ width: '100%' }" border :data="tableData" :row-key="rowKey"
              @selection-change="handleSelectionChange" table-layout="auto">
      <template v-for="item in columns" :key="item.prop">
        <el-table-column v-if="item.visible" :prop="item.prop" :label="item.label" :width="item.width"
                         :type="item.type" :align="item.align || 'center'">

          <template #default="{ row, column, $index }" v-if="item.type === 'index'">
            {{ getIndex($index) }}
          </template>

          <template #default="{ row, column, $index }" v-if="!item.type">
            <slot :name="item.prop" :rows="row" :index="$index">
              <template v-if="item.prop == 'operator'">
                <el-button type="primary" text size="small" :icon="Document" @click="viewFunc(row)">
                  详情
                </el-button>
                <el-button type="success" text size="small" :icon="Edit" @click="editFunc(row)">
                  编辑
                </el-button>
                <el-button type="danger" text size="small" :icon="Delete" @click="delFunc(row)">
                  删除
                </el-button>
              </template>
              <template v-else-if="item.prop === 'status'">
                <el-switch
                  v-model="row.status"
                  :active-value="1"
                  :inactive-value="0"
                  @change="(val) => handleStatusChange(row, val)"
                />
              </template>
              <span v-else-if="item.formatter">
                {{ item.formatter(row[item.prop]) }}
              </span>
              <span v-else>
                {{ row[item.prop] }}
              </span>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <el-pagination v-if="hasPagination" :current-page="currentPage" :page-size="pageSize" :background="true"
                   :layout="layout" :total="total" @current-change="handleCurrentChange"/>
  </div>
</template>

<script setup lang="ts">
import {toRefs, PropType, ref} from 'vue'
import {Delete, View, Refresh, Edit, Document} from '@element-plus/icons-vue';

const props = defineProps({
  // 表格相关
  tableData: {
    type: Array,
    default: []
  },
  columns: {
    type: Array as PropType<any[]>,
    default: []
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  hasToolbar: {
    type: Boolean,
    default: true
  },
  //  分页相关
  hasPagination: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  layout: {
    type: String,
    default: 'total, prev, pager, next'
  },
  delFunc: {
    type: Function,
    default: () => {
    }
  },
  viewFunc: {
    type: Function,
    default: () => {
    }
  },
  passFunc: {
    type: Function,
    default: () => {
    }
  },
  editFunc: {
    type: Function,
    default: (row) => {
    }
  },
  delSelection: {
    type: Function,
    default: () => {
    }
  },
  refresh: {
    type: Function,
    default: () => {
    }
  },
  changePage: {
    type: Function,
    default: () => {
    }
  }
})

let {
  tableData,
  columns,
  rowKey,
  hasToolbar,
  hasPagination,
  total,
  currentPage,
  pageSize,
  layout,
} = toRefs(props)


columns.value.forEach((item) => {
  if (item.visible === undefined) {
    item.visible = true
  }
})

// 当选择项发生变化时会触发该事件
const multipleSelection = ref([])
const handleSelectionChange = (selection: any[]) => {
  multipleSelection.value = selection
}

// 当前页码变化的事件
const handleCurrentChange = (val: number) => {
  props.changePage(val)
}

const getIndex = (index: number) => {
  return index + 1 + (currentPage.value - 1) * pageSize.value
}

const handleStatusChange = (row: any, val: number) => {
  console.log('状态变更:', row, val)
}
</script>

<style scoped>
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}

.columns-setting-icon {
  display: block;
  font-size: 18px;
  cursor: pointer;
  color: #676767;
}

:deep(.el-button--text) {
  padding: 0 4px;
  margin: 0 2px;
}
</style>
<style>
.table-header .cell {
  color: #333;
}
</style>