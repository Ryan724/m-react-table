import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactScroller from 'r-scroller';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
require('./table.css');


export default class ReactTable extends Component {

	defaultTableConfig = { 
		/*表格可视区宽度*/
		viewportWidth: 100,
		/*表格可视区高度*/
		viewportHeight: 500,
		/*表体单元格高度*/
		rowHeight: 30,
		/*表头单元格宽度*/
		headerCellWidth:100,
		headerColumWidth:{},//根据name来制定单元格宽度
		/*表头单元格高度*/
		headerHeight: 50,
		/*复合表头子表头单元格高度*/
		groupHeaderHeight: 20,
		headerTextAlign: "center",
		align: 'center',
	}

	constructor(props, context) {
		super(props, context);
		this.state = this.initTable(this.props);

	}

	initTable(props){
		this.tableStyle = Object.assign({},this.defaultTableConfig, props.tableStyle);
		return this.bulidHeader(props);
	}
	
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
        	var newState = this.initTable(nextProps)
        	this.setState(newState);
        }
    }


	componentDidUpdate() {
		this.refs.reactScroller.reflow();
	}

	render() {
		let { tableData ,totalWidth ,tableStyle} = this.state;
		let handRowClick = this.props.handRowClick||(new Function());
		let scrollerStyle = {
								width:totalWidth,
								height:tableData["body"].length*tableStyle["rowHeight"]
							}
		let fetachConfig = {
    					dragLength:-40,
    					startCallback :this.props.fetchFun
    				}
		return (
			<div className="table-container" style={{width:tableStyle.viewportWidth,height:tableStyle.viewportHeight}}>
	    		<ReactScroller ref = "reactScroller"fetachConfig={ fetachConfig }  style = { scrollerStyle }>
	    			<TableHeader ref="tableHeader" 
	    				scrollable="x" zIndex={3} tableData ={tableData} tableStyle = {tableStyle} totalWidth = {totalWidth}/>
		    		<TableBody 	
		    				ref="tableBody" 
		    				scrollable="xy"  
		    				zIndex={1} 
		    				tableData ={tableData} 
		    				tableStyle = {tableStyle} 
		    				totalWidth = {totalWidth}
		    				handRowClick = {handRowClick}/>
		    	</ReactScroller>
	     	</div>
		);
	}
	bulidHeader(props){
		let header = {};
		let totalWidth = 0;
		let cellCount =0;
		props.tableData.header.columns.map(colum=>{
			if(colum.subColumns instanceof Array){
				if(colum.subColumns.length==0){
					let width = this.tableStyle.headerColumWidth[colum["name"]] || this.tableStyle.headerCellWidth;
					colum.subColumns = [];
					colum.width = width;
					colum.type ="singlecol";
					cellCount++;
				}else{
					let subColumnHeader = {};
					let subColumnWidth = 0;
					colum.subColumns.forEach(subColumn=>{
						let width = this.tableStyle.headerColumWidth[subColumn["name"]] || this.tableStyle.headerCellWidth;
						subColumn.subColumns = [];
						subColumn.width = width;
						subColumn.height = this.tableStyle.groupHeaderHeight;
						subColumn.type ="subcol";
						subColumnHeader[subColumn["name"]] = subColumn;
						subColumnWidth += width;
						cellCount++;
					})
					colum.subColumns = subColumnHeader;
					colum.width = subColumnWidth;
					colum.type ="parentcol";
				}
				totalWidth += colum.width;
			}else{
				totalWidth = this.state?this.state.totalWidth:0;
			}
			colum.height = this.tableStyle.headerHeight;
			header[colum["name"]] = colum;
		})
		//当实际表格宽度小于视口宽度100px的时候,均分视口宽度
		if(this.tableStyle.viewportWidth-totalWidth>100&&cellCount>0){
			let cellWidth = (this.tableStyle.viewportWidth-2)/cellCount;
			totalWidth =0 
			props.tableData.header.columns.map(colum=>{
				if(colum.subColumns.length==0){
					colum.width = cellWidth;
				}else{
					let subColumnWidth = 0;
					colum.subColumns.forEach(subColumn=>{
						subColumn.width=cellWidth;
						subColumnWidth+=cellWidth;
					});	
					colum.width = subColumnWidth;		
				}
				totalWidth += colum.width;
			});
		}
		let tableData = {body: props.tableData.body, header:header }
		return {
			tableData:tableData,
			totalWidth:totalWidth,
			tableStyle:this.tableStyle
		};
	}
};