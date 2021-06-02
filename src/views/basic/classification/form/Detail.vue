<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上级名称'" v-if="listInfo.type != 'alter'">
            <el-input v-model="classificationName" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'分类名称'" prop="classificationName">
            <el-input v-model="form.classificationName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="saveData('form')">保存</el-button>
      </div>
  </div>
</template>

<script>
import { addClassification } from "@/api/basic/index";
export default {
  props: {
      listInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      classificationName: '无',
      form: {
        classificationName: null,
        level: '1',
      },
      disPl: true,
      rules: {
        classificationName: [
          {required: true, message: '请输入', trigger: 'blur'},
        ],
      },
    };
  },
  mounted() {
    if (this.listInfo) {
      if(typeof this.listInfo.type != "undefined" && this.listInfo.type == 'alter'){
          this.form = this.listInfo
      }else{
        if(this.listInfo.level == "1"){
          this.classificationName = this.listInfo.classificationName
          this.form.level = '2'
          this.form.parentId = this.listInfo.classificationId
        }
      }
    }
  },
  methods: {
    saveData(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
            addClassification(this.form).then(res => {
              this.$emit('hideDialog', false)
              this.$emit('uploadList')
            });
          }
      })
    },
  }
};
</script>

<style>
</style>
