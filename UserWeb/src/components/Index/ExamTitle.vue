<template>
    <div>
        <van-cell-group inset v-if="UserExaminfo && UserExaminfo.questionTitle">
            <van-cell
                v-for="item in UserExaminfo.questionTitle" 
                :key="item._id" 
                :title="item.content"
                is-link
                @click="handleClick(item)"
                class="exam-title-cell"/>
        </van-cell-group>
        <div v-else-if="!isLoaded">
            <VantLoading/>
        </div>
        <div v-else class="empty">
            <Empty Description="暂无题目添加"/> 
        </div>
    </div>
</template>
<script setup>
import getUserExaminfo from '@/API/getUserExam';
import { onMounted ,ref} from 'vue';
import { useExamStore } from '@/stores/counter'
import RouterPush from '@/util/RouterPush';
import VantLoading from './VantLoading.vue';
import Empty from '../FuntionComponents/Empty.vue';
const store = useExamStore()
const UserExaminfo = ref([]);
const props = defineProps({
    UserExamID: {
        type: String,
        required: true,
    }
})
const emit = defineEmits(['hasData']); 
const handleClick = (item) => {
    store.setCurrentTitle(item.content)
    store.setCurrentQuestion(item.questionIdS)
    RouterPush(`/ExamSetting/${item._id}`)
}
const isLoaded = ref(false);  // 增加载状态标识

const fetchData = async () => {
   try {
    const res = await getUserExaminfo(props.UserExamID);
    UserExaminfo.value = res[0];
    isLoaded.value = true;  // 数据加载完成
    if(UserExaminfo.value){
       emit('hasData', true);
    } else {
       emit('hasData', false);
    }
   }catch (error) {
        console.error('获取考试数据失败:', error);
        isLoaded.value = true;  // 出错也标记为已加载
   }
}
onMounted(async () => {
    await fetchData();
})
</script>

<style scoped>
.exam-title-cell {
    margin: 12px 0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}
.exam-title-cell:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}
:deep(.van-cell__title) {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    padding: 4px 0;
}

:deep(.van-cell__right-icon) {
    color: #1989fa;
    font-size: 18px;
}
</style>