<template>
	<div>
		<div class="queryForm">
			<el-form :inline="true" :model="queryParam" class="demo-form-inline" label-suffix=":" label-width="100px">
				<el-form-item label="用户昵称">
					<el-input v-model="queryParam.query.nickname" placeholder="用户昵称"></el-input>
				</el-form-item>
				<el-form-item label="用户类型">
					<el-select filterable v-model="queryParam.query.userType">
						<el-option value="" label="所有" />
						<el-option v-for="item in userTypeList" :value="item.code" :label="item.name" :key="item.code" />
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="loadPage">查询</el-button>
					<el-button type="primary" size="small" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-button type="primary" size="small" @click="$router.push({ name: 'userAdd' })">新增用户</el-button>
		<el-table :data="pageInfo.tableList" highlight-current-row stripe border max-height="640" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60" align="center">
			</el-table-column>
			<el-table-column prop="nickname" label="用户昵称" min-width="100">
			</el-table-column>
			<el-table-column prop="userType" label="类型" min-width="50" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userType==1" type="1">用户</el-tag>
          <el-tag v-if="scope.row.userType==2" type="2">员工</el-tag>
        </template>
			</el-table-column>
      <el-table-column prop="openid" label="微信号" min-width="200">
			</el-table-column>
      <el-table-column prop="balance" label="余额" min-width="100">
			</el-table-column>
      <el-table-column prop="earning" label="收益" min-width="100">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" width="320" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push({name:'userUpdate',params: {id:scope.row.id}})">编辑</el-button>
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
      userTypeList: [{
        code : 1,
        name : "用户"
      }, {
        code : 2,
        name : "员工"
      }],
      listLoading: false,
      sels: [],
      //检索参数
      queryParam: storeSession.get("USER-QUERY") || {
        query: {
          nickname: null,
          userType: null,
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
      storeSession.set("USER-QUERY", this.queryParam);
      api.user.list(this.queryParam).then(res => {
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
        api.db.deleteDb(row.id).then(res => {
          this.loadPage();
        });
      });
    },
    reset() {
      this.queryParam = {
        query:{
          nickname: null,
          phone: null,
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
