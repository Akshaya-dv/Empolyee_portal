//localy stored ids
var eids =[];
var localdata=[];
var id=0;

function validfun(){
    document.getElementById("id_error").innerHTML ="";
    document.getElementById("name_error").innerHTML ="";
    document.getElementById("age_error").innerHTML ="";
    document.getElementById("desg_error").innerHTML ="";
    document.getElementById("url_error").innerHTML ="";
    document.getElementById("gender_error").innerHTML ="";
    var flg=0;
    const alphaR = /^[A-Za-z\s]+$/;
    const numrex= /^[1-9]\d*$/;
    const urlrex=/(https?:\/\/.*\.(?:png|jpg))/i;
    var eid=document.getElementById("eid").value;
    var name=document.getElementById("ename").value;
    var age=document.getElementById("eage").value;
    var desg=document.getElementById("edesg").value;
    var url=document.getElementById("eurl").value;
    var gender=document.getElementById("Egender").value;
    
    if (!eid|!numrex.test(age)){
        document.getElementById("id_error").innerHTML ="Please enter Id in integer";
        flg=1;
    }
    else if(eids.some(item => item.id === eid)){
        document.getElementById("id_error").innerHTML ="This Id is already stored ";
        flg=1;
    }
    if (!name){
        document.getElementById("name_error").innerHTML ="Please enter Name";
        flg=1;
    }
    else if(!alphaR.test(name)){
        document.getElementById("name_error").innerHTML ="Please enter Name in Alpabets";
        flg=1;
    }

    if (!age|| !numrex.test(age)){
        document.getElementById("age_error").innerHTML ="Please enter Age in integer";
        flg=1;
    }
    else if ((age<18)||(age>60)){
        document.getElementById("age_error").innerHTML ="Age is out of range";
        flg=1;
     }

    if (!desg){
        document.getElementById("desg_error").innerHTML ="please select a desgnation";
        flg=1;
    }

    if (!url|!urlrex.test(url)){
        document.getElementById("url_error").innerHTML ="Please enter URL";
        flg=1;
    }
 
    if (!gender){
        document.getElementById("gender_error").innerHTML ="Please select gender";
        flg=1;
    } 
    return flg;
}
function editvalidfun(preid){
    document.getElementById("Eid_error").innerHTML ="";
    document.getElementById("Ename_error").innerHTML ="";
    document.getElementById("Eage_error").innerHTML ="";
    document.getElementById("Edesg_error").innerHTML ="";
    document.getElementById("Eurl_error").innerHTML ="";
    document.getElementById("Egender_error").innerHTML ="";
    var flg=0;
    const alphaR = /^[A-Za-z\s]+$/;
    const numrex= /^[1-9]\d*$/;
    const urlrex=/(https?:\/\/.*\.(?:png|jpg))/i;
    var eid=document.getElementById("Eeid").value;
    var name=document.getElementById("Eename").value;
    var age=document.getElementById("Eeage").value;
    var desg=document.getElementById("Eedesg").value;
    var url=document.getElementById("Eeurl").value;
    var gender=document.getElementById("EEgender").value;
    
    if (!eid){
        document.getElementById("Eid_error").innerHTML ="Please enter Id ";
        flg=1;
    }
    else if(eids.some(item => item.id == eid && item.id !== preid)){
        document.getElementById("Eid_error").innerHTML ="This Id is already stored ";
        flg=1;
    }
    if (!name){
        document.getElementById("Ename_error").innerHTML ="Please enter Name";
        flg=1;
    }
    else if(!alphaR.test(name)){
        document.getElementById("Ename_error").innerHTML ="Please enter Name in Alpabets";
        flg=1;
    }

    if (!age|| !numrex.test(age)){
        document.getElementById("Eage_error").innerHTML ="Please enter Age in integer";
        flg=1;
    }
    else if ((age<18)||(age>60)){
        document.getElementById("Eage_error").innerHTML ="Age is out of range";
        flg=1;
     }

    if (!desg){
        document.getElementById("Edesg_error").innerHTML ="please select a desgnation";
        flg=1;
    }

    if (!url|!urlrex.test(url)){
        document.getElementById("Eurl_error").innerHTML ="Please enter URL";
        flg=1;
    }
 
    if (!gender){
        document.getElementById("Egender_error").innerHTML ="Please select gender";
        flg=1;
    } 
    return flg;
}

