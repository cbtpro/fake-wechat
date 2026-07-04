<script setup lang="ts">
import { ref } from 'vue'
import { useNetwork } from '@/network'

const { requestByPaging } = useNetwork()

const searchKeyword = ref<string>('')
const list = ref<IMockUser[]>([])
const loading = ref(false)
const listError = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const page = ref(0)
const pageSize = ref(30)

const getDemoList = (options: { page: number; pageSize: number }) => {
  const { page = 0, pageSize = 10 } = options
  return new Promise<IResponseBodyByPaging<IMockUser>>((resolve, reject) => {
    requestByPaging<IMockUser>({
      url: '/mock/list',
      method: 'POST',
      data: {
        page,
        pageSize
      }
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const onLoad = async () => {
  if (refreshing.value) {
    list.value = []
    refreshing.value = false
  }
  try {
    const { data, meta } = await getDemoList({
      page: page.value++,
      pageSize: pageSize.value
    })
    const {
      /** 本页记录数 */
      itemCount,
      /** 总记录数 */
      totalItems,
      /** 每页请求几页 */
      itemsPerPage,
      /** 总页数 */
      totalPages,
      /** 当前第几页 */
      currentPage = 0
    } = meta || {}

    // page.value = currentPage

    list.value = list.value.concat(data)

    if (currentPage === totalPages) {
      finished.value = true
    }
  } catch (error) {
    console.error(error)
    listError.value = true
    page.value = 0
  } finally {
    loading.value = false
  }
}
const onRefresh = () => {
  // 清空列表数据
  page.value = 0
  finished.value = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}

const dblClickHandle = () => {
  window.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth'
  })
}
</script>

<template>
  <IndexTitleBar @dbl-click-callback="dblClickHandle" />
  <body-container>
    <van-search v-model="searchKeyword" placeholder="请输入搜索关键词" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        v-model:error="listError"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="已经到我的底线啦😊"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index" :title="item.name" />
      </van-list>
    </van-pull-refresh>
  </body-container>
  <body-footer />
</template>
