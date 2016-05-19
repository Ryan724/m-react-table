import React, {Component, PropTypes } from 'react';
import TableRow from './TableBodyRow.js';

export default class TableBody extends Component {
	constructor(props) {
	  super(props);
	  this.queueCell = this.sortCellByHeader(this.props);
	}
	componentWillUpdate(){
		this.startTime= (new Date()).valueOf();
	}
	componentDidUpdate(){
		// console.log((new Date()).valueOf()-this.startTime)
	}
	componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
        	this.queueCell = this.sortCellByHeader(nextProps);
        }
    }
	sortCellByHeader(props){
		let {header} = props.tableData;
		let queueCell = [];
		for(let key in header){
			if(header[key].type === "parentcol"){
			 	for(let subkey in header[key].subColumns){
			 		let subCell = header[key].subColumns[subkey]
			 		queueCell.push(subCell)
			 	}
			}else{
				queueCell.push(header[key])
			}
		}
		return queueCell;
	}
	render(){
		let {totalWidth,tableData,tableStyle } = this.props;

		let style = {
			/*表格实际宽度*/
			width: totalWidth,
			paddingTop: tableStyle.headerHeight+"px",
			marginTop:"-1px"
		}
		let height = tableData["body"].length*tableStyle["rowHeight"]
		return (
			<div style={style}>
		      <div top={0} left={0} enableCSSLayout={true} width={totalWidth} height={height}>
					<div  style={{width:totalWidth,height:height}} className="table-body">
        				{this.bulidTableBody()}
	          		</div>
		      </div>
		    </div>
			)
	}
	bulidTableBody(){
		//循环body数组
		return this.props.tableData["body"].length
					?this.props.tableData["body"].map((rowData,key)=>{
						return (<TableRow
									key = {key}
									rowData ={rowData}
									handRowClick = {this.props.handRowClick}
									tableStyle={this.props.tableStyle}
									queueCell = {this.queueCell}>
								</TableRow>)
						})
					:<div style={{textAlign:"center",fontSize:16,margin:10}}>暂无记录</div>
	}

}
