<template>
    <a-layout-content style="padding: 50px;">
        <a-card>
            <div>
                <a-form @submit="handleSubmit">
                    <a-form-item label="Query ID" :rules="rules.queryId">
                        <a-input v-model:value="formModel.queryId" placeholder="Enter your query ID" @blur="nextStep"
                            @input="checkInput" />
                    </a-form-item>
                    <a-form-item label="Token" :rules="rules.token">
                        <a-input-password v-model:value="formModel.token" placeholder="Enter your token" @blur="nextStep"
                            @input="checkInput">
                            <template #icon>
                                <a-tooltip title="点击显示/隐藏明文">
                                    <a-icon @click="toggleTokenVisibility" :type="tokenVisible ? 'eye' : 'eye-invisible'" />
                                </a-tooltip>
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" class="submit-button" html-type="submit" :loading="loading"
                            :disabled="!formModel.queryId || !formModel.token">Submit</a-button>
                        <a-button type="dashed" class="query-button" @click="handleQuery" :disabled="!formModel.queryId"
                            :style="{ backgroundColor: formModel.queryId ? '' : 'gray' }">Query</a-button>

                    </a-form-item>
                </a-form>
                <a-steps :current="currentStep" style="margin-top: 24px;">
                    <a-step title="Enter Query ID"></a-step>
                    <a-step title="Enter Token"></a-step>
                </a-steps>
            </div>
        </a-card>
    </a-layout-content>
    <ShowData v-if="responseData.value" :data="responseData.value" @update:data="handleUpdateData"></ShowData>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { checkToken, queryID } from '../api/checkToken.js';
import ShowData from './ShowData.vue'



// 提交表单
const formModel = ref({
    queryId: '',
    token: '',
});
// 表单验证规则
const rules = {
    queryId: [
        {
            required: true,
            message: 'Query ID is required',
            trigger: 'blur',
        },
    ],
    token: [
        {
            required: true,
            message: 'Token is required',
            trigger: 'blur',
        },
    ],
};

// 用于查询接口的响应式数据
// const responseData = reactive()
const responseData = reactive({ value: null });

const showPassword = ref(false);
const currentStep = ref(0);
const loading = ref(false);
const tokenVisible = ref(false);


const toggleTokenVisibility = () => {
    tokenVisible.value = !tokenVisible.value;
};

// 处理子组件ShowDate返回的最新数据
const handleUpdateData = (data) => {
    console.log('Received update:data event', data);
    responseData.value = data;
};



// handel query logic
const handleQuery = async () => {
    const response = await queryID(formModel.value.queryId);

    if (response.code === 1) {
        message.success(response.msg)
        // 将返回的数据赋值给responseData
        responseData.value = response.data

    } else {
        // -1 不存在
        message.error(response.msg)
    }


    // Reset the formModel values
    formModel.value.queryId = '';
    formModel.value.token = '';

}



// handel submit logic
const handleSubmit = async (event) => {
    event.preventDefault();
    loading.value = true;

    if (!formModel.value.queryId || !formModel.value.token) {
        message.error('Both query ID and token are required!');
        loading.value = false;
        return;
    }

    try {
        const responseData = await checkToken(formModel.value.queryId, formModel.value.token);

        if (responseData.code === -1) {
            message.info(responseData.msg);
        } else {
            if (responseData.code === 1) {
                message.success(responseData.msg);
            } else {
                message.error('The token for this query ID does not exist. Please add a token.');
            }
        }
    } catch (error) {
        message.error('An error occurred while checking the token.');
        console.error(error);
    }

    // Reset the formModel values
    formModel.value.queryId = '';
    formModel.value.token = '';

    loading.value = false;
};

const checkInput = () => {
    if (!formModel.value.queryId) {
        currentStep.value = 0;
    } else if (!formModel.value.token) {
        currentStep.value = 1;
    }
};

const nextStep = () => {
    if (currentStep.value === 0 && formModel.value.queryId) {
        currentStep.value = 1;
    } else if (currentStep.value === 1 && formModel.value.token) {
        currentStep.value = 2;
    }
};

</script>


<style scoped>
.submit-button {
    margin-right: 20px;
}

.query-button {
    color: rgb(255, 255, 255);
    /* 文字颜色 */
    background-color: #f8e007;
    /* 按钮背景颜色 */
    border-color: rgb(39, 32, 38);
    /* 按钮边框颜色 */
}
</style>