// function to add new record
function add(){
    var flg=validfun();
    var eid=document.getElementById("eid").value;

    //checking if id is unique
    var name=document.getElementById("ename").value;
    var age=document.getElementById("eage").value;
    var desg=document.getElementById("edesg").value;
    var url=document.getElementById("eurl").value;
    var gender=document.getElementById("Egender").value;

    //adding data to the local storage if every user enteries are valid 
    if(flg==0){
        const edata = {
            id:eid,
            name: name,
            age:age,
            desg: desg,
            url:url,
            gender:gender
        };    
        const e_id={id:eid};     
        eids.push(e_id);      
        localdata.push(edata);
        displayTable();

    document.getElementById("eid").innerHTML=" ";
    document.getElementById("ename").innerHTML=" ";
    document.getElementById("eage").innerHTML=" ";
    document.getElementById("eurl").innerHTML=" ";

    }
}

//function to display data in local storage in tabular form
function displayTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML='';
    localdata.forEach(item => {
        const newRow = tableBody.insertRow();

        // Create and append table cells to the new row using insertCell() method
        const EID = newRow.insertCell();
        const Name = newRow.insertCell();
        const Age = newRow.insertCell();
        const Designation = newRow.insertCell();
        const Gender = newRow.insertCell();
        const Actions=newRow.insertCell()

        // Set the cell content to the new data
        EID.textContent = item.id;
        Name.textContent = item.name;
        Age.textContent = item.age;
        Designation.textContent = item.desg;
        Gender.textContent = item.gender;
        Actions.innerHTML=`<button class="edit" id="${item.id}" onclick="editbutton(event)">Edit</button>
                <button class="delete" id="${item.id}"  onclick="deletebutton(event)">Delete</button>
                <button class="view"  id="${item.id}"  onclick="viewbutton(event)">View</button>`

    })
}



function editbutton(){
    id=event.target.id;
    document.getElementById("editpop").style.display="block";

    const dataindex = localdata.findIndex(item => item.id === id);
document.getElementById("Eeid").value=id;
document.getElementById("original-id").value=id;
document.getElementById("original-id").style.display='none';
document.getElementById("Eename").value=localdata[dataindex].name;
document.getElementById("Eeage").value=localdata[dataindex].age;
document.getElementById("Eedesg").value=localdata[dataindex].desg;
document.getElementById("Eeurl").value=localdata[dataindex].url;
document.getElementById("EEgender").value=localdata[dataindex].gender;

}

//funtion to check validation and save the edited data in local storage 
function editfun(){
    const id=document.getElementById("original-id").value;
    var flg=editvalidfun(id);
    var eid=document.getElementById("Eeid").value;
   
    
    if(flg==0){    
        const idindex = eids.findIndex(item => item.id === id); 
        var eid=document.getElementById("Eeid").value;
        var name=document.getElementById("Eename").value;
        var age=document.getElementById("Eeage").value;
        var desg=document.getElementById("Eedesg").value;
        var url=document.getElementById("Eeurl").value;
        var gender=document.getElementById("EEgender").value;
        eids[idindex].id=eid;      
        const dataindex = localdata.findIndex(item => item.id === id);
            localdata[dataindex].id=eid;
            localdata[dataindex].name= name;
            localdata[dataindex].age=age;
            localdata[dataindex].desg= desg;
            localdata[dataindex].url=url;
            localdata[dataindex].gender=gender;
            document.getElementById("editpop").style.display="none";
        displayTable();
    }

}

function deletebutton(){
    if (confirm('delete the record?')) {
        var id=event.target.id;
        const dataindex = localdata.findIndex(item => item.id === id);
        localdata.splice(dataindex,1);
        displayTable();
      } 
}




function viewbutton(){
    var id=event.target.id;
    const dataindex = localdata.findIndex(item => item.id === id);
    url=localdata[dataindex].url;
    document.getElementById("viewpop").style.display="block";
    document.getElementById("image").innerHTML=' ';
    const img = document.createElement("img");
    img.style.height="260px";
    img.style.width="260px";
    img.style.borderRadius="10px";
    img.src = url; 
    document.getElementById("image").appendChild(img);
document.getElementById("Veid").innerHTML=id;
document.getElementById("Vename").innerHTML=localdata[dataindex].name;
document.getElementById("Veage").innerHTML=localdata[dataindex].age;
document.getElementById("Vedesg").innerHTML=localdata[dataindex].desg;
document.getElementById("VEgender").innerHTML=localdata[dataindex].gender;
}


function viewbackfun(){
    document.getElementById("viewpop").style.display="none"; 
}
function editbackfun(){
    document.getElementById("editpop").style.display="none"; 
}
