<template>
    <div class="page-container">
        <TopBack 
            title="喵喵智答"
            navBarIconColor="#000000" 
            navBarBackground="#f9fdff">
            <template #chooseBut>
                <van-button 
                    type="primary" 
                    plain
                    color="#626aef"
                    size="small"
                    @click="handleChooseModel">
                    选择对话模型
                </van-button>
            </template>
        </TopBack> 
        <div>
            <div class="welcome">
                <AntWelcome
                :chooseModelName="selectedValues[0]"
                title="你可以向我提问题!"
                description="基于组件Ant Design X Vue 与百炼大模型服务平台，实现多种大模型自由轻松调用!🐱当前选择对话模型：" />
            </div>
            <div class="prompts" v-show="!PromptsHiden">
                <AntPrompts 
                    title="✨使用请注意以下下问题："
                />
            </div>
            <div class="sender">
                <Affix :offset-bottom="bottom">
                    <div class="button-sender-container">
                        <van-button 
                            color="#7232dd" 
                            plain round 
                            size="small" 
                            icon="replay"
                            @click="handleCreNewChat">
                            创建新对话
                        </van-button>
                    </div>
                    <AntSender 
                        ref="antSender"
                        @userinputsubmit="handleuserSend" 
                        @isHidePrompts="handleisHidePrompts"
                        @isShowBubble="handleIsloading"/>
                </Affix>
            </div>
            <div>
                <Flex gap="middle" vertical>
                    <div v-for="(message, index) in chatHistory" :key="index" :class="message.role === 'user' ? 'userbubble' : 'aibubble'">
                        <AntBubble
                            :header="message.role === 'assistant' ? message.modelName : ''"
                            :content="message.content"
                            :placement="message.role === 'user' ? 'end' : 'start'"
                            :typingstep="message.role === 'user' ? 2 : 4"
                            :typinginterval="30"
                            :typingsuffix="message.role === 'assistant' ? '😺' : ''"
                            :loading="index === chatHistory.length - 1 && message.role === 'assistant' && isAIloading">
                            <template #bubbleAvatar>
                                <component :is="message.role === 'user' ? TalkUserIcon : TalkAIIcon"/>
                            </template>
                        </AntBubble>
                    </div>
                </Flex>
            </div>
        </div>
        <div>
            <VanPicker
                v-model:show="showPicker"
                :options="modelOtions"
                @confirm="handelConfirm"
                PickTitle="选择对话模型"
            />
        </div>
        <div>
           
        </div>
    </div>
</template>
<script setup>
import { ref,onMounted } from 'vue';
import TopBack from '@/components/FuntionComponents/TopBack.vue';
import AntWelcome  from '@/components/FuntionComponents/AntWelcome.vue';
import AntPrompts from '@/components/FuntionComponents/AntPrompts.vue';
import AntSender from '@/components/FuntionComponents/AntSender.vue';
import AntBubble from '@/components/FuntionComponents/AntBubble.vue';
import TalkUserIcon from '@/components/icons/TalkUserIcon.vue';
import TalkAIIcon from '@/components/icons/TalkAIIcon.vue';
import { Flex} from 'ant-design-vue';
import postUserUserChat from '@/API/postUserChat';
import getLLMList from '@/API/getLLMList'; 
import VanPicker from '@/components/FuntionComponents/VanPicker.vue';
import { Affix } from 'ant-design-vue';
import { showConfirmDialog } from 'vant';
import { showToast } from 'vant';


const chatHistory = ref([]);
const PromptsHiden = ref(false);
const isShowUserBubble = ref(false);
const isShowAIBubble = ref(false);
const isAIloading = ref(true);
const antSender = ref(null); // 添加AntSender组件引用，用于重置loading状态
const modelName = ref(''); // 新增模型名称变量
const showPicker = ref(false); // 新增弹出框显示状态变量
const modelOtions = ref([]) // 新增选项数据,后面由后端请求后返回，而不是写死
const selectedValues = ref(['DeepSeek-R1-Distill-Qwen-1.5B']);
const selectedmodelvalue = ref('deepseek-r1-distill-qwen-1.5b'); 
const bottom = ref(12); // 新增底部距离变量


