<template>
	<el-dialog title="新增商品" :visible.sync="showDialog" size="small" @close="closeDialog">
		<el-form :model="formEntity" label-width="100px" label-suffix=":">
			<el-form-item label="商品Id">
				<el-input v-model="formEntity.id"></el-input>
			</el-form-item>
			<el-form-item label="商品价格">
				<el-input v-model="formEntity.price"></el-input>
			</el-form-item>
			<el-form-item label="商品标题">
				<el-input v-model="formEntity.title"></el-input>
			</el-form-item>
			<el-form-item label="商品描述">
				<el-input v-model="formEntity.description"></el-input>
			</el-form-item>
			<el-form-item label="">
				<el-button type="primary" size="small" @click="addParam">新增卡券</el-button>
			</el-form-item>
			<el-form-item label="" v-for="(item,index) in customParams" :key="index">
				<el-row :gutter="15">
					<el-col :span="11">
						<el-select filterable 
							v-model="item.key" placeholder="请选择卡券">
							<el-option v-for="item in cardList" :value="item.id" :label="item.title" :key="item.id" />
						</el-select>
					</el-col>
					<el-col :span="11">
						<el-input label="数量" v-model="item.value" placeholder="请填写赠送卡券数量"></el-input>
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
				cardIdAndCounts:{}
			},
			cardList:[],
			initKeyMap: null,
			customParams: []
		}
	},
	created() {
		api.card.all().then(res =>{
			this.cardList = res.data.data;
		})
	},
	watch: {
		
	},
	methods: {
		closeDialog() {
			//父页面更新列表
			this.$parent.loadPage();
			this.$router.push({ path: '/product' });
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
		},
		handleAdd() {	
			Object.assign(this.formEntity.cardIdAndCounts, util.covertObjToMap(this.customParams));		
			api.product.add(this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
