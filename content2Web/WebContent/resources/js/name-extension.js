function setValidHtmlExtension(nombre){
    if(trim(nombre) != ""){
        var i = nombre.lastIndexOf(".");
        if(i > 0){
            var ext = trim(nombre.substring(i + 1, nombre.length));
            if(ext.length == 0){
                nombre += "html";
            }else{
                if(ext.toUpperCase() != 'HTML' && ext.toUpperCase() != 'HTM'){
                    nombre += ".html";
                }
            }
        }else{
            nombre = nombre + ".html";
        }
    }
    
    nombre = trim(nombre);
    return nombre;
}

function LTrim( value ) {
    var re = /\s*((\S+\s*)*)/;
    return value.replace(re, "$1");
}

function RTrim( value ) {
    var re = /((\s*\S+)*)\s*/;
    return value.replace(re, "$1");            
}

function trim( value ) {
    return LTrim(RTrim(value));
} 