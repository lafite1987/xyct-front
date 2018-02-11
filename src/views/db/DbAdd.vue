<template>
	<el-dialog title="新增数据库" :visible.sync="showDialog" size="small" @close="closeDialog">
		<el-form :model="formEntity" label-width="100px" label-suffix=":">
			<el-form-item label="数据库名称">
				<el-input v-model="formEntity.dbName"></el-input>
			</el-form-item>
			<el-form-item label="数据库类型">
				<el-select filterable v-model="formEntity.dbType">
					<el-option v-for="item in dbTypeList" :value="item" :label="item" :key="item" />
				</el-select>
			</el-form-item>
			<el-form-item label="">
				<el-button type="primary" size="small" @click="addParam">新增自定义参数</el-button>
			</el-form-item>
			<el-form-item label="" v-for="(item,index) in customParams" :key="index">
				<el-row :gutter="15">
					<el-col :span="11">
						<el-input v-model="item.key"></el-input>
					</el-col>
					<el-col :span="11">
						<el-input v-model="item.value"></el-input>
					</el-col>
					<el-col :span="2" style="text-align:right">
						<el-button type="danger" size="small" @click="deleteParam(index)">删除</el-button>
					</el-col>
				</el-row>
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
				dbName: null,
				dbType: null,
				params: {}
			},
			dbTypeList: [],
			initKeyMap: null,
			customParams: []
		}
	},
	created() {
		api.db.getDbConfig().then(res => {
			this.dbTypeList = res.data.data.dbTypeList;
			this.initKeyMap = res.data.data.initKeyMap;
		});
	},
	watch: {
		'formEntity.dbType': {
			handler(curVal, oldVal) {
				this.customParams = [];
				let initKey = this.initKeyMap[curVal];
				initKey.forEach(function(element) {
					this.customParams.push({
						key: element,
						value: ""
					})
				}, this);
			}
		}
	},
	methods: {
		closeDialog() {
			//父页面更新列表
			this.$parent.loadPage();
			this.$router.push({ path: '/db' });
		},
		handleAdd() {			
			Object.assign(this.formEntity.params, util.covertObjToMap(this.customParams));
			api.db.addDb(this.formEntity).then(res => {
				this.closeDialog();
			})
		},
		addParam() {
			this.customParams.push({
				key: "",
				value: ""
			});
		},
		deleteParam(index) {
			let newParams = [];
			newParams = newParams.concat(this.customParams.slice(0, index));
			newParams = newParams.concat(this.customParams.slice(index + 1));
			this.customParams = newParams;
		}
	}
}
</script>
