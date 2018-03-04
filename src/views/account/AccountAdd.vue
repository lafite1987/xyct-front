<template>
	<el-dialog title="新增账户" :visible.sync="showDialog" size="small" @close="closeDialog">
		<el-form :model="formEntity" label-width="100px" label-suffix=":">
			<el-form-item label="账户名">
				<el-input v-model="formEntity.username"></el-input>
			</el-form-item>
			<el-form-item label="账户密码">
				<el-input v-model="formEntity.password"></el-input>
			</el-form-item>
			<el-form-item label="手机号">
				<el-input v-model="formEntity.phone"></el-input>
			</el-form-item>
			<el-form-item label="账户状态">
				<el-select filterable v-model="formEntity.state">
					<el-option v-for="item in stateList" :value="item.code" :label="item.name" :key="item.code" />
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button size="small" @click="closeDialog">返 回</el-button>
			<el-button size="small" type="primary" @click="handleAdd">确 定</el-button>
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
				username: null,
				phone: null,
				password: null,
				state: null
			},
			stateList: [{code : 1, name : "正常"}, {code : 2, name : "封号"}],
			initKeyMap: null,
			customParams: []
		}
	},
	created() {
		
	},
	watch: {
		
	},
	methods: {
		closeDialog() {
			//父页面更新列表
			this.$parent.loadPage();
			this.$router.push({ path: '/account' });
		},
		handleAdd() {			
			api.account.addAccount(this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
