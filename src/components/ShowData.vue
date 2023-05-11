<template>
    <div class="background">
        <div v-if="data" class="show-data">
            <img @click="hide" class="close-icon" :src="closeIcon" />
            <a-descriptions title="User Info" bordered class="user-info">
                <a-descriptions-item label="分数">{{ data.user.score }}</a-descriptions-item>
                <a-descriptions-item label="积分">{{ data.user.cu_score }}</a-descriptions-item>
            </a-descriptions>
            <a-table :dataSource="data.eng" :columns="engColumns" class="table"></a-table>
            <a-table :dataSource="data.log" :columns="logColumns" class="table"></a-table>
            <a-table :dataSource="data.task" :columns="taskColumns" class="table"></a-table>
        </div>
    </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue'
import closeIcon from '@/assets/images/auto_icon/close_icon.png'

const props = defineProps({
    data: {
        type: Object,
        default: () => ({}),
    },
})

// 定义发出的事件
const emit = defineEmits(['update:data']);


const engColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
]

const logColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Action', dataIndex: 'action', key: 'action' },
    { title: 'Text', dataIndex: 'text', key: 'text' },
    { title: 'Time', dataIndex: 'time', key: 'time' },
]

const taskColumns = [
    { title: '项目', dataIndex: 'name', key: 'name' },
    { title: '总次数', dataIndex: 'count', key: 'count' },
    { title: '今日次数', dataIndex: 'day_count', key: 'day_count' },
    { title: '上次执行时间', dataIndex: 'last_time', key: 'last_time' },
]
// 隐藏组件的方法
const hide = () => {
    console.log(111);

    emit('update:data', null);
};
</script>


<style scoped>
@import '../assets/css/background.css';

.close-icon {
    position: absolute;
    right: 50%;
    top: 50%;
    cursor: pointer;
    width: 24px;
    height: 24px;
    z-index: 1000;
}

.show-data {
    max-width: 1000px;
    margin: 0 auto;
}

.user-info {
    background-color: #ffffff;
    border-radius: 5px;
    padding: 24px;
    margin-bottom: 24px;
}

.table {
    margin-bottom: 24px;
}

.background {
    background: url('@/assets/images/Logo/Logo.png') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
</style>