import React from 'react';
import AppContext from '../appContext';

const Popup = (props) =>{

    const context = React.useContext(AppContext);
    const [firstName,setFirstName] = React.useState("");
    const [lastName,setLastName] = React.useState("");

    const createNode = () =>{
        if(!firstName.trim().length || !lastName.trim().length ){
            return;
        }
        var node = {
            firstName,
            lastName,
            parentId : props.node.id,
        };

        context.createNewNode(node);
    }

    return (
        <div className="popup-wrapper">
           <input placeholder="First Name" value={firstName} onChange={_ => { setFirstName(_.target.value)}} onKeyPress={_=>{
               if(_.code === "Enter"){
                   createNode();
               }
           }}></input>
           <input placeholder="Last Name" value={lastName} onChange={_ => { setLastName(_.target.value)}}onKeyPress={_=>{
               if(_.code === "Enter"){
                   createNode();
               }
           }}></input>
           <button onClick={createNode}>Create</button>
        </div>
    )
}

export default Popup;
