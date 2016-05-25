import React, {Component, PropTypes } from 'react';

export default class TableBodyRowCell extends Component {

	constructor(props) {
		super(props);
		this.state = {showToolTip:"hidden"};
	}
	render() {
		let {text,cell,rowId,style} = this.props;
		let {showToolTip} = this.state
		return (<span  style={{position:"relative"}}
						tabIndex="3"
						ref="cell"
						onTouchStart ={::this.handTouchStart}
  						onBlur ={::this.handBlur} >
					<label className = "cell" key={cell.name}  style={style}>
						{ cell.isDrill
								? (<a data-rowid={rowId} 
									  style={{color:"#19afea"}} 
									  onClick={this.props.handRowClick.bind(null,rowId)}>
									  {text}
									  </a>) 
								: (<span> {text}</span>)
						}
					</label>
					<span className="tooltip" style={{visibility:showToolTip}}>{text}</span>
				</span> );
	}
	handTouchStart=()=>{
		if(this.props.cell.isDrill) return;
		this.refs.cell.focus();
		this.setState({showToolTip:"visible"})
	}
	handBlur=()=>{
		this.setState({showToolTip:"hidden"})
	}
}