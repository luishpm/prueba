function $() {
    var elements = new Array();

    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element == 'string')
            element = document.getElementById(element);

        if (arguments.length == 1)
            return element;

        elements.push(element);
    }

    return elements;
}

function showDiv(objectId){
	var o = $(objectId);
	o.style.visibility = "visible";
	o.style.display = "block";
}

function hideDiv(objectId){
	var o = $(objectId);
	o.style.visibility = "hidden";
	o.style.display = "none";
}

/***********************************************
* Textarea Maxlength script- © Dynamic Drive (www.dynamicdrive.com)
* This notice must stay intact for legal use.
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/

function ismaxlength(obj){
    var mlength=obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : "";
    if (obj.getAttribute && obj.value.length>mlength);
    obj.value=obj.value.substring(0,mlength);
}


function isGivenMaxlength(mlength,obj){
    if ( obj.value.length>mlength)
    obj.value=obj.value.substring(0,mlength);
}

/**
 * Funci?n para eliminar los espacios en blanco que se encuentren alrededor de un texto
 * @param s Variable tipo text a la cual se le quitar?n los espacios en blanco que se encuentran alrededor de ella.
 * @return texto sin espacios en blanco que lo rodeen.
 */
function trim(s) {
	while (s.substring(0,1) == ' ') {
		s = s.substring(1,s.length);
	}
	while (s.substring(s.length-1,s.length) == ' ') {
		s = s.substring(0,s.length-1);
	}
	return s;
}

function trimEvenNull(s){
		s2=trim(s);
		if(s2=='null'){
			return '';
		}
		return s2;
}

var TYPE_ELEMENT = "TYPE";
var MESSAGE_ELEMENT = "MESSAGE";
var TYPE_NONE = "NONE";
var TYPE_ERROR = "ERROR";

/**
 * Itera el arreglo de spans y nos regresa el contenido del que le indiquemos.
 * @param newTextElements El arreglo con los spans
 * @param elementName El nombre del span, generalmente se pone como id="nombre" dentro del span
 * @return el contenido del span
 */
function getSpanContentFromArray(newTextElements, elementName){ 	
 	//Itera a trav?s de la lista de spans
 	for (var i = 0; i < newTextElements.length; i++ ){
 		//Checa que el elmento empiece con <span>
 		if(newTextElements[i].indexOf("<span") > -1){
 			//obtiene el nombre - entre la primera y segunda doble comilla
 			var startNamePos = newTextElements[i].indexOf('"') + 1;
 			var endNamePos = newTextElements[i].indexOf('"',startNamePos);
 			var name = newTextElements[i].substring(startNamePos,endNamePos);
			
			if(name == trim(elementName)){
 				var startContentPos = newTextElements[i].indexOf('>') + 1;
 				var content = newTextElements[i].substring(startContentPos);
 				
				return content;
			}
		}
	}
	return "";
}


/**
 * Separa el texto en elementos <span>
 * @param Texto a ser parseado
 * @return arreglo de elementos <span> - este arreglo puede contener nulos
 */
function splitTextIntoSpan(textToSplit){
	//Separa el documento
 	var returnElements = textToSplit.split("</span>");
 	//Procesa cada uno de los elementos
 	for (var i = returnElements.length - 1; i >= 0; --i ){ 		
 		 //Se remueve todo antes del primer span
 		var spanPos = returnElements[i].indexOf("<span");
 		
 		//Si se encuentra un match, se toma todo antes del span
 		if(spanPos > 0){
 			var subString= returnElements[i].substring(spanPos);
 			returnElements[i] = subString;
 		} 
 	} 	
 	return returnElements;
}

/*
 * Obtener el tipo del mensaje, si es ERROR, INFO, etc.
 * @param Texto a ser parseado
 * @return regresa el tipo de mensaje
 */
function getMessageType(textToSplit){
	var spanArray = splitTextIntoSpan(textToSplit);

	return getSpanContentFromArray(spanArray, TYPE_ELEMENT);
}
 
