import {Menus} from '@/types/menu';

export const menuData: Menus[] = [
    {
        id: '0',
        title: '系统首页',
        index: '/dashboard',
    },
    {
        id: '1',
        title: '公告管理',
        index: '/system-announcements',
    },
    {
        id: '11',
        index: '/system-reserve',
        title: '待审批预约',
    },
    {
        id: '12',
        index: '/system-role',
        title: '角色管理',
    },
    {
        id: '13',
        index: '/system-menu',
        title: '菜单管理',
    },
    {
        id: '41',
        index: '/schart',
        title: 'schart图表',
    },
    {
        id: '42',
        index: '/echarts',
        title: 'echarts图表',
    },

];
