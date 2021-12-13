var s = null;

var inpTitre = document.getElementById("titre"),inpAuteur = document.getElementById("auteur"),inpPrix = document.getElementById("prix"),inpDate = document.getElementById("date"),inpLangue = document.getElementById('identifiantDeMonSelect').options[document.getElementById('identifiantDeMonSelect').selectedIndex]


function readFormData()
{
    var array = {};
    array["Titre"] = inpTitre.value;
    array["Auteur"] = inpAuteur.value;
    array["Prix"] = inpPrix.value;
    array["Date"] = inpDate.value;
    array["Langue"] =inpLangue.value;
    const rbs = document.querySelectorAll('input[name="choice"]');
    let radio;
    for (const rb of rbs) 
    {
        if (rb.checked) {
            radio = rb.value;
            break;
        }
    }
    array["Type"] = radio;
    return array;
} 
function insertNewRecord(data){
    
    var tab = document.querySelector('table>tbody');
    var newRow = tab.insertRow(tab.length);
     cell1 = newRow.insertCell(0);  cell1.innerHTML =data.Titre  ;
     cell2 = newRow.insertCell(1);  cell2.innerHTML =data.Auteur;
     cell3 = newRow.insertCell(2);  cell3.innerHTML = data.Prix;
     cell4 = newRow.insertCell(3);  cell4.innerHTML = data.Date;
     cell5 = newRow.insertCell(4);  cell5.innerHTML = data.Langue;
     cell6 = newRow.insertCell(5);  cell6.innerHTML = data.Type;
     cell7 = newRow.insertCell(6);
    cell7.innerHTML = `<button type="button" id="edit" class="button green" onClick="onEdit(this);" >Editar</button>
     <button type="button" class="button red" onClick="onDelete(this);" >Excluir</button>`
}

/*Vider */
function resetForm(){
   inpTitre.value="";
   inpAuteur.value="";
   inpPrix.value="";
}


/*OnEdit pour rechargé les informations dans le formulaire*/ 
function onEdit(td)
{
    s = td.parentElement.parentElement;
    inpTitre.value = s.cells[0].innerHTML;
    inpAuteur.value = s.cells[1].innerHTML;
    inpPrix.value = s.cells[2].innerHTML;
    inpDate.value = s.cells[3].innerHTML;
    document.getElementById("sauvegarder").innerHTML = "Modifier";
    openModal();
}
function update(formData){
    s.cells[0].innerHTML = formData.Titre;
    s.cells[1].innerHTML = formData.Auteur;
    s.cells[2].innerHTML = formData.Prix;
    s.cells[3].innerHTML = formData.Date;
}
/*--------------------------------------*/


function onFormSubmit()
{

    if(validate()){
    var formData = readFormData();
    if(document.getElementById("sauvegarder").innerHTML == "Sauvegarder"){
        insertNewRecord(formData);
       
    }
    if(document.getElementById("sauvegarder").innerHTML == "Modifier"){
    update(formData);
    document.getElementById("sauvegarder").innerHTML = "Sauvegarder";
    }
    resetForm();
    closeModal();
}
}


/*Supprimer ligne de tableau*/
function onDelete(td){
    if(confirm('Delete??')){
    row  = td.parentElement.parentElement;
    document.getElementById("table").deleteRow(row.rowIndex);
    resetForm();
    }
}
/*Validation */ 
var span = document.getElementsByTagName('span');
function validate(){
    isValid=true;
    if(isNaN(inpPrix.value))
    {
        span[2].innerText="Just Numbers";
        span[2].style.color = 'red';
        isValid = false;
    }
    
var decimal=  /^[0-9]+\.[0-9]+$/; 
if(inpPrix.value.match(decimal)) 
{ isValid=true;
return true;
}
else
{
span[2].innerText="Wrong...!";
        span[2].style.color = 'red';
isValid=false;
}

   required();
    textLength();
}
function required(){
    isValid=true;
    if(inpTitre.value=="")
    {
        span[0].innerText="Required";
        span[0].style.color = 'red';
        isValid = false;
    }
    if(inpAuteur.value==""){
        span[1].innerText="Required";
        span[1].style.color = 'red';
        isValid = false;
    }

    if(inpPrix.value==""){
        span[2].innerText="Required";
        span[2].style.color = 'red';
        isValid = false;
    }
}
function textLength(){
    if(inpTitre.value!=""){
    if(inpTitre.value.length <3){
        span[0].innerText="Greater than 3 char";
        span[0].style.color = 'red';
        isValid = false;
    } 
    if(inpTitre.value.length >30 ){
        span[0].innerText="Less than 30 char";
        span[0].style.color = 'red';
        isValid = false;
    }
}
    if(inpAuteur.value!="")
    {
        if(inpAuteur.value.length<3){
            span[1].innerText="Greater than 3 char";
            span[1].style.color = 'red';
            isValid = false;
        }
        if(inpAuteur.value.length>30){
            span[1].innerText="Less than 30 char";
            span[1].style.color = 'red';
            isValid = false;
        }
    }
    
}

const openModal = () => {document.getElementById('modal').classList.add('active')}

const closeModal = () => {
    document.getElementById('modal').classList.remove('active');
    resetForm();
}
document.getElementById('cadastrarCliente').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('annuler').addEventListener('click', closeModal);
