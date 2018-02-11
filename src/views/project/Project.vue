<template>
	<div>
		<div class="queryForm">
			<el-form :inline="true" :model="queryParam" ref="queryParam" :rules="rules" class="demo-form-inline" label-suffix=":" label-width="100px">
				<el-form-item label="项目名称" prop="projectName">
					<el-input v-model="queryParam.projectName" placeholder="项目名称"></el-input>
				</el-form-item>
				<el-form-item label="项目编号" prop="projectCode">
					<el-input v-model="queryParam.projectCode" placeholder="项目编号"></el-input>
				</el-form-item>
				<el-form-item label="项目描述" prop="projectDesc">
					<el-input v-model="queryParam.projectDesc" placeholder="项目描述"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="loadPage">查询</el-button>
					<el-button type="primary" size="small" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-button type="primary" size="small" @click="$router.push({ name: 'projectAdd' })">新增项目</el-button>
		<el-table :data="pageInfo.tableList" highlight-current-row stripe border max-height="640" v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="50" align="center">
			</el-table-column>
			<el-table-column type="index" width="60" align="center">
			</el-table-column>
			<el-table-column prop="projectName" label="项目名称" min-width="120">
			</el-table-column>
			<el-table-column prop="projectCode" label="项目编码" width="120" align="center">
			</el-table-column>
			<el-table-column prop="projectDesc" label="项目描述" min-width="180">
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column prop="updateTime" label="更新时间" min-width="120" :formatter="dateFormat" sortable align="center">
			</el-table-column>
			<el-table-column label="操作" width="180" align="center">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="$router.push({name:'projectUpdate',params: {id:scope.row.id}})">编辑</el-button>
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
import api from "../../api";
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
      listLoading: false,
      sels: [],
      //项目检索参数
      queryParam: storeSession.get("PROJECT-QUERY") || {
        projectName: null,
        projectCode: null,
        projectDesc: null,
        page: {
          currentPage: 1,
          pageSize: 15,
          totalNum: 0
        }
      },
      rules: {}
    };
  },
  created() {
    api.validator
      .getPageRulesList({ ruleId: api.validator.ruleParams.PROJECT_QUERY })
      .then(res => {
        if (
          res.data.data != undefined ||
          res.data.data != null ||
          res.data.data != ""
        ) {
          this.rules = eval(res.data.data);
        }
        this.loadPage();
      });
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
      this.$refs["queryParam"].validate(valid => {
        if (valid) {
          storeSession.set("PROJECT-QUERY", this.queryParam);
          api.project.getProjectList(this.queryParam).then(res => {
            this.pageInfo.tableList = res.data.data.list;
            this.pageInfo.page = res.data.data.page;
          });
        } else {
          return false;
        }
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
        api.project.deleteProject(row.id).then(res => {
          this.loadPage();
        });
      });
    },
    reset() {
      // this.$refs['queryParam'].resetFields();
      this.queryParam = {
        projectName: null,
        projectCode: null,
        projectDesc: null,
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
