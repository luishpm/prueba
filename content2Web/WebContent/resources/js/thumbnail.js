/*
	Thumbnails - JWM Solutions
*/

Thumbnail = function(id) {
	this.init(id);
};
Thumbnail.lista = [];
Thumbnail.defaultSrc = "";
Thumbnail.loadingSrc = "";
Thumbnail.get = function(id) {
	for (i=0;i<Thumbnail.lista.length;i++){
		var th = Thumbnail.lista[i]; 
		if (Thumbnail.lista[i].id==id)
			return th;
	}
};

Thumbnail.prototype = {
	nodos: [],
	id: null,
	element: null,
	nextElement: null,
	init: function(id){
		this.id = id;
		Thumbnail.lista[Thumbnail.lista.length] = this;
		this.getElement().innerHTML = "";
        this.nodos =[];
	},
	draw: function(){
        var html = "";
        for (i=0;i<this.nodos.length;i++){
			var nodo = this.nodos[i]; 
			html += nodo.getHTML();
		}
		this.getElement().innerHTML = html;
	},
    
	getElement: function(){
		if (!this.element)
			this.element = document.getElementById(this.id);
		return this.element;
	},

	/*insertThumbnail: function(th){
		var html = th.getHTML();
		this.getElement().innerHTML = this.getElement().innerHTML + html;
	},

	getNode: function(id){
		for (i=0;i<this.nodos.length;i++){
			var nodo = this.nodos[i]; 
			if (this.nodos[i].id==id){
				return nodo;
			}
		}
	},
	*/
	toString: function() {
        return "Thumbnail [Id: " + this.id  + "]";
    }
};


ThumbnailNode = function(id, label, src, parent){
	this.initNode(id, label, src, parent);
};

ThumbnailNode.prototype = {
	id: null,
	label: null,
	parent: null,
	inserted: false,	
	strClick: null,
	strDClick: null,	
	src: null,
	initNode: function(id, label, src, parent){
        id = escape(id);
		this.id = id;
		this.label = label;
		this.src = src;
		this.parent = parent;
		parent.nodos[parent.nodos.length] = this;
	},

	getHTML: function(){
		var buf = [];
		buf[buf.length] = "\n<div class='thumbnail' onmouseover=this.className='thumbnailHover' onmouseout=this.className='thumbnail' ";
		if (this.strClick) buf[buf.length] = " onClick="+ this.strClick;
		if (this.strDClick) buf[buf.length] = " onDblClick="+ this.strDClick;
		buf[buf.length] = 		" >\n";
        buf[buf.length] = 		"<div>\n";
		buf[buf.length] = 			"<table align='center' cellpadding=0 cellspacing=0><tr><td id='tdThumbnail" + this.id +"'>\n";
		buf[buf.length] = 				"<label id='preload"+this.id+"' class='thumbnailPreload' ><img src="+Thumbnail.loadingSrc+"><br>Cargando...</label>";
		buf[buf.length] =			"\n</td></tr></table>\n";
		buf[buf.length] = 		"</div>\n";
		buf[buf.length] = 	"<span id=aNodeLabel"+this.id+">"+this.label+"</span>\n";
		buf[buf.length] = "</div>\n";
        buf[buf.length] = "<div class='divImagenReal'>";
		buf[buf.length] =   "<img src='"+this.src+"' onLoad=\"ThumbnailLoaded(this,'"+this.id+"','"+this.src+"')\">";		
		buf[buf.length] = "</div>";
		return buf.join("");
	},	
	
	showImagePreview: function(){
		alert(this.src);
	},	
	
	toString: function() {
        return "ThumbnailNode [" + this.label + ", " + this.src + "]";
    }
};

function ThumbnailLoaded(img, id, src){
    var td= document.getElementById("tdThumbnail"+id);
    if (img.width>96 || img.height>96){			
        if (img.width>img.height) toFix="width";
        else toFix="height";
        td.innerHTML = "<img src='"+src+"' "+toFix+"='96'>";			
    }else if (img.width>0 && img.height>0){
        td.innerHTML = "<img src='"+src+"'>";
    }
    document.title = "Cargando imagen: "+src;
}


