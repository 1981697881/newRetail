<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'商品名称'" prop="spuName">
            <el-input v-model="form.spuName" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'SQUID'" prop="spuId">
            <el-input v-model="form.spuId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'零售价'" >
            <el-input-number v-model="form.retailPrice" :min=1></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'备注'" >
            <el-input v-model="form.remark" ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" style="text-align: center">
          <el-form-item :label="'商品图片'">
            <el-upload
              :action="fileUrl"
              list-type="picture-card"
              accept="image/jpeg,image/jpg,image/png,image/gif"
              :headers="headers"
              :limit="1"
              name="imgS"
              :on-success="uploadPosterSuccess"
              :on-error="uploadError"
              :class="{hide:hidePicture}"
              :on-preview="handlePictureCardPreview"
              :on-change="handlePictureChange"
              :file-list="pictureList"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'颜色'" >
            <el-checkbox-group v-model="colorboxGroup" size="medium">
              <el-checkbox-button v-for="color in colorList" :label="color.colorId" :key="color.colorId">{{color.skuColor}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'尺码'" >
            <el-checkbox-group v-model="sizeboxGroup" size="medium">
              <el-checkbox-button v-for="size in sizeList" :label="size.sizeId" :key="size.sizeId">{{size.sizeCode}}</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
     <!-- <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item :label="'商品颜色'" prop="orgAttr">
            <div style="margin-top: 20px;margin-bottom: 10px">
              <el-button @click="setRow">添加</el-button>
              <el-button @click="delRow">删除</el-button>
            </div>
            <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true"  @row-click="yzClick">
              <el-table-column
                v-for="(t,i) in columns1"
                :key="i"
                align="center"
                :prop="t.name"
                :label="t.text"
                v-if="t.default!=undefined?t.default:true"
                :width="t.width?t.width:''"
              ></el-table-column>
            </el-table>
          </el-form-item>
        </el-col>
      </el-row>-->
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="商品规格"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="postform" :rules="rules2" ref="postform" label-width="80px" :size="'mini'">
        <el-row :span="20" style="padding-top: 15px">
          <el-col :span="12">
            <el-form-item :label="'颜色'" prop="skuColor">
              <el-input v-model="postform.skuColor"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'尺码'" prop="numberOfYards">
              <el-input v-model="postform.numberOfYards"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="success" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div slot="footer" style="text-align:center">
      <el-button type="primary" @click="saveData('form')">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {addSpu,addSku,deleteSku,findSkuBySpuId,submesList,updateSpu} from "@/api/basic/index";
  import {
    getToken
  } from '@/utils/auth'

  export default {
    props: {
      listInfo: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        headers: {
          'authorization': getToken('nrrx'),
        },
        colorboxGroup: [],
        sizeboxGroup: [],
        colorList: [],
        sizeList: [],
        visible: null,
        list: [],
        columns1: [
          {text: "颜色", name: "skuColor"},
          {text: "尺码", name: "numberOfYards"},
        ],
        fileUrl: '',
        images: [],
        hidePicture: false,
        isupload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        pictureList: [],
        limitPicture: 1,
        form: {
          spuName: null,
          spuId: null,
          retailPrice: null,
          spuPhoto: null,
        },
        checkYzData: null,
        postform: {
          skuColor: null,
          spuId: null,
          numberOfYards: null,
        },
        rules: {
          spuName: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
          spuId: [
            {required: true, message: '请输入', trigger: 'blur'}
          ],
        },
        rules2: {
          skuColor: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],numberOfYards: [
            {required: true, message: '请输入值', trigger: 'blur'},
          ],

        },
      };
    },
    mounted() {
      this.fileUrl  = `${window.location.origin}/web/file/imgUpload`
      if (this.listInfo) {
        this.isupload = true
        this.form = this.listInfo
        this.fetchData({spuId: this.listInfo.spuId})
        this.pictureList = []
        if(this.form.spuPhoto != null && this.form.spuPhoto.length>0){
          this.pictureList.push({
            url: this.$store.state.user.url+'/movie/uploadFiles/image/' + this.form.spuPhoto
          })
          this.hidePicture = true
        }else{
          this.hidePicture = false
        }
      }else{
        this.fetchList()
        this.isupload = false
      }
    },
    methods: {
      //规格选中
      yzClick(obj){
        this.checkYzData = obj
      },
      //规格删除
      delRow(){
        if (this.checkYzData.skuId) {
          this.$confirm('是否删除(' + this.checkYzData.numberOfYards + ')，删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteSku({skuId:this.checkYzData.skuId}).then(res => {
              if(res.flag){
                this.checkYzData = null
                this.fetchData({spuId: this.form.spuId})
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          })
        }
      },
      //规格确认
      confirm() {
        let me = this
        this.$refs['postform'].validate((valid) => {
          // 判断必填项
          if (valid) {
              let list = me.list
              let number = 0
              for(let val of list){
                if(me.postform.skuColor == val.skuColor && me.postform.numberOfYards == val.numberOfYards){
                  number ++
                }
              }
              if(number == 0){
                me.visible = false
                //修改
                addSku(this.postform).then(res => {
                  this.fetchData({spuId: this.form.spuId})
                });
              }else{
                this.$message.error('数据重复');
              }
          } else {
            return false
          }
        })
      },
      //规格选择
      setRow() {
        if(this.form.spuId == null){
          this.$message({
            message: '请先保存商品',
            type: "warning"
          });
        }else{
          this.postform ={
            spuId: this.form.spuId,
            skuColor: null,
            numberOfYards: null,
          }
          this.visible = true
        }
      },
      //上传失败事件
      uploadError(res) {
        this.$message({
          message: res.msg,
          type: "warning"
        });
        this.$emit('uploadList')
      },
      //图片上传成功
      uploadPosterSuccess(res, file, fileList) {
        file.name = res.data;
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.form.spuPhoto=res.data
      },
      //删除图片
      handleRemove(file, fileList) {
        let array = this.pictureList;
        let img =file.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1]
            array.forEach((item,index)=>{
              if (item.url.split(this.$store.state.user.url+'/movie/uploadFiles/image/')[1] == img) {
                array.splice(index, 1);
              }
            })
        this.$emit('uploadList')
        this.form.spuPhoto= null
        this.hidePicture = false
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureChange(file, fileList) {
        this.hidePicture = fileList.length >= this.limitPicture;
      },
      fetchData(val){
        findSkuBySpuId(val).then(res => {
          this.colorList = res.data.colorVOS
          this.sizeList = res.data.sizeVOS
          this.colorList.forEach((item,index)=>{
            if(item.sel == 1){
              this.colorboxGroup.push(item.colorId)
            }
          })
          this.sizeList.forEach((item,index)=>{
            if(item.sel == 1){
              this.sizeboxGroup.push(item.sizeId)
            }
          })
        })
      },
      fetchList(val){
        submesList({}).then(res => {
          this.colorList = res.data[0].colorVOS
          this.sizeList = res.data[1].sizeVOS
        })
      },
      saveData(form) {
        this.$refs[form].validate((valid) => {
          //判断必填项
          if (valid) {
            if(this.isupload){
              let colors = []
              let sizes = []
              this.colorList.forEach((item)=>{
                this.colorboxGroup.some((items)=>{
                  if(item.colorId == items){
                    item.sel = 1
                    return true
                  }else{
                    item.sel = 0
                  }
                })
              })
              this.sizeList.forEach((item)=>{
                this.sizeboxGroup.some((items)=>{
                  if(item.sizeId == items){
                    item.sel = 1
                    return true
                  }else{
                    item.sel = 0
                  }
                })
              })
              this.form.colorVOS =  this.colorList
              this.form.sizeVOS = this.sizeList
              //修改
              updateSpu(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }else{
              let colors = []
              let sizes = []
              this.colorList.forEach((item)=>{
                this.colorboxGroup.some((items)=>{
                  if(item.colorId == items){
                    colors.push({
                      skuColor: item.skuColor,
                      colorCode: item.colorCode,
                      colorId: item.colorId,
                    })
                    return true
                  }
                })
              })
              this.sizeList.forEach((item)=>{
                this.sizeboxGroup.some((items)=>{
                  if(item.sizeId == items){
                    sizes.push({
                      sizeCode: item.sizeCode,
                      sizeCn: item.sizeCode,
                      sizeId: item.sizeId
                    })
                    return true
                  }
                })
              })
              this.form.colors = colors
              this.form.sizes = sizes
              //新增
              addSpu(this.form).then(res => {
                this.$emit('hideDialog', false)
                this.$emit('uploadList')
              });
            }

          } else {
            return false;
          }
        })
      },
    }
  };
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<style lang="scss">
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
