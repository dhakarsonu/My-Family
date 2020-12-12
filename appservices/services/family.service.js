
const uuidv4  = require('../common/uuid');

const families = [];
let members = [];

module.exports = {
    getFamily,
    addFamilyMember,
    removeFamilyMember,
    createFamily,
    getOnlyFamily
};

async function getOnlyFamily({id}) {
    const family = families.find(u => u.uid === id);
    if (family) {
        return family;
    }
    return null;
}

async function getFamily({id}) {
    const family = families.find(u => u.uid === id);
    if (family) {
        if(members.length){
            const filterMembers = [];
            members.map((u)=>{
                if(u.familyId === family.id)
                    filterMembers.push(u);
            })
            if(filterMembers.length){
                return constructTree(filterMembers);
            }
            return {};
        }else{
            return {};
        }
    }
    return null;
}

async function addFamilyMember(member,{id,family}) {
    try{
        member['id'] = uuidv4();
        member['familyId'] = family.id;
        member['type'] = "child";
        const familyObj = families.find(u=>u.id === family.id);
        const mem = members.find(u=>u.id === member.parentId);
        console.log(mem);
        if(mem){
            mem["type"] = "parent";
        }
        if(familyObj){
            members.push(member);
            return await getFamily({id});
        }
    }catch(e){
        console.log("Error while adding member in family");
    }
}

async function removeFamilyMember({memberId},{id,family}) {
    try{
        
        const member = members.find(u => u.familyId === family.id && u.id === memberId);
        if(member){
            members = removeByAttr(members,'id',member.id);
            members.map((mem)=>{
                if(mem.parentId === member.id){
                    members = removeByAttr(members,'id',mem.id);
                }
            });
        }
        console.log(members);
        return await getFamily({id});    
            
    }catch(e){
        console.log("Error while creating user");
    }
    
}

async function createFamily(id) {
    try{
        families.push({id:uuidv4(),uid : id,name:"Family"});
        let family = families.find(u=>u.uid === id);
        addDefaultMember({
            "firstName" : "My Family",
            "lastName" : "",
            "id" : uuidv4(),
            "parentId" : "root",
            "familyId" : family.id,
            "type" : "parent"
        });
        return family;
    }catch(e){
        console.log("Error while creating user");
    }
    
}

function addDefaultMember(member){
    members.push(member);
}

function removeByAttr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
           arr.splice(i,1);
       }
    }
    return arr;
}

function constructTree(filterMembers){
    try{
        let familyTree = {};
        filterMembers.map((member)=>{
            if(familyTree[member.parentId]){
                if(familyTree[member.parentId]){
                    familyTree[member.parentId].push(member);
                }else{
                    familyTree[member.parentId]  = member;
                }
            }else{
                familyTree[member.parentId] = [member];
            }
        });

        return familyTree;
    }catch(e){
        console.log("Error while constructing tree");
    }
}