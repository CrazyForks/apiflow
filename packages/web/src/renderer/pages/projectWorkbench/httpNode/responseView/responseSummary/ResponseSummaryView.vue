<template>
  <div class="response-summary-view">
    <div class="flex0 d-flex a-center">
      <span>{{ t("状态码") }}：</span>
      <template v-if="responseInfo.statusCode">
        <span v-if="responseInfo.statusCode >= 100 && responseInfo.statusCode < 300" class="green status-code">{{
          responseInfo.statusCode }}</span>
        <span v-else-if="responseInfo.statusCode >= 300 && responseInfo.statusCode < 400" class="orange status-code">{{
          responseInfo.statusCode }}</span>
        <span v-else-if="responseInfo.statusCode >= 400" class="red status-code">{{ responseInfo.statusCode }}</span>
      </template>
      <el-icon v-else :title="t('未请求数据')" :size="16" class="gray-500">
        <QuestionFilled />
      </el-icon>
    </div>
    <!-- <div v-if="responseInfo.contentType" :title="responseInfo.contentType" class="content-type-wrap">
      <div>测试环境</div>
      <div>{{ responseInfo.contentType }}{{ responseInfo.contentType }}{{ responseInfo.contentType }}</div>
    </div> -->
    <el-divider direction="vertical"></el-divider>
    <div class="flex0 d-flex a-center">
      <span>{{ t("时长") }}：</span>
      <template v-if="responseInfo.rt">
        <span v-show="responseInfo.rt >= 0 && responseInfo.rt < 2000" class="green">{{ formatedMs }}</span>
        <span v-show="responseInfo.rt >= 2000 && responseInfo.rt < 5000" class="orange">{{ formatedMs }}</span>
        <span v-show="responseInfo.rt >= 5000" class="red">{{ formatedMs }}</span>
      </template>
      <el-icon v-else :title="t('未请求数据')" :size="16" class="gray-500">
        <QuestionFilled />
      </el-icon>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="flex0 d-flex a-center">
      <span>{{ t("大小") }}：</span>
      <template v-if="responseInfo.bodyByteLength">
        <span v-show="responseInfo.bodyByteLength >= 0 && responseInfo.bodyByteLength < 10000" class="green">{{ formatedBytes }}</span>
        <span v-show="responseInfo.bodyByteLength >= 10000 && responseInfo.bodyByteLength < 15000" class="orange">{{ formatedBytes }}</span>
        <span v-show="responseInfo.bodyByteLength >= 15000" class="red">{{ formatedBytes }}</span>
      </template>
      <el-icon v-else :title="t('未请求数据')" :size="16" class="gray-500">
        <QuestionFilled />
      </el-icon>
    </div>
    <el-divider direction="vertical"></el-divider>
    <div class="content-type-wrap d-flex a-center">
      <span class="flex0">{{ t("格式") }}：</span>
      <template v-if="responseInfo.contentType">
        <div :title="responseInfo.contentType" class="content-type">{{ responseInfo.contentType }}</div>
        <button
          v-if="showJsonHint"
          type="button"
          class="json-hint-btn"
          @click="responseBodyViewContext?.switchResponseBodyViewMode('json')"
        >
          <span class="json-hint-text">{{ t('检测到 JSON') }}</span>
          <FileJson :size="12" />
          <span>{{ t('按 JSON 查看') }}</span>
        </button>
      </template>
      <el-icon v-else :title="t('未请求数据')" :size="16" class="gray-500">
        <QuestionFilled />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { QuestionFilled } from '@element-plus/icons-vue'
import { formatUnit } from '@/helper'
import { useI18n } from 'vue-i18n'
import { useHttpNodeResponse } from '@/store/httpNode/httpNodeResponseStore';
import { FileJson } from 'lucide-vue-next'
import { responseBodyViewContextKey } from '../responseBodyViewContext'

//远端返回值
const httpNodeResponseStore = useHttpNodeResponse();
const { t } = useI18n()
const responseBodyViewContext = inject(responseBodyViewContextKey, null)

const responseInfo = computed(() => httpNodeResponseStore.responseInfo);
//格式化返回值大小
const formatedBytes = computed(() => formatUnit(responseInfo.value.bodyByteLength, 'bytes'))
//格式化返回时间
const formatedMs = computed(() => formatUnit(responseInfo.value.rt, 'time'))
const showJsonHint = computed(() => {
  if (!responseBodyViewContext?.canSwitchResponseBodyViewMode.value) {
    return false;
  }
  return responseBodyViewContext.activeResponseBodyViewMode.value === 'text';
})
</script>

<style lang="scss" scoped>
.response-summary-view {
  display: flex;
  align-items: flex-end;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  overflow: hidden;
  height: var(--apiflow-response-summary-height);
}
.content-type-wrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .content-type {
    color: var(--orange);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .json-hint-btn {
    margin-left: 8px;
    padding: 0;
    border: none;
    background: transparent;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--theme-color);
    cursor: pointer;
    flex-shrink: 0;
    font-size: 12px;
  }
  .json-hint-text {
    color: var(--text-secondary);
  }
  .json-hint-btn:hover {
    opacity: 0.85;
  }
}
</style>
