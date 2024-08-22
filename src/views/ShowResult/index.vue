<template>
  <transition name="result">
    <div class="show-result-container" v-if="result.length">
      <el-row
        v-for="(item, index) in result"
        :key="index"
        justify="space-around"
        class="row-container"
      >
        <el-tag type="success">本: 上{{ Reference.xiantianGuaMap[item.m] }}-下{{ Reference.xiantianGuaMap[item.b] }}</el-tag>
        <!-- <el-tag 
          type="info" 
          @click="openLink(Reference.guaMap[`${item.m}-${item.b}`])"
        >
          {{ Reference.guaMap[`${item.m}-${item.b}`] }}卦
        </el-tag> -->
        <div class="gua-box">
          <div class="gua">{{ Reference.guaMap[`${item.m}-${item.b}`] }}</div>
          <div class="gua-suffix">卦</div>
        </div>
        <el-tag type="warning">{{ item.t }}爻动</el-tag>
      </el-row>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref, onUnmounted } from 'vue';
import Lodash from 'lodash';
import EventBus from '@utils/eventBus'

import { openLink } from './index';
import * as Reference from '@utils/index';

type ResultItem = {
  t: number;
  m: number;
  b: number;
};

const result = ref<Array<ResultItem>>([]);
const updateResult = (resultData: any = []): void => {
  result.value = resultData;
};

EventBus.on('hexagram.analysis.update', updateResult);

onUnmounted(() => {
  EventBus.off('hexagram.analysis.update', updateResult);
});

</script>

<style scoped lang="scss">

.row-container:not(:last-child) {
  margin-bottom: 10px;
}
.gua-box {
  display: flex;

  min-width: 36px;
  padding: 2px 9px;
  border: 1px solid #e9e9eb;

  font-size: 12px;
  line-height: 1.5em;

  cursor: pointer;
  color: #909399;
  border-radius: 4px;
  background-color: #f4f4f5;

  &:hover {
    color: #409eff;
    background-color: #ecf5ff;
  }

  .gua {
    flex: 1;
  }
  .gua-suffix {
    flex: 0 0 auto;
  }
}


.result-enter-active,
.result-leave-active {
  transition: all 0.5s linear;
  overflow: hidden;
}
.result-enter-from,
.result-leave-to {
  max-height: 0;
  opacity: 0;
}
.result-enter-to,
.result-leave-from {
  max-height: 40px; /* 根据内容调整最大高度 */
  opacity: 1;
}

.show-result-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: stretch;

  width: 100%;
  height: 60px;
}
</style>