/*
 * Actualiza un objeto con el contenido del SPAN de MESSAGE ELEMENT en dado caso que el tipo sea diferente de NONE
 * @param newTextElements El arreglo con los spans
 * @param htmlObject El objeto en donde se va a poner el contenido del SPAN (innerHTML).
 */
function replaceObjectWithHtml(newTextElements, htmlObject){
 
 	var typeContent = getSpanContentFromArray(newTextElements, TYPE_ELEMENT);
 	if(trim(typeContent) != TYPE_NONE){
 		var content = getSpanContentFromArray(newTextElements, MESSAGE_ELEMENT);
 		$(htmlObject).innerHTML = content;
 	}	
}


/***********************************************
* Funciones para validar campos numericos
***********************************************/

function floatNumbers(e) {
    e = (e) ? e : event;
    var  intCode =  (e.intCode) ? e.intCode :
    ((e.keyCode) ? e.keyCode :
    ((e.which) ? e.which : 0));
    if (intCode > 31 && (intCode < 48 || intCode > 57)) {
        if (intCode == 46){
            return true;
        }else{
            //alert("Numeros solamente!.");
            return false;
        }
    }
    return true;
}
function integersOnly(e) {
    e = (e) ? e : event;
    var  intCode =  (e.intCode) ? e.intCode :
    ((e.keyCode) ? e.keyCode :
    ((e.which) ? e.which : 0));
    if (intCode > 31 && (intCode < 48 || intCode > 57)) {
        if (intCode == 46){
            return false;
        }else{
            //alert("Numeros solamente!.");
            return false;
        }
    }
    return true;
}

function isFloatingPointNumber(str) {
    pattern =  /^((\d+(\.\d*)?)|((\d*\.)?\d+))$/;
    return pattern.test(str);
}

function isInteger(str) {
    pattern =  /^\d+$/;
    return pattern.test(str);
}



function checkEmail(emailStr) {
   if (emailStr.length == 0)
      return true;
   var emailPat=/^(.+)@(.+)$/;
   var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
   var validChars="\[^\\s" + specialChars + "\]";
   var quotedUser="(\"[^\"]*\")";
   var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
   var atom=validChars + '+';
   var word="(" + atom + "|" + quotedUser + ")";
   var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
   var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
   var matchArray=emailStr.match(emailPat);
   if (matchArray == null)
      return false;
   var user=matchArray[1];
   var domain=matchArray[2];
   if (user.match(userPat) == null)
       return false;
   var IPArray = domain.match(ipDomainPat);
   if (IPArray != null) {
       for (var i = 1; i <= 4; i++) {
          if (IPArray[i] > 255)
             return false;
       }
       return true;
   }
   var domainArray=domain.match(domainPat);
   if (domainArray == null)
       return false;
   var atomPat=new RegExp(atom,"g");
   var domArr=domain.match(atomPat);
   var len=domArr.length;
   if (domArr[domArr.length-1].length < 2 || domArr[domArr.length-1].length > 3)
      return false;
   if (len < 2)
      return false;
   return true;
}


function resetTextField( obj ){
	obj.value = "";
}

function checkAll(chkMaster, chks){
	if ( typeof chks != "undefined" ) {	
		if (typeof chks.length != 'undefined') {
			for ( var i=0; i < chks.length; i++ ) {
				if (chks[i].type == 'checkbox') {
				   chks[i].checked = chkMaster.checked;
				}
			}
		} else {
			chks.checked = chkMaster.checked;
		}
	}			
}

function hasCheckedOneCheckboxItem(chks){
	if ( typeof chks != "undefined" ) {	
		if (typeof chks.length != 'undefined') {
			for ( var i=0; i < chks.length; i++ ) {
				if (chks[i].type == 'checkbox') {
					if ( chks[i].checked ) {
						return true;
					}
				}
			}
		} else {
			if ( chks.checked ) {
				return true;
			}
		}
	}
	return false;
}