/* Copyright (c) 2006 Yahoo! Inc. All rights reserved. */

/**
 * @class a YAHOO.util.DDProxy implementation. During the drag over event, the
 * dragged element is inserted before the dragged-over element.
 *
 * @extends YAHOO.util.DDProxy
 * @constructor
 * @param {String} id the id of the linked element
 * @param {String} sGroup the group of related DragDrop objects
 */
YAHOO.example.DDList = function(id, sGroup, config) {

    if (id) {
        this.init(id, sGroup, config);
        this.initFrame();
        this.logger = this.logger || YAHOO;
    }

    var s = this.getDragEl().style;
    s.borderColor = "transparent";
    s.backgroundColor = "#f6f5e5";
    s.opacity = 0.76;
    s.filter = "alpha(opacity=76)";
};

// YAHOO.example.DDList.prototype = new YAHOO.util.DDProxy();
YAHOO.extend(YAHOO.example.DDList, YAHOO.util.DDProxy);

YAHOO.example.DDList.prototype.startDrag = function(x, y) {
    this.logger.log(this.id + " startDrag");

    var dragEl = this.getDragEl();
    var clickEl = this.getEl();

    dragEl.innerHTML = clickEl.innerHTML;
    dragEl.className = clickEl.className;
    dragEl.style.color = clickEl.style.color;
    dragEl.style.border = "1px solid blue";

};

YAHOO.example.DDList.prototype.endDrag = function(e) {
    // disable moving the linked element
};

YAHOO.example.DDList.prototype.onDrag = function(e, id) {
    
};

YAHOO.example.DDList.prototype.onDragOver = function(e, id) {
    // this.logger.log(this.id.toString() + " onDragOver " + id);
    var el;
    
	    
    if ("string" == typeof id) {		
        el = YAHOO.util.DDM.getElement(id);
    } else { 
        el = YAHOO.util.DDM.getBestMatch(id).getEl();
    }
	
    var mid = YAHOO.util.DDM.getPosY(el) + ( Math.floor(el.offsetTop / 2));
    this.logger.log("mid: " + mid);

    if (YAHOO.util.Event.getPageY(e) < mid) {
        var el2 = this.getEl();

		var tmpChk;
		var tmpIndexRow = _getRowIndex(el2);
			
        var _tbody = el.parentNode;
		var _table = _tbody.parentNode;
		
		if ( document.all ){
			tmpChk = _tbody.rows[tmpIndexRow].cells[1].firstChild.checked;
		}
		
		var swapedRow = _tbody.insertBefore(el2,el)
		if ( document.all ){
			swapedRow.cells[1].firstChild.checked = tmpChk;
		}
		
    } 
};

YAHOO.example.DDList.prototype.onDragEnter = function(e, id) {
    // this.logger.log(this.id.toString() + " onDragEnter " + id);
    // this.getDragEl().style.border = "1px solid #449629";
};

YAHOO.example.DDList.prototype.onDragOut = function(e, id) {
    // I need to know when we are over nothing
    // this.getDragEl().style.border = "1px solid #964428";
};

YAHOO.example.DDList.prototype.toString = function() {
    return "DDList " + this.id;
};


/////////////////////////////////////////////////////////////////////////////

YAHOO.example.DDListBoundary = function(id, sGroup, config) {
    if (id) {
        this.init(id, sGroup, config);
        this.logger = this.logger || YAHOO;
        this.isBoundary = true;
    }
};

// YAHOO.example.DDListBoundary.prototype = new YAHOO.util.DDTarget();
YAHOO.extend(YAHOO.example.DDListBoundary, YAHOO.util.DDTarget);

YAHOO.example.DDListBoundary.prototype.toString = function() {
    return "DDListBoundary " + this.id;
};


function exchange(i, j, oTable)
{
	var trs = oTable.tBodies[0].getElementsByTagName("tr");
	
	if(i == j+1) {
		oTable.tBodies[0].insertBefore(trs[i], trs[j]);
	} else if(j == i+1) {
		oTable.tBodies[0].insertBefore(trs[j], trs[i]);
	} else {
		var tmpNode = oTable.tBodies[0].replaceChild(trs[i], trs[j]);
		if(typeof(trs[i]) != "undefined") {
			oTable.tBodies[0].insertBefore(tmpNode, trs[i]);
		} else {
			oTable.appendChild(tmpNode);
		}
	}
}
function _getRowIndex(row) {
	var rtrn = row.rowIndex || 0;
	if (rtrn == 0) {
		do{
			if (row.nodeType == 1) rtrn++;
			row = row.previousSibling;
		} while (row);
		--rtrn;
	}
	return rtrn;
}

Object.prototype.swapNode = function (node) {
  var nextSibling = this.nextSibling;
  var parentNode = this.parentNode;
  node.parentNode.replaceChild(this, node);
  parentNode.insertBefore(node, nextSibling);  
}