//处理用户提交的问题
const handleuserSend = (data) => {
    chatHistory.value.push({ role: 'user', content: data });
    isAIloading.value = true;
    sendRequest(chatHistory.value, selectedmodelvalue.value);
}
//处理用户提交的提示词
// const handleuserPrompt = (data) => {
    // console.log('用户提交了提示词:',data)
    // userSendData.value = data; 
    // isShowUserBubble.value = true;
//}

//处理是否隐藏提示词
const handleisHidePrompts = (data) => {
    PromptsHiden.value = data;
}

//处理是否显示气泡
const handleIsloading = (data) => {
    isShowUserBubble.value = data;
    isShowAIBubble.value = data;
}
// 处理功能按钮点击事件
const handleChooseModel = () => {
    showPicker.value = true; // 显示弹出框
}
// 处理确认选择事件,选择模型后，关闭弹出框
const handelConfirm = (data) => {
    // console.log('选择的模型:', data.selectedOptions[0]);
    showPicker.value = false;
    selectedValues.value = [data.selectedOptions[0].text]; 
    selectedmodelvalue.value = data.selectedOptions[0].value; 
    modelName.value = data.selectedOptions[0].text;
}

// 处理创建新对话事件
const handleCreNewChat = () => {
    if (chatHistory.value.length === 0) {
        showToast({
        message: '当前已经是新对话',
        position: 'top',
        });
        return
    }
    
   showConfirmDialog({
            message: '确定要创建新对话吗？创建新对话内容将清空！',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
        }).then(() => {
            location.reload()// 刷新页面
        }).catch(() => {
            // 取消操作
    })
}

//发送请求到服务器
const sendRequest = async (messages, model) => {
    try {
        const response = await postUserUserChat(messages, model);
        if (response.code === 200) {
            chatHistory.value.push({
                role: 'assistant',
                content: response.data.Aidata,
                modelName: response.data.modelName
            });
        } else {
            chatHistory.value.push({
                role: 'assistant',
                content: '服务器繁忙，请稍后重试！'
            });
        }
    } catch (error) {
        chatHistory.value.push({
            role: 'assistant',
            content: '请求异常，请检查网络'
        });
        console.error('API请求错误:', error);
    } finally {
        isAIloading.value = false;
        antSender.value?.resetLoading();
    }
}
// 发送请求到服务器,获取模型列表,提供给用户选择
const getModelList = async () => {
    try {
        const response = await getLLMList();
        if (response.code === 200) {
            modelOtions.value = response.data.map(item => ({
                text: item.modelName,
                value: item.modelValue
            }));
        }
    } catch (error) {
        console.error('API请求错误:', error); 
    }
}

// 组件挂载后，发送请求到服务器,获取模型列表,提供给用户选择
onMounted(() => {
    getModelList(); // 发送请求获取模型列表
})

</script>

<style scoped>
.page-container {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh; /* 新增视口高度 */
    background-color: #f7fcff;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 启用垂直滚动 */
}

.welcome{
    margin-top: 5px; 
    margin-left: 13px;
    margin-right: 13px;
    border-radius: 10px;
}
 
.prompts{
    margin-top: 10px;
    margin-left: 18px;
}

.sender {
    position: fixed;  /* 固定定位 */
    bottom: 0;       /* 贴紧底部 */
    left: 0;         /* 左侧对齐 */
    right: 0;        /* 右侧对齐 */
    background-color: #f7fcff;
    padding: 8px 12px;
    z-index: 100;    /* 确保在最上层 */
    transition: transform 0.3s ease;/* 平滑过渡 */
}
.userbubble{
    margin-top: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 100px;
}
.aibubble{
    margin-left: 10px;
    margin-right: 10px; 
    margin-bottom: 110px;
}
.button-sender-container {
    margin-bottom: 4px;
}



</style>