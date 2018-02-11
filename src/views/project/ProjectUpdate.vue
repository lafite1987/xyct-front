<template>
	<el-dialog title="更新项目" :visible.sync="showDialog" size="tiny" @close="closeDialog">
		<el-form :model="formEntity" ref="formEntity" :rules="rules" label-width="100px" label-suffix=":">
			<el-form-item label="系统名称" prop="systemCode">
				<el-select filterable v-model="formEntity.systemCode" disabled>
					<el-option v-for="item in systemList" :value="item.systemCode" :label="item.systemName" :key="item.systemCode" />
				</el-select>
			</el-form-item>
			<el-form-item label="项目名称" prop="projectName">
				<el-input v-model="formEntity.projectName"></el-input>
			</el-form-item>
			<el-form-item label="项目描述" prop="projectDesc">
				<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="formEntity.projectDesc"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="closeDialog">返 回</el-button>
			<el-button size="small" type="primary" @click="update">确 定</el-button>
		</div>
	</el-dialog>
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
      //新建项目弹框
      showDialog: true,
      //项目检索参数
      //系统列表
      systemList: [
        {
          systemCode: "xyct",
          systemName: "VIVO大数据平台"
        }
      ],
      formEntity: {},
      rules: {}
    };
  },
  created() {
    api.project.detailProject(this.$route.params.id).then(res => {
      this.formEntity = res.data.data;
    });

    api.validator
      .getPageRulesList({ ruleId: api.validator.ruleParams.PROJECT_UPDATE })
      .then(res => {
        if (
          res.data.data != undefined ||
          res.data.data != null ||
          res.data.data != ""
        ) {
          this.rules = eval(res.data.data);
        }
      });
  },
  methods: {
    closeDialog() {
      //父页面更新列表
      this.$parent.loadPage();
      this.$router.push({ path: "/project" });
    },
    update() {
      this.$refs["formEntity"].validate(valid => {
        if (valid) {
          api.project
            .updateProject(this.formEntity.id, this.formEntity)
            .then(res => {
              this.closeDialog();
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
