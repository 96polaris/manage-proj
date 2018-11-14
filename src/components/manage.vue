<template>
<div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="景点设置" name="first">
      <div v-for="(value,index) in scenic" class="one">
        <div>
         <div class="two">景点ID:{{value.scenicId}}</div>
          <div class="three">景点名:{{value.scenicName}}</div>
           <el-button @click="setsecnicHot(value.scenicId)">设为热门景点</el-button>

        </div>
      </div>

    </el-tab-pane>
    <el-tab-pane label="游记设置" name="second" >
      <div v-for="(value,index) in note" class="one">
        <div>
          <div class="two">游记ID:{{value.travelNoteId}}</div>
          <div class="three">游记标题:{{value.travelTitle}}</div>
         <el-button @click="setnoteHot(value.travelNoteId)">设为热门游记</el-button></div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="线路设置" name="third">
      <div v-for="(value,index) in route" class="one">
        <div>
          <div class="two">线路ID:{{value.routeId}}</div>
          <div class="three">线路名称:{{value.routeName}}</div>
          <el-button @click="setrouteHot(value.routeId)">设为热门线路</el-button></div>


        <!--<hr>-->
      </div>
    </el-tab-pane>
    <el-tab-pane label="旅游活动审核" name="fourth">

      <div v-for="(value,index) in active" class="one">
        <div>
          <div class="two">活动ID:{{value.activityId}}</div>
          <div class="three">活动简介:{{value.activityIntroduce}}</div>
          <el-button @click.native="checkActAgree(value.activityId)">审核通过</el-button>
          <el-button @click.native="checkActRefuse(value.activityId)">审核不通过</el-button>
        </div>
      </div>
    </el-tab-pane>

    <el-tab-pane label="新增景点信息" name="five">
      <el-form ref="form" label-width="80px" size="mini" id="inner">
        <div style="margin-left: 60px; border: #c1e2b3 solid 1px;width: 150px;height: 150px;">
          <img  style="":src="pic" alt="">
        </div>
      <input  id="provide" type="file" name="avatar"
              @change="changeImage($event)"
              accept="image/gif,image/jpeg,image/jpg,image/png"
              ref="avatarInput"
              multiple><br/>

        <el-form-item label="景点名称">
          <el-col :span="12">
            <el-input v-model="scenicName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="景点标题">
          <el-col :span="12">
            <el-input v-model="test"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="景点等级">
          <el-col :span="12">
            <el-input v-model="scenicLevel"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="景点地址">
          <el-col :span="12">
            <el-input v-model="scenicAddress"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-col :span="12">
            <el-input v-model="openHours"></el-input>
            <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="openHours" style="width: 100%;"></el-time-picker>-->
          </el-col>
        </el-form-item>
        <el-form-item label="景点所在区域">
          <el-col :span="12">
            <el-input v-model="scenicLocation_scenicLocationId"></el-input>
          </el-col>
        </el-form-item>
        <el-button id="addBtn" type="button" class="btn btn-primary"@click="addScenic">确认发布</el-button>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
  import axios from'axios'
    export default {
        name: "manage",
      data() {
        return {
          activeName: 'first',
          scenic:[],
          route:[],
          note:[],
          active:[],
          //上传景点数据
          scenicName:'',
          test:'',
          scenicLevel:'',
          scenicAddress:'',
          openHours:'',
          scenicLocation_scenicLocationId:'',
          pic:'',
          upath:'',
        };
      },
      mounted:function(){
          let _this=this
          //获取景点
        axios({
                method: 'get',
                url: 'http://localhost:3000/manage/manageShowScenic',
    }).then(function (result) {
      _this.scenic=result.data.data

        }, function (err) {
      console.log(err);
    }),

        //线路显示
          axios({
            method: 'get',
            url: 'http://localhost:3000/manage/manageShowRoute',
          }).then(function (result) {
            _this.route=result.data.data

          }, function (err) {
            console.log(err);
          })

        //获取游记
        axios({
          method: 'get',
          url: 'http://localhost:3000/manage/manageShowNote',
        }).then(function (result) {
          _this.note=result.data.data

        }, function (err) {
          console.log(err);
        })


        //获取活动
        axios({
          method: 'get',
          url: 'http://localhost:3000/manage/manageShowAct',
        }).then(function (result) {
          _this.active=result.data.data
        }, function (err) {
          console.log(err);
        })
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);

        },
        //设置热门景点
        setsecnicHot(index){
          let _this=this
          axios({
            method: 'get',
            url: `http://localhost:3000/manage/setScenic/${index}`,
          }).then(function (result) {
            alert('设置热门景点成功')
            //重新调用接口，显示新数据
            axios({
              method: 'get',
              url: `http://localhost:3000/manage/manageShowScenic`,
            }).then(function (result) {
              _this.scenic=result.data.data
            }, function (err) {
              console.log(err);
            })


          }, function (err) {
            console.log(err);
          })
        },
        //设置热门线路
        setrouteHot(index){
          console.log(index);
          let _this=this
          axios({
            method: 'get',
            url: `http://localhost:3000/manage/setRoute/${index}`,
          }).then(function (result) {
            console.log(result);
            alert('设置热门线路成功')
            //重新调用接口，显示新数据
            //线路显示
            axios({
              method: 'get',
              url: 'http://localhost:3000/manage/manageShowRoute',
            }).then(function (result) {
              _this.route=result.data.data

            }, function (err) {
              console.log(err);
            })


          }, function (err) {
            console.log(err);
          })
        },
        //设置热门游记
        setnoteHot(index){
          console.log(index);
          let _this=this
          axios({
            method: 'get',
            url: `http://localhost:3000/manage/setNote/${index}`,
          }).then(function (result) {
            console.log(result);
            alert('设置热门游记成功')
            //重新调用接口，显示新数据
            //线路显示
            axios({
              method: 'get',
              url: 'http://localhost:3000/manage/manageShowNote',
            }).then(function (result) {
              _this.note=result.data.data

            }, function (err) {
              console.log(err);
            })


          }, function (err) {
            console.log(err);
          })
        },
