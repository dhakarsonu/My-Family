import React, {useEffect} from 'react';
import AppContext from '../appContext';
import Popup from './popup';

const Node = (props) =>{

    const context = React.useContext(AppContext);

    const renderAddNodeView = (node) =>{
        console.log(node.id);
        if(context.addTree.indexOf(node.id) != -1){
            return (
                <Popup node={node}/>
            )
        }

        return null;
    }

    const renderActionBtn = (node) =>{
        if(context.tree[node.id]){
            return (
                <div className="action-btn-wrapper">
                    <button onClick={_=>{context.addNodeHandler(node)}}>Add</button>
                    <button onClick={_=>{context.removeNodeHandler(node)}}>Remove</button>
                    {
                        renderAddNodeView(node)
                    }
                </div>
            )
        }
        return (
            <div className="action-btn-wrapper">
                <button onClick={_=>{context.addNodeHandler(node)}}>Add</button>
                <button onClick={_=>{context.removeNodeHandler(node)}}>Remove</button>
                {
                    renderAddNodeView(node)
                }
            </div>
        )
    }

    const nodeMessage = node =>{
        return `${node.firstName} ${node.lastName} ${(!context.tree[node.id] ? ' No Child' : ' '+context.tree[node.id].length + ' Child' )}`
    }

    const renderNodes = (node) =>{
        if(context.tree[node.id]){
            return (
                <div className={node.type}>
                    <button onClick={_=>{context.expandHandler(node)}}>{context.treeStatus.indexOf(node.id) === -1 ? "+" : "-"}</button>
                    <span data-tooltip={nodeMessage(node)}>{node.firstName}</span>
                    {
                        renderActionBtn(node)
                    }
                    {
                        [
                            context.treeStatus.indexOf(node.id) != -1 ? <Node tree={context.tree[node.id]} /> : ""
                        ]
                    }
                </div>
            )
        }
        return (
            <div className={node.type}>
                <span data-tooltip={nodeMessage(node)}>{node.firstName}</span>
                {
                    renderActionBtn(node)
                }
            </div>
        )
    }

    return (
        <div>
            {
                (props.tree || []).map((node)=>{
                    return renderNodes(node);
                })
            }
        </div>
    )
}

export default Node;
