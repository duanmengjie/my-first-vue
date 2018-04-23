<template>
  <div class="record_page">
  
    <el-row>
  
      <div class="break_main">
  
        <div class="data_main2">
  
          <span class="break_title">缴款人：</span>
  
          <el-input size="small" placeholder="输入姓名" v-model="payee" name="payee" clearable>
  
          </el-input>
  
        </div>
  
        <div class="data_main2">
  
          <span class="break_title">缴款人证件号：</span>
  
          <el-input size="small" placeholder="输入身份证号" v-model="card" name="card" clearable>
  
          </el-input>
  
        </div>
  
        <div class="data_main2">
  
          <span class="break_title">缴款日期：</span>
  
          <el-date-picker value-format="yyyy-MM-dd" v-model="gmt_create" name="gmt_create" type="date" size="small" placeholder="选择日期">
  
          </el-date-picker>
  
        </div>
  
        <div class="data_main2">
  
          <span class="break_title">缴款类型：</span>
  
          <el-select v-model="value" placeholder="请选择" size="small" name="value">
  
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
  
            </el-option>
  
          </el-select>
  
        </div>
  
        <a class="choose_btn" @click="tabInit()">筛选</a>
  
      </div>
  
      <div class="right_box">
  
        <div class="content_box">
  
          <div class="transaction_cont">
  
            <h3 class="transaction_title">交易记录</h3>
  
            <a class="export_btn" @click="exportEvent()">导出</a>
  
          </div>
  
          <div class="table_main">
  
            <div class="tab_size">
  
              <el-table v-loading="loading" :data="list" border height="100%" style="width: 100%;">
  
                  <el-table-column prop="gmt_create" label="缴款时间" width="160">
                  </el-table-column>
                  <el-table-column
                    prop="buyer_logon_id"
                    label="缴款人"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="trade_no"
                    label="缴款人证件号"
                    width="265">
                  </el-table-column>
                  <el-table-column
                    prop="fund_bill_list" 
                    label="缴款类型" width="150">
                    <template slot-scope="scope">
                      <span v-if="scope.row.fund_bill_list =='COUPON'">支付宝红包</span>
                      
                      <span v-if="scope.row.fund_bill_list =='ALIPAYACCOUNT'">支付宝余额</span>
                      
                      <span v-if="scope.row.fund_bill_list =='POINT'">集分宝</span>
                      
                      <span v-if="scope.row.fund_bill_list =='DISCOUNT'">折扣券</span>
                      
                      <span v-if="scope.row.fund_bill_list =='PCARD'">预付卡</span>
                      
                      <span v-if="scope.row.fund_bill_list =='FINANCEACCOUNT'">余额宝</span>
                      
                      <span v-if="scope.row.fund_bill_list =='MCARD'">商家储值卡</span>
                      
                      <span v-if="scope.row.fund_bill_list =='MDISCOUNT'">商户优惠券</span>
                      
                      <span v-if="scope.row.fund_bill_list =='MCOUPON'">商户红包</span>
                      
                      <span v-if="scope.row.fund_bill_list =='PCREDIT'">蚂蚁花呗</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="body"
                    label="缴款信息">
                  </el-table-column>
                  <el-table-column width="100"
                                   prop="buyer_pay_amount"
                                   label="缴款额/元">
                  </el-table-column>
                  <el-table-column width="100" class="cz"
                                   prop="trade_status" align="center"
                                   label="缴款状态">
                    <template slot-scope="scope">
                      <el-tag :type="scope.row.trade_status === 'TRADE_SUCCESS' ? '成功' : '失败'" close-transition>
                      
                        <span v-if="scope.row.trade_status === 'TRADE_SUCCESS'" class="el-tag-success1">成功</span>
                      
                      </el-tag>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="error_tips" v-if="error_tip">
                  服务器出错啦~
                </div>
              </div>
              <div class="page_main" v-if="page_is_show">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[10, 15]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="parseInt(total)">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
