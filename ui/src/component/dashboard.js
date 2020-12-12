import '../App.css';
import AppContext from '../appContext';
import React, {useEffect} from 'react';
import Node from '../component/node';
import {post,get} from '../service/httpmodel';

const Dashboard = (props) =>{
  
  const [tree,setTree] = React.useState({});

  const [treeStatus,setTreeStatus] = React.useState([]);
  const [addTree,setAddTree] = React.useState([]);
  const [init,setInit] = React.useState(true);


  useEffect(()=>{
    if(!window.appConfig || (window.appConfig && !window.appConfig.token)){
        props.history.push('/login');
    }else{
        get({
            url:"/api/family",
            params : {}
        }).then((res)=>{
            if(res.data && res.status === 200 && Object.keys(res.data).length){
                setTree(res.data);
                setInit(false);
            }
        });
    }
  },[init]);

  const expandHandler = (node) =>{
    let nodeIndex = treeStatus.indexOf(node.id);
    if(nodeIndex !== -1){
      treeStatus.splice(nodeIndex,1);
      setTreeStatus([...treeStatus]);
      return;
    }

    setTreeStatus([...treeStatus,node.id]);
  }

  const addNodeHandler = (node) =>{
    let nodeIndex = addTree.indexOf(node.id);
    if(nodeIndex !== -1){
      addTree.splice(nodeIndex,1);
      setAddTree([...addTree]);
      return;
    }

    setAddTree([...addTree,node.id]);
  }

  const removeNodeHandler = (node) =>{
    post({
        payload : {
        memberId : node.id
        },
        url:"/api/family/member/remove"
    }).then((res)=>{
        if(res.data && res.status === 200){
            setTree(res.data);
        }
    });
  }

  function createNewNode(node){
    post({payload:node,url:"/api/family/member/add"}).then((res)=>{
        if(res.data && res.status === 200){
            setTree(res.data);
        }
    });
    let nodeIndex = addTree.indexOf(node.parentId);
    if(nodeIndex !== -1){
      addTree.splice(nodeIndex,1);
      setAddTree([...addTree]);
      return;
    }
  }

  return (
    <div className="App">
      <AppContext.Provider value={{
        expandHandler,
        addNodeHandler,
        removeNodeHandler,
        treeStatus,
        addTree,
        createNewNode,
        tree
      }}>
        <Node tree={tree["root"]||tree['first']}/>
      </AppContext.Provider>
    </div>
  );
}

export default Dashboard;
