/**
 * ZHENGPENGJIE 16/2/22
 */
import React, {Component, PropTypes } from 'react';

export default class TableHeaderWrapper extends Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		let style = {position: "absolute",zIndex: 1,marginTop:1,width:this.props.totalWidth,borderLeft:"1px solid #adb6bf"};
		return (	
			<div  className="table-wrapper" style={style}>
				 <TableHeader
     		        groupHeaderHeight = {this.props.tableStyle["groupHeaderHeight"]}
     		        tableData = {this.props.tableData} 
     		        width = {this.props.totalWidth+1}
     		        height = {this.props.tableStyle["headerHeight"]}
     		        align = {this.props.tableStyle["headerTextAlign"]}
     		        headerData = {this.props.tableData["header"]}>
 	  	      	</TableHeader>
		    </div>
		)

	}

}
class TableHeader extends Component{

	constructor(props, context) {
		super(props, context);
	}
	render(){
		return (
			<ul className="table-header-ul">
					{this.renderHeaderColumn(this.props.headerData)}			
			</ul>
		)
	}

	renderHeaderColumn(headerData){
		let cellArray=[];
		let objLength= Object.getOwnPropertyNames(headerData).length;
		let i=0;
		for(let key in headerData){
			let cell = headerData[key];
			let className = cell.type !=="subcol" ?"headerCell":"subHeaderCell";
			let style = {"textAlign"  :  this.props.align,
			             "width"      :  cell.width,
						 "height"     :  cell.height,
						 "lineHeight" :  cell.type !=="parentcol"? (cell.height+"px") : 0}
			if(i==objLength-1 && cell["type"]=="subcol"){style["width"]=cell.width-1}
	    	let bar = (
      			    <li key={cell.name} className={className} style={style}>
		            	{(cell.type !== "parentcol")
	            			?(<div>
					          	 	<span>{cell.title}</span>
			           			</div>)
		            		:(<div>
					            	<span style ={{"lineHeight":this.props.height-this.props.groupHeaderHeight+"px"}}>{cell.title}</span>
			            			<ul className="table-header-ul" >
					           			{this.renderHeaderColumn(cell.subColumns)}
					           		</ul>
			           		  </div>)
		            	}
			 		</li>
				);
				cellArray.push(bar);
		 		i++;
		 };
		return cellArray;
	}
}
