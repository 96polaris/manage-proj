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
          active:[]
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

        },
        secnicHot(index){
          let _this=this
          axios({
            method: 'get',
            data:{
              scenicId:_this.scenic[index].scenicId
          },
            url: 'http://localhost:3000/manage/setScenic/',
          }).then(function (result) {
            alert('设置成功')
            _this.scenic=result.data.data
          }, function (err) {
            console.log(err);
          })
        }
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
</style>
