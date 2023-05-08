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
                        <a-button type="primary" html-type="submit" :loading="loading"
                            :disabled="!formModel.queryId || !formModel.token">Submit</a-button>
                    </a-form-item>
                </a-form>
                <a-steps :current="currentStep" style="margin-top: 24px;">
                    <a-step title="Enter Query ID"></a-step>
                    <a-step title="Enter Token"></a-step>
                </a-steps>

            </div>
        </a-card>
    </a-layout-content>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { checkToken } from '../api/checkToken';

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

const showPassword = ref(false);
const currentStep = ref(0);
const loading = ref(false);
const tokenVisible = ref(false);


const toggleTokenVisibility = () => {
    tokenVisible.value = !tokenVisible.value;
};

const obfuscateToken = (token) => {
    // 示例混淆函数，可根据需求修改
    return token.split('').reverse().join('');
};

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
        const obfuscatedToken = obfuscateToken(formModel.value.token);
        const responseData = await checkToken(formModel.value.queryId, obfuscatedToken);

        if (responseData.queryIdExists) {
            message.error('该 Query ID 已存在于数据库中。');
        } else {
            if (responseData.tokenExists) {
                message.success('Token exists, you can proceed!');
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
