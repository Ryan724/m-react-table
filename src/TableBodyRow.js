import React, {Component, PropTypes } from 'react';
import TableRowCell from './TableBodyRowCell.js';

export default class TableBodyRow extends Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.rowData !== nextProps.rowData)
	}
	render() {
		let {rowData ,tableStyle , queueCell } = this.props;
		let rowVDOMArr = [];
		queueCell.forEach((cell,index)=>{
			let style ={ 
				    textAlign : tableStyle.align,
					width : cell.type==="subcol"?cell.width:cell.width, 
					height : tableStyle.rowHeight,
					lineHeight : tableStyle.rowHeight+"px",
					overflow:this.props.device.ios?"scroll":"hidden"
				};
			let cellNode =<TableRowCell 
									text  = {rowData[cell.name]}
									cell  = {cell}
									rowId = {rowData.rowId+"++"+cell.name}
									style = {style} 
									handRowClick = {this.props.handRowClick}/>

			rowVDOMArr.push(cellNode);
		})
		return<div style={{height : tableStyle.rowHeight}}>{rowVDOMArr}</div>;
			
	}
}