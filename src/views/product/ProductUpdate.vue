<template>
	<el-dialog title="更新商品" :visible.sync="showDialog" size="small" @close="closeDialog">
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
			<el-form-item label="卡券">
				<el-select filterable v-model="formEntity.cardId">
					<el-option v-for="item in cardList" :value="item.id" :label="item.title" :key="item.id" />
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
			//新建数据库实例
			formEntity: {
				
			},
			cardList:[],
		}
	},
	created() {
		api.product.detail(this.$route.params.id).then(res => {
			this.formEntity = res.data.data;
		});
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
		handleUpdate() {
			api.product.update(this.formEntity.id, this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
