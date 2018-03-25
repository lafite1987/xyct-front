<template>
	<div>
		<div class="queryForm">
			<el-form :inline="true" :model="queryParam" class="demo-form-inline" label-suffix=":" label-width="100px">
				<el-form-item label="卡券Id">
					<el-input v-model="queryParam.query.cardId" placeholder="卡券Id"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="loadPage">查询</el-button>
					<el-button type="primary" size="small" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-button type="primary" size="small" @click="$router.push({ name: 'cardAdd' })">添加卡券</el-button>
		<el-table :data="pageInfo.tableList" highlight-current-row stripe border max-height="640" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="index" width="60" align="center">
			</el-table-column>
			<el-table-column prop="id" label="卡券Id" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="cardType" label="卡券类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cardType=='CASH'" type="CASH">代金券</el-tag>
          <el-tag v-if="scope.row.cardType=='GIFT'" type="GIFT">礼券</el-tag>
          <el-tag v-if="scope.row.cardType=='DISCOUNT'" type="DISCOUNT">折扣券</el-tag>
        </template>
			</el-table-column>
      <el-table-column prop="leastCost" label="条件" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="reduceCost" label="金额" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="quantity" label="库存" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="issuedCount" label="已发放" min-width="100" align="center">
			</el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state=='1'" type="1">正常</el-tag>
          <el-tag v-if="scope.row.state=='2'" type="2">暂停发放</el-tag>
          <el-tag v-if="scope.row.state=='3'" type="3">停止发放</el-tag>
        </template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" width="320" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push({name:'cardUpdate',params: {id:scope.row.id}})">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
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
      sels: [],
      listLoading: false,
      //检索参数
      queryParam: storeSession.get("CARD-QUERY") || {
        query: {
          cardId: null,
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
    selsChange(sels) {
      this.sels = sels;
    },
    loadPage() {
      storeSession.set("CARD-QUERY", this.queryParam);
      api.card.list(this.queryParam).then(res => {
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
    handleDelete(index, row) {
      this.$confirm("确认删除", "警告").then(() => {
        api.card.del(row.id).then(res => {
          this.loadPage();
        });
      });
    },
    reset() {
      this.queryParam = {
        query: {
          productId: null,
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
