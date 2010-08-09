var iframe, mouseOutTimer, objToOut;
function createIframe(){
    iframe = document.createElement('iframe');
    iframe.id = 'DOMIframe';
    iframe.name = 'DOMIframe';
    iframe.style.position = 'absolute';
    iframe.style.top = '0px';
    iframe.style.left = '0px';
    iframe.style.height = '200px';
    iframe.style.width = '200px';
    iframe.style.zIndex = 98;
    iframe.style.display = "none";
    document.getElementById("navigation").appendChild(iframe);
}
function exeMouseOver(obj){
    clearTimeout(mouseOutTimer);
    if (objToOut && obj != objToOut) hideDivAndIframe(objToOut);
    if (obj.className!=" over"){
        obj.className+=" over";
        if (!iframe) createIframe();
        var ul = null;
        for (i=0;i<obj.childNodes.length;i++)
            if (obj.childNodes[i].tagName == "UL"){
               ul =  obj.childNodes[i];
               break;
            }
        if (ul != null){
            x = findX(ul);
            y = findY(ul);
            iframe.style.top = y+"px";
            iframe.style.left = (x+1)+"px";
            iframe.style.height = (ul.clientHeight+1)+"px";
            iframe.style.width = (ul.clientWidth+2)+"px";
            iframe.style.display = "";
        }
    }

}
function exeMouseOut(obj){
    objToOut = obj;
    mouseOutTimer = setTimeout(function(){hideDivAndIframe(obj);}, 100);
}
function hideDivAndIframe(obj){
    if (obj.className==" over"){
        iframe.style.display = "none";
    }
    obj.className = obj.className.replace(" over", "");
}

function findX(obj) {
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

function findY(obj) {
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