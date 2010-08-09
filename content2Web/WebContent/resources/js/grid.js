/*
	Grid - JWM Solutions
*/

Grid = function(id,w) {
	this.init(id,w);
};
Grid.lista = [];

Grid.get = function(id) {
	for (i=0;i<Grid.lista.length;i++){
		var th = Grid.lista[i]; 
		if (Grid.lista[i].id==id)
			return th;
	}
};

Grid.prototype = {
	id: null,
	fila: [],
    sizes: [],
	element: null,
    
	init: function(id, w){
		this.id = id;
        this.sizes = w;
		Grid.lista[Grid.lista.length] = this;
    		//this.getElement().innerHTML = "";
	},
	
	getElement: function(){
		if (!this.element)
			this.element = document.getElementById(this.id);
		return this.element;
	},

	draw: function(){
        var html = "\n<table cellspacing=0 width=100%>\n";
        for (i=0;i<this.fila.length;i++){
			var fi= this.fila[i];
    		html += fi.getHTML();
		}
        html += "</table>\n";
		this.getElement().innerHTML = html;
	},

	getFila: function(id){
		for (i=0;i<this.fila.length;i++){
			var nodo = this.fila[i]; 
			if (this.fila[i].id==id){
				return nodo;
			}
		}
	},
	
	toString: function() {
        return "Grid [Id: " + this.id  + "]";
    }
};


GridFila= function(id, parent, datos, index){
	this.initFila(id, parent, datos, index);
};

GridFila.prototype = {
	id: null,
	parent: null,
    datos: [],
    strClick: null,
	strDClick: null,
    index: null,
    
	initFila: function(id, parent, datos, index){
        id = escape(id);
		this.id = id;
		this.parent = parent;
        this.datos = datos;
        this.index = index;
		parent.fila[parent.fila.length] = this;
	},
	
	draw: function(){
        this.parent.draw();
	},	
	
	getHTML: function(){
		var buf = [];
		buf[buf.length] = "<tr onmouseover=this.className='fileHover' onmouseout=this.className='' ";
		if (this.strClick)
			buf[buf.length] = " onClick="+ this.strClick;
		if (this.strDClick)
			buf[buf.length] = " onDblClick="+ this.strDClick;
		buf[buf.length] =       " onContextMenu=\"menuContextual(event, '"+this.index+"', this);return false;\" >";
        
        for (x=0;x<this.datos.length;x++){
			var dato = this.datos[x]; 
            var ancho = this.parent.sizes[x];
            
            buf[buf.length] = 		"<td style='";
            if (ancho>=0)
                buf[buf.length] =   "width: "+ancho+"px;"
            buf[buf.length] = 		"height: 20px'>&nbsp;";
            buf[buf.length] =			dato;
            buf[buf.length] = 		"</td>";
		}
		buf[buf.length] = "</tr>\n";
		return buf.join("");
	},	

	toString: function() {
        return "GridFila [" + this.id + ",{"+this.datos+"}]";
    }
};
