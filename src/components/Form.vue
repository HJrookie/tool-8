<template>
    <el-row type="flex" justify="center" style="margin-bottom: 20px;" v-if="vis">
        <el-tag>本: 上{{ xiantianGuaMap[result.m] }}-下{{ xiantianGuaMap[result.b] }}</el-tag>
        <el-tag type="info" class="gua" @click="linkTo(guaMap[`${result.m}-${result.b}`])">{{ guaMap[`${result.m}-${result.b}`] }}卦</el-tag>
        <el-tag type="success">{{ result.t }}爻动</el-tag>
    </el-row>

    <el-row type="flex" justify="center" style="margin-bottom: 20px;" v-if="vis">
        <el-tag>变: 上{{ xiantianGuaMap[bianResult.m] }}-下{{ xiantianGuaMap[bianResult.b] }}</el-tag>
        <el-tag type="info" class="gua" @click="linkTo(guaMap[`${bianResult.m}-${bianResult.b}`])">{{ guaMap[`${bianResult.m}-${bianResult.b}`] }}卦</el-tag>
        <el-tag type="success">{{ result.t }}爻动</el-tag>
    </el-row>


    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="20px" class="demo-ruleForm" :size="formSize"
       >
        <el-form-item label="上" prop="top">
            <el-input v-model="ruleForm.top" />
        </el-form-item>

        <el-form-item label="中" prop="mid">
            <el-input v-model="ruleForm.mid" />
        </el-form-item>

        <el-form-item label="下" prop="bottom">
            <el-input v-model="ruleForm.bottom" />
        </el-form-item>

        <el-row type="flex" justify="center">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                Create
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-row>

    </el-form>
</template>

<script setup>

import { reactive, ref } from 'vue'
import { guaMap,guaChangeMap,mingtainjiHrefMap } from '../../src/utils/index'
const formSize = ref('default')
const vis = ref(false)
const ruleFormRef = ref()
// 本卦
const result = ref({
    t: '',
    m: '',
    b: ''
});
// 变卦
const bianResult = ref({
    m: '',
    b: ''
});
const ruleForm = reactive({
    top: undefined,
    mid: undefined,
    bottom: undefined,
})
const xiantianGuaMap = ['', '乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
const rules = reactive({
    top: [
        { required: true, message: '请输入一个三位数字', trigger: 'blur' },
    ], mid: [
        { required: true, message: '请输入一个三位数字', trigger: 'blur' },
    ], bottom: [
        { required: true, message: '请输入一个三位数字', trigger: 'blur' },
    ],
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {

            let t = (ruleForm.top % 6 === 0) ? 6 : ruleForm.top % 6;
            let m = (ruleForm.mid % 8 === 0) ? 8 : ruleForm.mid % 8;
            let b = (ruleForm.bottom % 8 === 0) ? 8 : ruleForm.bottom % 8;
            console.log(t, b, m)
            // 本卦
            result.value = {
                t,
                m,
                b
            }
            // 变卦  
            if(t>3){
                // 上卦在变
                bianResult.value = {
                    m:guaChangeMap[`${m}-${t-3}`],
                    b
                }
            }else{
                // 下卦在变
                bianResult.value = {
                    m,
                    b:guaChangeMap[`${b}-${t}`],
                }
            }

            vis.value = true;
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = (formEl) => {
    vis.value = false;
    if (!formEl) return
    formEl.resetFields()
}

const linkTo = (guaName)=>{
    const href = mingtainjiHrefMap[guaName]??'';
    console.log('guaName',guaName,href)

    window.open(href)
}


</script>

<style scoped>
.gua{
    margin:0 10px;
    cursor: pointer;
}
</style>