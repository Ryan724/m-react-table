import React, {Component, PropTypes } from 'react';

export default class TableBody extends Component {

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (this.props.rowData !== nextProps.rowData)
	}
	render() {
		let {rowData ,tableStyle , queueCell } = this.props;
		let rowVDOMArr = [];
		queueCell.forEach((cell)=>{
			let style ={ 
				    textAlign : tableStyle.align,
					width : cell.type==="subcol"?cell.width:cell.width, 
					height : tableStyle.rowHeight,
					lineHeight : tableStyle.rowHeight+"px"
				};
			let cellNode = (<div className = "cell" key={cell.name}  style={style}>
					{this.cellRenderByType(rowData[cell.name] ,cell.isDrill,rowData.rowId)}
				</div>)
			rowVDOMArr.push(cellNode);
		})
		return <div style={{height : tableStyle.rowHeight,overflow: "hidden"}}>{rowVDOMArr}</div>;
			
	}

	cellRenderByType(text, isDrill,rowId) {
		return isDrill
				? (<a data-rowid={rowId} style={{color:"#19afea"}} onClick={this.props.handRowClick.bind(null,rowId)}>{text}</a>) 
				: (<span>{text}</span>);
	}
}