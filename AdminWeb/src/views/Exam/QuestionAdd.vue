<template>
    <div>
      <component :is="currentComponent"  />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores';
import Select from '@/components/Exam/Select.vue';//1
import Blank from '@/components/Exam/Blank.vue';//2
import Judge from '@/components/Exam/Judge.vue';//3
import Short from '@/components/Exam/Short.vue';//4

const appStore = useAppStore();
const QuestionType = appStore.examInfo.category// 题目类型

// 根据题目类型返回对应编辑组件
const currentComponent = computed(() => {
  const componentMap = {
    1: Select,  // 选择题组件
    2: Blank,   // 填空题组件
    3: Judge,  // 判断题组件
    4: Short   // 简答题组件
  }
  return componentMap[Number(QuestionType)]  || null
}) 



</script>