.record_page {
  height: 100%;
  .break_main {
    background: rgb(235, 245, 255);
    width: 100%;
    border: solid 1px rgb(187, 210, 231);
    .data_main2 {
      height: 60px;
      padding-left: 20px;
      display: inline-block;
      .break_title {
        display: inline-block;
        color: rgb(74, 98, 120);
        font-size: 14px;
        line-height: 60px;
      }
    }
    .el-input--small {
      width: 160px;
      height: 30px;
    }
    .choose_btn {
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #ffffff;
      background: rgb(1, 84, 163);
      float: right;
      margin-right: 45px;
      margin-top: 15px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .right_box {
    height: calc(100% - 100px);
    background: #f2f2f2;
    padding: 20px;
    .content_box {
      width: 100%;
      height: 100%;
      background: #fff;
    }
    .transaction_cont {
      width: 100%;
      .transaction_title {
        border-left: solid 4px rgb(230, 33, 41);
        height: 50px;
        line-height: 50px;
        display: inline-block;
        padding-left: 26px;
        color: rgb(77, 77, 77);
        font-size: 16px;
      }
      .export_btn {
        float: right;
        border: solid 1px rgb(143, 169, 193);
        width: 58px;
        height: 28px;
        text-align: center;
        line-height: 30px;
        color: rgb(1, 84, 163);
        font-size: 14px;
        border-radius: 4px;
        margin-right: 25px;
        margin-top: 10px;
        cursor: pointer;
      }
    }
    .table_main {
      padding: 20px 20px 0 20px;
      height: -o-calc(100% - 70px);
      height: -ms-calc(100% - 70px);
      height: calc(100% - 70px);
      position: relative;
      .el-tag {
        background: none;
        border: 0;
        color: rgb(7, 152, 99);
      }
      .el-tag-primary1 {
        color: rgb(230, 33, 41);
      }
      .el-tag-success1 {
        color: rgb(7, 152, 99);
      }
      .tab_size[data-v-80fe5de4] {
        height: -o-calc(100% - 100px);
        height: -ms-calc(100% - 100px);
        height: calc(100% - 100px);
      }
    }
  }
  .page_main {
    background: #fff;
    text-align: center;
    padding: 20px 0;
  }
}
</style>
<script>
export default {
  data() {
    return {
      payee: "", //  收款人
      card: "", // 收款人证件号
      gmt_create: "", // 缴款时间
      value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value4: "",
      list: [],
      pageNum: 1,
      total: "",
      pageSize: 10,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "交通缴费"
        },
        {
          value: "1",
          label: "教育缴费"
        },
        {
          value: "2",
          label: "出入境"
        },
        {
          value: "3",
          label: "城市管理"
        }
      ],
      value: "", // 缴款类型
      value1: "",
      loading: false,
      page_is_show: true, // 分页是否显示
      error_tip: false // 错误提示信息是否显示
    };
  },
  methods: {
    tabInit() {
      this.$http
        .get("../../../static/record.json", {
          params: {
            payment_people: this.payee,
            payment_number: this.card,
            gmt_create: this.gmt_create,
            order_type: this.value,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          }
        })
        .then(res => {
          if (res.data) {
            this.list = res.data.list.tableData3;
            this.error_tip = false;
            this.total = res.data.list.totalNum;
          } else if (res.data == "") {
            this.error_tip = true;
          }
        });
    },
    handleSizeChange(val) {
      // 一页显示多少条
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // 当前第几页
      this.pageNum = val;
    },
    // 导出
    exportEvent() {
      window.location.href =
        "http://192.168.1.57:8080/spr-paymanager/exportExcel" +
        "?gmt_create=" +
        this.gmt_create +
        "&payment_people=" +
        this.payee +
        "&payment_number=" +
        this.card +
        "&order_type=" +
        this.value;
    }
  },
  mounted: function() {
    this.tabInit();
  }
};
</script>

