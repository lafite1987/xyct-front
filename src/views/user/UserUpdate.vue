<template>
	<el-dialog title="更新用户" :visible.sync="showDialog" size="small" @close="closeDialog">
		<el-form :model="formEntity" label-width="100px" label-suffix=":">
			<el-form-item label="用户类型">
				<el-select filterable v-model="formEntity.userType">
					<el-option v-for="item in userTypeList" :value="item.code" :label="item.name" :key="item.code" />
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="closeDialog">返 回</el-button>
			<el-button size="small" type="primary" @click="handleUpdate">确 定</el-button>
		</div>
	</el-dialog>
</template>

<style lang="scss" scoped>

</style>

<script>
import axios from 'axios';
import api from '../../api';
import util from '../../common/js/util';
import commons from '../../mixins/commons';


export default {
	mixins: [
		commons
	],
	data() {
		return {
			showDialog: true,
			//新建数据库实例
			formEntity: {
				
			},
			userTypeList: [{code : 1, name : "用户"}, {code : 2, name : "员工"}],
		}
	},
	created() {
		api.user.detail(this.$route.params.id).then(res => {
			this.formEntity = res.data.data;
		});
	},
	methods: {
		closeDialog() {
			//父页面更新列表
			this.$parent.loadPage();
			this.$router.push({ path: '/user' });
		},
		handleUpdate() {
			api.user.update(this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
