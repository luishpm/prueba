/*
	Explorer - JWM Solutions
*/
var buttonTimer = null;

function menuContextualImg(label, srcImg, funcion){
    var html = "<div onclick="+funcion+" class='menu' onmouseover=\"this.className='menuHover'\" onmouseout=\"this.className='menu'\">"+
                "    <table cellpadding='0' cellspacing='0'>"+
                "        <tr>"+
                "            <td width='26'>&nbsp;<img src='"+srcImg+"'></td>"+
                "            <td>"+label+"</td>"+
                "        </tr>"+
                "    </table>"+
                "</div>";
    return html;
}

function menuContextualNoImg(label,funcion){
    var html = "<div onclick="+funcion+" class='menu' onmouseover=\"this.className='menuHover'\" onmouseout=\"this.className='menu'\">"+
                "    <table cellpadding='0' cellspacing='0'>"+
                "        <tr>"+
                "            <td width='26'>&nbsp;</td>"+
                "            <td>"+label+"</td>"+
                "        </tr>"+
                "    </table>"+
                "</div>";
    return html;
}

function botonImg(label, srcImg, funcion){
    document.write("<div onclick="+funcion+" class='boton' onmouseover=\"this.className='botonHover'\" onmouseout=\"this.className='boton'\">");
    document.write("    <table cellpadding='0' cellspacing='0'>");
    document.write("        <tr>");
    document.write("            <td width='26'>&nbsp;<img src='"+srcImg+"'></td>");
    document.write("            <td>"+label+"</td>");
    document.write("        </tr>");
    document.write("    </table>");
    document.write("</div>");
}

function menuSeparador(){
    return "<div class='separadorMenu'></div>";
}


function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function replaceSelection (input, replaceString) {
	if (input.setSelectionRange) {
		var selectionStart = input.selectionStart;
		var selectionEnd = input.selectionEnd;
		input.value = input.value.substring(0, selectionStart)+ replaceString + input.value.substring(selectionEnd);
		if (selectionStart != selectionEnd){ 
			setSelectionRange(input, selectionStart, selectionStart + 	replaceString.length);
		}else{
			setSelectionRange(input, selectionStart + replaceString.length, selectionStart + replaceString.length);
		}
	}else if (document.selection) {
		var range = document.selection.createRange();

		if (range.parentElement() == input) {
			var isCollapsed = range.text == '';
			range.text = replaceString;

			 if (!isCollapsed)  {
				range.moveStart('character', -replaceString.length);
				range.select();
			}
		}
	}
}


function catchTab(item, e){
	c = e.which ? e.which : e.keyCode;
	if(c==9){
		replaceSelection(item,String.fromCharCode(9));
		//setTimeout("document.getElementById('"+item.id+"').focus();",0);	
		return false;
	}
		    
}


function findPosX(obj) {
    var curleft = 0;
    if (obj && obj.offsetParent) {
        while (obj.offsetParent) {
            curleft += obj.offsetLeft - obj.scrollLeft;
            obj = obj.offsetParent;
        }
    } else if (obj && obj.x) {
        curleft += obj.x;
    }
    return curleft;
}

function findPosY(obj) {
    var curtop = 0;
    if (obj && obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
        }
    } else if (obj && obj.y) {
        curtop += obj.y;
    }
    return curtop;
}

function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}

function cambiaColor(){
    $("barra").className="darksplitter";
}
function resizePanel(){
    var treePanel = document.getElementById("tdToSize");
    var barra = document.getElementById("barra");
    $("barra").className="splitterbar";
    var pos = $("barra").style.left;
    if (pos!=""){
        var treeWidth = $("tdToSize").clientWidth+parseInt(pos.replace("px"," "));
        $("tdToSize").style.width = treeWidth ;
        barra.style.left = "0px";
    }
}

function cursor_wait() {
  document.body.style.cursor = 'wait';
}

function cursor_clear() {
  document.body.style.cursor = 'default';
}

function overlaySize(){
	if (window.innerHeight && window.scrollMaxY || window.innerWidth && window.scrollMaxX) {	
		yScroll = window.innerHeight + window.scrollMaxY;
		xScroll = window.innerWidth + window.scrollMaxX;
		var deff = document.documentElement;
		var wff = (deff&&deff.clientWidth) || document.body.clientWidth || window.innerWidth || self.innerWidth;
		var hff = (deff&&deff.clientHeight) || document.body.clientHeight || window.innerHeight || self.innerHeight;
		xScroll -= (window.innerWidth - wff);
		yScroll -= (window.innerHeight - hff);
	} else if (document.body.scrollHeight > document.body.offsetHeight || document.body.scrollWidth > document.body.offsetWidth){ // all but Explorer Mac
		yScroll = document.body.scrollHeight;
		xScroll = document.body.scrollWidth;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		yScroll = document.body.offsetHeight;
		xScroll = document.body.offsetWidth;
  	}
	$("_overlay").style.height = yScroll +"px";
    $("_overlay").style.width = xScroll +"px";
    $("_overlay").style.display = "block";
	$("_hideSelect").style.height = yScroll +"px";
    $("_hideSelect").style.width = xScroll +"px";
    $("_hideSelect").style.display = "block";
    
}

function load_position() {
	var pagesize = getPageSize();
	var arrayPageScroll = getPageScrollTop();
	$("_load").style.left = (arrayPageScroll[0] + (pagesize[0] - 100)/2)+"px";
    $("_load").style.top = (arrayPageScroll[1] + ((pagesize[1]-100)/2))+"px";
	$("_load").style.display = "block";
}

function getPageScrollTop(){
	var yScrolltop;
	var xScrollleft;
	if (self.pageYOffset || self.pageXOffset) {
		yScrolltop = self.pageYOffset;
		xScrollleft = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop || document.documentElement.scrollLeft ){	 // Explorer 6 Strict
		yScrolltop = document.documentElement.scrollTop;
		xScrollleft = document.documentElement.scrollLeft;
	} else if (document.body) {// all other Explorers
		yScrolltop = document.body.scrollTop;
		xScrollleft = document.body.scrollLeft;
	}
	arrayPageScroll = new Array(xScrollleft,yScrolltop) 
	return arrayPageScroll;
}

function getPageSize(){
	var de = document.documentElement;
	var w = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
	var h = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight
	arrayPageSize = new Array(w,h) 
	return arrayPageSize;
}

function showLoading(show){
    if (show){
        overlaySize();
        load_position()
    }else{
        $("_overlay").style.display = "none";
        $("_load").style.display = "none";
        $("_hideSelect").style.display = "none";
    }
}

function setCursorPosition(oInput,oStart,oEnd) {
   if( oInput.setSelectionRange ) {
         oInput.setSelectionRange(oStart,oEnd);
     } 
     else if( oInput.createTextRange ) {
        var range = oInput.createTextRange();
        range.collapse(true);
        range.moveEnd('character',oEnd);
        range.moveStart('character',oStart);
        range.select();
     }
}