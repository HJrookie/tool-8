<template>
  <el-form
    ref="ruleFormRef"
    :model="divinatory"
    :rules="rules"
    label-width="20px"
    class="demo-ruleForm"
  >
    <el-form-item label="上" prop="top">
      <el-input v-model="divinatory.top" />
    </el-form-item>

    <el-form-item label="中" prop="mid">
      <el-input v-model="divinatory.mid" />
    </el-form-item>

    <el-form-item label="下" prop="bottom">
      <el-input v-model="divinatory.bottom" />
    </el-form-item>

    <el-row type="flex" justify="center">
      <el-button type="primary" @click="submitForm(ruleFormRef)" class="go">
        Click &nbsp;
        <el-icon><Check /></el-icon>
      </el-button>
      <el-button @click="resetForm(ruleFormRef)" class="reset">
        Reset &nbsp;
        <el-icon><Refresh /></el-icon>
      </el-button>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Lodash from 'lodash';
import EventBus from '@utils/eventBus'

import type { FormInstance, FormRules } from 'element-plus'

import { hexagramsAnalysis } from './index';

const ruleFormRef = ref<FormInstance>();

const divinatory = reactive<{
  top: string,
  mid: string,
  bottom: string
}>({
  top: null as unknown as string,
  mid: null as unknown as string,
  bottom: null as unknown as string
})

const validateInput = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入一个三位数字'));
  } else if (Lodash.isNaN(+value)) {
    callback(new Error('只支持输入数字'));
  } else if (value.toString().length !== 3) {
    callback(new Error('输入长度必须为3'));
  } else {
    callback();
  }
}

const rules = reactive<FormRules<typeof divinatory>>({
  top: [{ validator: validateInput, trigger: 'blur' }],
  mid: [{ validator: validateInput, trigger: 'blur' }],
  bottom: [{ validator: validateInput, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const result = hexagramsAnalysis(+divinatory.top, +divinatory.mid, +divinatory.bottom)
      console.log(result);

      EventBus.emit('hexagram.analysis.finish', result);
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {}
</script>

<style scoped lang="scss">
</style>