//管理员审核活动通过
        checkActAgree(index){

          console.log(index);
          let _this=this
          axios({
            method: 'post',
            url: 'http://localhost:3000/manage/manageCheckActAgree',
            data:{
              activityId:index
            }
          }).then(function (result) {
            alert('设置成功')
            _this.active=result.data.data
            //重新调用接口，显示新数据
            axios({
              method: 'get',
              url: 'http://localhost:3000/manage/manageShowAct',
            }).then(function (result) {
              _this.active=result.data.data
            }, function (err) {
              console.log(err);
            })


          }, function (err) {
            console.log(err);
          })
        },
  //管理员审核活动不通过
        checkActRefuse(index){

          console.log(index);
          let _this=this
          axios({
            method: 'post',
            url: 'http://localhost:3000/manage/managecheckActRefuse',
            data:{
              activityId:index
            }
          }).then(function (result) {
            alert('设置成功')
            _this.active=result.data.data
            //重新调用接口，显示新数据
            axios({
              method: 'get',
              url: 'http://localhost:3000/manage/manageShowAct',
            }).then(function (result) {
              _this.active=result.data.data
            }, function (err) {
              console.log(err);
            })


          }, function (err) {
            console.log(err);
          })
        },

        //添加景点信息
        addScenic() {
          var zipFormData = new FormData();
          // console.log(this.upath[0]);
          zipFormData.append('scenicName', this.scenicName)
          zipFormData.append('test', this.tese)
          zipFormData.append('scenicLevel', this.scenicLevel)
          zipFormData.append('scenicAddress', this.scenicAddress)
          zipFormData.append('openHours', this.openHours)
          zipFormData.append('scenicLocation_scenicLocationId', this.scenicLocation_scenicLocationId)
          zipFormData.append('scenicImage', this.upath[0])
          let config = {headers: {'Content-Type': 'multipart/form-data'}};
          if(this.upath==''||this.scenicName==''||this.tese==''||this.scenicLevel==''||this.scenicAddress==''||this.openHours==''||this.scenicLocation_scenicLocationId==''){
            alert('请输入完整信息')
          }  else{
            axios.post('http://localhost:3000/scenic/AddScenic', zipFormData, config)
              .then(function (result) {
                console.log(result.data)
              })
            alert("新景点发布成功")
            // this.$router.push({path:'/activity'})
          }
        },
        //选中文件后，将文件保存到实例的变量中
        changeImage(e) {

          this.upath = e.target.files;
          console.log(this.upath);
          let $target = e.target || e.srcElement
          let file = $target.files[0]
          var reader = new FileReader()
          reader.onload = (data) => {
            let res = data.target || data.srcElement
            this.pic = res.result
          }
          reader.readAsDataURL(file)


        }


        },
    }
</script>

<style scoped>
.two{
  width:150px;
  height:10px;
  display: inline-block;
}
  .three{
    width: 400px;
    display: inline-block;
  }
  .one{
    margin-top: 20px;
  }
img{
  width: 150px;
  height: 150px;
  display: flex;
  overflow: hidden;
}
</style>
