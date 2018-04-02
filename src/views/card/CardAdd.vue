<template>
	<el-dialog title="新增卡券" :visible.sync="showDialog" size="small" @close="closeDialog">
		<el-form :model="formEntity" label-width="100px" label-suffix=":">
			<el-form-item label="卡券状态">
				<el-select filterable v-model="formEntity.state">
					<el-option v-for="item in stateList" :value="item.code" :label="item.name" :key="item.code" />
				</el-select>
			</el-form-item>
			<el-form-item label="卡券类型">
				<el-select filterable v-model="formEntity.cardType">
					<el-option v-for="item in cardTypeList" :value="item.code" :label="item.name" :key="item.code" />
				</el-select>
			</el-form-item>
			<el-form-item label="满XX元使用">
				<el-input v-model="formEntity.leastCost"></el-input>
			</el-form-item>
			<el-form-item label="券面金额">
				<el-input v-model="formEntity.reduceCost"></el-input>
			</el-form-item>
			<el-form-item label="库存">
				<el-input v-model="formEntity.quantity"></el-input>
			</el-form-item>
			<el-form-item label="卡券标题">
				<el-input v-model="formEntity.title"></el-input>
			</el-form-item>
			<el-form-item label="卡券描述">
				<el-input v-model="formEntity.description"></el-input>
			</el-form-item>
			<el-form-item label="使用说明">
				<el-input v-model="formEntity.instruction"></el-input>
			</el-form-item>
			<el-form-item label="发放时间">
				<el-date-picker
					v-model="formEntity.beginIssuedTime"
					type="datetime"
					value-format="timestamp"
					placeholder="选择开始时间"
					:default-time="['00:00:00']">
					</el-date-picker>至
					<el-date-picker
						v-model="formEntity.endIssuedTime"
						type="datetime"
						value-format="timestamp"
						:default-time="['00:00:00']"
						placeholder="选择结束时间">
						</el-date-picker>
			</el-form-item>
			<el-form-item label="生效时间">
				<el-date-picker
					v-model="formEntity.effectiveBeginTime"
					type="datetime"
					value-format="timestamp"
					:default-time="['00:00:00']"
					placeholder="选择开始时间">
					</el-date-picker>至
					<el-date-picker
						v-model="formEntity.effectiveEndTime"
						type="datetime"
						value-format="timestamp"
						:default-time="['00:00:00']"
						placeholder="选择结束时间">
						</el-date-picker>
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
				
			},
			cardTypeList: [{code : "CASH", name : "代金券"}],
			stateList: [{code : 1, name : "正常发放"}, {code : 2, name : "暂停发放"}, {code : 3, name : "停止发放"}],
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
			this.$router.push({ path: '/card' });
		},
		handleAdd() {			
			api.card.add(this.formEntity).then(res => {
				this.closeDialog();
			})
		},
	}
}
</script>
