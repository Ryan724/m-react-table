import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTable from '../../src';

export default class Demo extends Component {	

	constructor(props,context) {
	   super(props);
	}

	render() {
		let tableStyle = this.getTableStyle();
		let tableData = this.getTableData();
		return (
			<div className ="table">
				<ReactTable tableStyle = { tableStyle } tableData = { tableData }> </ReactTable>
			</div>
				)
	}
	getTableStyle(){
		return   {
							viewportWidth:screen.width-20,
							viewportHeight:screen.height,
							headerHeight: 40,
							groupHeaderHeight:25
						};
	}
	getTableData(){
		let tableData ={
				header:{"columns": [
								{"title": "一级部门", "realTitle": "一级部门", "name": "s_5046_5725", "isDrill": false, "groupBy": [], "subColumns": [] }, 
								{"title": "二级部门", "realTitle": "二级部门", "name": "s_5046_5716", "isDrill": false, "groupBy": [], "subColumns": [] },
								{"title": "三级部门", "realTitle": "三级部门", "name": "s_5046_5711", "isDrill": false, "groupBy": [], "subColumns": [] }, 
								{"title": "四级部门", "realTitle": "四级部门", "name": "s_5006_5118", "isDrill": false, "groupBy": [], "subColumns": [] }, 
								{"title": "五级部门", "realTitle": "五级部门", "name": "s_5006_5113", "isDrill": false, "groupBy": [], "subColumns": [] }, 
								{"title": "六级部门", "realTitle": "六级部门", "name": "s_5006_5114", "isDrill": false, "groupBy": [], "subColumns": [] },
								{"title": "七级部门", "realTitle": "七级部门", "name": "s_5006_5120", "isDrill": false, "groupBy": [], "subColumns": [] }, 
								{"title": "八级部门", "realTitle": "八级部门", "name": "s_5006_5111", "isDrill": false, "groupBy": [], "subColumns": [] },
								{"title": "九级部门", "realTitle": "九级部门", "name": "s_5006_5116", "isDrill": false, "groupBy": [], "subColumns": [] } ]
					 },
				body:[]
		}
		for(let i = 0 ; i <40; i ++){
			tableData.body.push({
					"s_5046_5725": "一级"+i,
					"s_5046_5716": "二级"+i,
					"s_5046_5711": "三级"+i,
					"s_5006_5118": "四级"+i,
					"s_5006_5113": "五级"+i,
					"s_5006_5114": "六级"+i,
					"s_5006_5120": "七级"+i,
					"s_5006_5111": "八级"+i,
					"s_5006_5116": "九级"+i
			})
		}
		return tableData;
	}
}