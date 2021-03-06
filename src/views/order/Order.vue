<template>
	<div>
		<div class="queryForm">
			<el-form :inline="true" :model="queryParam" class="demo-form-inline" label-suffix=":" label-width="100px">
				<el-form-item label="订单号">
					<el-input v-model="queryParam.query.orderId" placeholder="订单号"></el-input>
				</el-form-item>
        <el-form-item label="微信订单号">
					<el-input v-model="queryParam.query.outTradeNo" placeholder="微信订单号"></el-input>
				</el-form-item>
        <el-form-item label="商品Id">
					<el-input v-model="queryParam.query.productId" placeholder="商品Id"></el-input>
				</el-form-item>
				<el-form-item label="支付状态">
					<el-select filterable v-model="queryParam.query.payStatus">
						<el-option value="" label="所有" />
						<el-option v-for="item in payStatusList" :value="item.code" :label="item.name" :key="item.code" />
					</el-select>
				</el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
					v-model="queryParam.query.startTime"
					type="date"
					value-format="timestamp"
					placeholder="开始时间">
					</el-date-picker>至
					<el-date-picker
						v-model="queryParam.query.endTime"
						type="date"
						value-format="timestamp"
						placeholder="结束时间">
						</el-date-picker>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="loadPage">查询</el-button>
					<el-button type="primary" size="small" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table :data="pageInfo.tableList" highlight-current-row stripe border :summary-method="getSummaries" show-summary max-height="640" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="80" align="center">
			</el-table-column>
			<el-table-column prop="id" label="订单号" min-width="100">
			</el-table-column>
			<el-table-column prop="productId" label="商品Id" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="productName" label="商品名称" min-width="100">
			</el-table-column>
      <el-table-column prop="amount" label="订单金额" min-width="100">
			</el-table-column>
      <el-table-column prop="payStatus" label="支付状态" min-width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.payStatus==1" type="1">创建</el-tag>
          <el-tag v-if="scope.row.payStatus==2" type="2">待支付</el-tag>
          <el-tag v-if="scope.row.payStatus==3" type="3">已支付</el-tag>
        </template>
			</el-table-column>
      <el-table-column prop="userId" label="用户Id" min-width="100">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
		</el-table>

		<div class="paginationSection" style="float:right">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.page.currentPage" :page-sizes="[10, 15, 20, 30, 40]" :page-size="pageInfo.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.page.totalNum">
			</el-pagination>
		</div>
		<router-view></router-view>
	</div>
</template>

<style lang="scss" scoped>

</style>

<script>
import axios from "axios";
import api from "../../api";
import util from "../../common/js/util";
import commons from "../../mixins/commons";

export default {
  mixins: [commons],
  data() {
    return {
      //页面结果数据
      pageInfo: {
        tableList: [],
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      },
      payStatusList: [{
        code : 1,
        name : "创建"
      }, {
        code : 2,
        name : "待支付"
      }, {
        code : 3,
        name : "已支付"
      }],
      listLoading: false,
      sels: [],
      //检索参数
      queryParam: storeSession.get("ORDER-QUERY") || {
        query: {
          orderId: null,
          productId : null,
          outTradeNo: null,
          payStatusType: null,
          startTime: null,
          endTime: null,
        },
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      }
    };
  },
  created() {
    this.loadPage();
  },
  watch: {
    queryParam: {
      handler(curVal, oldVal) {
        //清理延时任务
        clearTimeout(this.timeoutTask);
        //启动延时任务
        this.timeoutTask = setTimeout(() => {
          this.loadPage();
        }, 400);
      },
      deep: true
    }
  },
  methods: {
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          if (index === 1 || index === 2 || index === 3) {
            sums[index] = 'N/A';
            return;
          }
          if (index === 5 || index === 6 || index === 7 || index === 8) {
            sums[index] = 'N/A';
            return;
          }
          
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
    selsChange(sels) {
      this.sels = sels;
    },
    loadPage() {
      storeSession.set("ORDER-QUERY", this.queryParam);
      api.order.list(this.queryParam).then(res => {
        this.pageInfo.tableList = res.data.data.list;
        this.pageInfo.page = res.data.data.page;
      });
    },
    handleSizeChange(val) {
      this.queryParam.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.queryParam.page.currentPage = val;
    },
    reset() {
      this.queryParam = {
        query: {
          orderId: null,
          productId: null,
          outTradeNo: null,
          payStatusType: null,
        },
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      };
    }
  }
};
</script>
