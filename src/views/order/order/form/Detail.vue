<template>
  <div>
    <el-form ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <list
          class="list-main box-shadow"
          :columns="columns"
          :loading="loading"
          :list="list"
          index
        />
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { findDetails } from "@/api/order/index";
import List from "@/components/List";
export default {
  components: {
    List
  },
  props: {
    listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: "商品名称", name: "spuName" },
        { text: "商品颜色", name: "skuColor" },
        { text: "尺码", name: "sizeCode" },
        { text: "尺码", name: "sizeCode" },
        { text: "数量", name: "skuCount" },
        { text: "订单号", name: "orderId" },
        { text: "图片", name: "spuPhoto", default: 'img'},
      ]
    };
  },
  mounted() {
    if (this.listInfo) {
      this.fetchFormat({orderId: this.listInfo.orderId})
    }
  },
  methods: {
    fetchFormat(data) {
      this.loading = true;
      findDetails(data).then(res => {
        this.loading = false;
        this.list = {records: res.data};
      });
    },
  }
};
</script>

<style>
  .list-main {
    height: 300px;
  }
</style>
