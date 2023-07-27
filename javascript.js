//localy stored ids
const eids = JSON.parse(localStorage.getItem('eids')) || [];


function validfun(){
    document.getElementById("id_error").innerHTML ="";
    document.getElementById("name_error").innerHTML ="";
    document.getElementById("age_error").innerHTML ="";
    document.getElementById("desg_error").innerHTML ="";
    document.getElementById("url_error").innerHTML ="";
    document.getElementById("gender_error").innerHTML ="";
    var flg=0;
    const alphaR = /^[A-Za-z\s]+$/;
    const numrex= /^\d+$/;
    var eid=document.getElementById("eid").value;
    var name=document.getElementById("ename").value;
    var age=document.getElementById("eage").value;
    var desg=document.getElementById("edesg").value;
    var url=document.getElementById("eurl").value;
    var gender=document.getElementById("Egender").value;
    
    if (!eid){
        document.getElementById("id_error").innerHTML ="Please enter Id ";
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

    if (!url){
        document.getElementById("url_error").innerHTML ="Please enter URL";
        flg=1;
    }
 
    if (!gender){
        document.getElementById("gender_error").innerHTML ="Please select gender";
        flg=1;
    } 
    return flg;
}


// function to add new record
function add(){
    var flg=validfun();
    var eid=document.getElementById("eid").value;

    //checking if id is unique
    if(eids.some(item => item.id === eid)){
        document.getElementById("id_error").innerHTML ="This Id is already stored ";
        flg=1;
    }

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
        const eids = JSON.parse(localStorage.getItem('eids')) || [];      
        eids.push(e_id);      
        localStorage.setItem('eids',JSON.stringify(eids));
        const localdata = JSON.parse(localStorage.getItem('localdata')) || [];
        localdata.push(edata);
        localStorage.setItem('localdata',JSON.stringify(localdata));
       window.location.href = "empdata.html";
    }
}

//function to display data in local storage in tabular form
function displayTable() {
    const localdata = JSON.parse(localStorage.getItem('localdata')) || [];
    const tableBody = document.getElementById('tableBody');

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
    var id=event.target.id;
    localStorage.setItem('id',JSON.stringify(id));
    document.getElementById("editpop").style.display="block";
    const localdata=JSON.parse(localStorage.getItem('localdata'));
    const dataindex = localdata.findIndex(item => item.id === id);
document.getElementById("eid").value=id;
document.getElementById("ename").value=localdata[dataindex].name;
document.getElementById("eage").value=localdata[dataindex].age;
document.getElementById("edesg").value=localdata[dataindex].desg;
document.getElementById("eurl").value=localdata[dataindex].url;
document.getElementById("Egender").value=localdata[dataindex].gender;
}

//funtion to check validation and save the edited data in local storage 
function editfun(){
    var flg=validfun();
    const previousid = JSON.parse(localStorage.getItem('id'));
    const eids = JSON.parse(localStorage.getItem('eids')) || [];
    if(eids.some(item => item.id === eid && item.id !== previousid)){
        document.getElementById("id_error").innerHTML ="This Id is already stored ";
        flg=1;
    }
    if(flg==0){    
        const eids = JSON.parse(localStorage.getItem('eids')) || []; 
        const idindex = eids.findIndex(item => item.id === previousid); 
        var eid=document.getElementById("eid").value;
        var name=document.getElementById("ename").value;
        var age=document.getElementById("eage").value;
        var desg=document.getElementById("edesg").value;
        var url=document.getElementById("eurl").value;
        var gender=document.getElementById("Egender").value;
        eids[idindex].id=eid;      
        localStorage.setItem('eids',JSON.stringify(eids));
        const localdata = JSON.parse(localStorage.getItem('localdata')) || [];
        const dataindex = localdata.findIndex(item => item.id === previousid);
            localdata[dataindex].id=eid;
            localdata[dataindex].name= name;
            localdata[dataindex].age=age;
            localdata[dataindex].desg= desg;
            localdata[dataindex].url=url;
            localdata[dataindex].gender=gender;
        localStorage.setItem('localdata',JSON.stringify(localdata));
        document.getElementById("editpop").style.display="none";
        location.reload();
    }

}

function deletebutton(){
    if (confirm('delete the record?')) {
        var id=event.target.id;
        const localdata = JSON.parse(localStorage.getItem('localdata')) || [];
        const dataindex = localdata.findIndex(item => item.id === id);
        localdata.splice(dataindex,1);
        localStorage.setItem('localdata',JSON.stringify(localdata));
        location.reload();
      } else {
      }
}




function viewbutton(){
    var id=event.target.id;
    const localdata = JSON.parse(localStorage.getItem('localdata')) || [];
    const dataindex = localdata.findIndex(item => item.id === id);
    url=localdata[dataindex].url;

    document.getElementById("viewpop").style.display="block";
    document.getElementById("image").innerHTML=' ';
    const img = document.createElement("img");
    img.style.height="100px";
    img.style.width="100px";
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
function backToAdd(){
    window.location.href="add.html";
}

