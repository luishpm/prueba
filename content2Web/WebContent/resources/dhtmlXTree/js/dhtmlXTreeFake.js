 

 
function dhtmlXTreeObject(htmlObject,width,height,rootId){
 if(typeof(htmlObject)!="object")
 this.parentObject=document.getElementById(htmlObject);
 else
 this.parentObject=htmlObject;
 this.mytype="tree";
 this.width=width;
 this.height=height;
 this.rootId=rootId;
 
 this.hfMode=0;
 this.nodeCut=0;
 this.XMLsource=0;
 this.XMLloadingWarning=0;
 this.a0=new Array();
 this.globalNodeStorage=new Array();
 this.a0Size=0;
 this.treeLinesOn=true;
 this.checkFuncHandler=0;
 this.openFuncHandler=0;
 this.dblclickFuncHandler=0;
 this.tscheck=false;
 
 this.imPath="treeGfx/";
 this.checkArray=new Array("iconUnCheckAll.gif","iconCheckAll.gif","iconCheckGray.gif");
 this.lineArray=new Array("line2.gif","line3.gif","line4.gif","blank.gif","blank.gif");
 this.minusArray=new Array("minus2.gif","minus3.gif","minus4.gif","minus.gif","minus5.gif");
 this.plusArray=new Array("plus2.gif","plus3.gif","plus4.gif","plus.gif","plus5.gif");
 this.imageArray=new Array("leaf.gif","folderOpen.gif","folderClosed.gif");
 this.cutImg= new Array(0,0,0);
 this.cutImage="but_cut.gif";
 
 this.dragger= new dhtmlDragAndDropObject();
 this.htmlNode=new dhtmlXTreeItemObject(this.rootId,"",0,this);
 this.htmlNode.htmlNode.childNodes[0].childNodes[0].style.display="none";
 this.htmlNode.htmlNode.childNodes[0].childNodes[0].childNodes[0].className="hiddenRow";
 this.allTree=this.a2();
 this.allTree.appendChild(this.htmlNode.htmlNode);
 this.allTree.onselectstart=new Function("return false;");
 this.XMLLoader=new dtmlXMLLoaderObject(this.a3,this);
 
 return this;
};

 
function dhtmlXTreeItemObject(itemId,itemText,parentObject,treeObject,actionHandler,mode){
 this.htmlNode="";
 this.acolor="";
 this.scolor="";
 this.tr=0;
 this.childsCount=0;
 this.tempDOMM=0;
 this.tempDOMU=0;
 this.dragSpan=0;
 this.dragMove=0;
 this.span=0;
 this.closeble=1;
 this.childNodes=new Array();

 this.checkstate=0;
 this.treeNod=treeObject;
 this.label=itemText;
 this.parentObject=parentObject;
 this.actionHandler=actionHandler;
 this.images=new Array(treeObject.imageArray[0],treeObject.imageArray[1],treeObject.imageArray[2]);


 this.id=treeObject.a0Add(itemId,this);
 if(this.treeNod.checkBoxOff)this.htmlNode=this.treeNod.a20(1,this,mode);
 else this.htmlNode=this.treeNod.a20(0,this,mode);
 this.htmlNode.objBelong=this;
 return this;
};
 
 
 
 dhtmlXTreeObject.prototype.a0Add=function(itemId,itemObject){
 if(this.a0Find(itemId)){d=new Date();itemId=d.valueOf()+"_"+itemId;return this.a0Add(itemId,itemObject);}
 this.a0[this.a0Size]=itemId;
 this.globalNodeStorage[this.a0Size]=itemObject;
 this.a0Size++;
 return itemId;
};
 
 dhtmlXTreeObject.prototype.a0Sub=function(itemId){
 for(var i=0;i<this.a0Size;i++)
 if(this.a0[i]==itemId)
{
 this.a0[i]=this.a0[this.a0Size-1];
 this.globalNodeStorage[i]=this.globalNodeStorage[this.a0Size-1];
 this.a0Size--;
 this.a0[this.a0Size]=0;
 this.globalNodeStorage[this.a0Size]=0;
}
};
 
 
 dhtmlXTreeObject.prototype.a0Find=function(itemId){

 for(var i=0;i<this.a0Size;i++)
 if(this.a0[i]==itemId)
 return this.globalNodeStorage[i];
 return 0;
};


 
 
 dhtmlXTreeObject.prototype.a7=function(htmlObject)
{
 var tr =document.createElement('tr');
 var td1=document.createElement('td');
 var td2=document.createElement('td');
 td1.appendChild(document.createTextNode(" "));
 td2.colSpan=3;td2.appendChild(htmlObject);tr.appendChild(td1);tr.appendChild(td2);
 return tr;
};

 dhtmlXTreeObject.prototype.loadXML=function(file){this.XMLLoader.loadXML(file);};
 
 dhtmlXTreeObject.prototype.a8=function(parentObject,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs,beforeNode){
 if(beforeNode)parentObject=beforeNode.parentObject;
 if(((parentObject.XMLload==0)&&(this.XMLsource))&&(!this.XMLloadingWarning))
{
 parentObject.XMLload=1;
 this.saveParentObject=parentObject.id;
 this.loadXML(this.XMLsource+getUrlSymbol(this.XMLsource)+"itemId="+escape(parentObject.itemId));
}
 
 var Count=parentObject.childsCount;
 var Nodes=parentObject.childNodes;
 
 if((!itemActionHandler)&&(this.aFunc))itemActionHandler=this.aFunc;
 Nodes[Count]=new dhtmlXTreeItemObject(itemId,itemText,parentObject,this,itemActionHandler,1);
 
 if(image1)Nodes[Count].images[0]=image1;
 if(image2)Nodes[Count].images[1]=image2;
 if(image3)Nodes[Count].images[2]=image3;
 
 parentObject.childsCount++;
 var tr=this.a7(Nodes[Count].htmlNode);
 if(this.XMLloadingWarning)
 Nodes[Count].htmlNode.parentNode.parentNode.style.display="none";
 
 if(optionStr){
 var tempStr=optionStr.split(",");
 for(var i=0;i<tempStr.length;i++)
{
 switch(tempStr[i])
{
 case "TOP": if(parentObject.childsCount>1)beforeNode=parentObject.htmlNode.childNodes[0].childNodes[1].nodem.previousSibling;break;
}
};
};
 
 if((beforeNode)&&(beforeNode.tr.nextSibling))
 parentObject.htmlNode.childNodes[0].insertBefore(tr,beforeNode.tr.nextSibling);
 else
 parentObject.htmlNode.childNodes[0].appendChild(tr);

 if(this.XMLsource)if((childs)&&(childs!=0))Nodes[Count].XMLload=0;else Nodes[Count].XMLload=1;

 Nodes[Count].tr=tr;
 tr.nodem=Nodes[Count];

 if(parentObject.itemId==0)
 tr.childNodes[0].className="hitemIddenRow";
 
 if(optionStr){
 var tempStr=optionStr.split(",");
 for(var i=0;i<tempStr.length;i++)
{
 switch(tempStr[i])
{
 case "SELECT": this.selectItem(itemId,false);break;
 case "CALL": this.selectItem(itemId,true);break;
 case "CHILD": Nodes[Count].XMLload=0;break;
 case "CHECKED": this.setCheck(itemId,1);break;
 case "OPEN": Nodes[Count].openMe=1;break;
}
};
};

 if(!this.XMLloadingWarning)
{
 if(this.a9(parentObject)<0)
 this.openItem(parentObject.id);
 
 if(beforeNode)
{
 this.a10(beforeNode);
 this.a11(beforeNode);
}
 this.a10(parentObject);
 this.a11(parentObject);
 this.a10(Nodes[Count]);
 if(parentObject.childsCount>=2)
{
 this.a10(Nodes[parentObject.childsCount-2]);
 this.a11(Nodes[parentObject.childsCount-2]);
}
 if(parentObject.childsCount!=2)this.a10(Nodes[0]);
 if(this.tscheck)this.a12(parentObject);
}
 

};

 
 dhtmlXTreeObject.prototype.insertNewItem=function(parentId,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs){
 var parentObject=this.a0Find(parentId);
 if(!parentObject)return(-1);
 this.a8(parentObject,itemId,itemText,itemActionHandler,image1,image2,image3,optionStr,childs);
};
 
 dhtmlXTreeObject.prototype.a3=function(dhtmlObject,node,parentId,level){
 dhtmlObject.XMLloadingWarning=1;
 var nodeAskingCall="";
 if(!node){
 node=dhtmlObject.XMLLoader.getXMLTopNode("tree");
 parentId=node.getAttribute("id");
 if (dhtmlObject.saveParentObject) parentId=dhtmlObject.saveParentObject;
 
}

 for(var i=0;i<node.childNodes.length;i++)
{
 if((node.childNodes[i].nodeType==1)&&(node.childNodes[i].tagName == "item"))
{
 var name=node.childNodes[i].getAttribute("text");
 var cId=node.childNodes[i].getAttribute("id");
 
 var im0=node.childNodes[i].getAttribute("im0");
 var im1=node.childNodes[i].getAttribute("im1");
 var im2=node.childNodes[i].getAttribute("im2");
 
 var aColor=node.childNodes[i].getAttribute("aCol");
 var sColor=node.childNodes[i].getAttribute("sCol");
 
 var chd=node.childNodes[i].getAttribute("child");
 
 var atop=node.childNodes[i].getAttribute("top");
 var aopen=node.childNodes[i].getAttribute("open");
 var aselect=node.childNodes[i].getAttribute("select");
 var acall=node.childNodes[i].getAttribute("call");
 var achecked=node.childNodes[i].getAttribute("checked");
 var closeable=node.childNodes[i].getAttribute("closeable");
 
 var zST="";
 if(aselect)zST+=",SELECT";
 if(atop)zST+=",TOP";
 if(acall)nodeAskingCall=cId;
 if(achecked)zST+=",CHECKED";
 if(aopen)zST+=",OPEN";
 
 var temp=dhtmlObject.a0Find(parentId);
 temp.XMLload=1;
 dhtmlObject.insertNewItem(parentId,cId,name,0,im0,im1,im2,zST,chd);
 dhtmlObject.setItemColor(cId,aColor,sColor);
 if((closeable=="0")||(closeable=="1"))dhtmlObject.setItemCloseable(cId,closeable);
 var zcall=dhtmlObject.a3(dhtmlObject,node.childNodes[i],cId,1);
 if(zcall!="")nodeAskingCall=zcall;
}
 else
 if((node.childNodes[i].nodeType==1)&&(node.childNodes[i].tagName == "userdata"))
{
 var name=node.childNodes[i].getAttribute("name");
 if((name)&&(node.childNodes[i].childNodes[0])){
 dhtmlObject.setUserData(parentId,name,node.childNodes[i].childNodes[0].data);
};
};
};

 if(!level){
 dhtmlObject.lastLoadedXMLId=parentId;
 dhtmlObject.a13(dhtmlObject);
 dhtmlObject.XMLloadingWarning=0;
 if(nodeAskingCall!="")dhtmlObject.selectItem(nodeAskingCall,true);
}
 return nodeAskingCall;
};
 
 
 dhtmlXTreeObject.prototype.a13=function(dhtmlObject,itemObject){
 if(!itemObject){
 var tempx=dhtmlObject.a0Find(dhtmlObject.lastLoadedXMLId);
 dhtmlObject.lastLoadedXMLId=-1;
 if(!tempx)return 0;
}
 else tempx=itemObject;
 for(var i=0;i<tempx.childsCount;i++)
{
 if(!itemObject)tempx.childNodes[i].htmlNode.parentNode.parentNode.style.display="";
 if(tempx.childNodes[i].openMe==1)
 for(var zy=0;zy<tempx.childNodes[i].childNodes.length;zy++)
 tempx.childNodes[i].htmlNode.childNodes[0].childNodes[zy+1].style.display="";
 dhtmlObject.a13(dhtmlObject,tempx.childNodes[i]);
 dhtmlObject.a11(tempx.childNodes[i]);
 dhtmlObject.a10(tempx.childNodes[i]);
};
 dhtmlObject.a11(tempx);
 dhtmlObject.a10(tempx);
};

 
 dhtmlXTreeObject.prototype.a2=function(){
 var div=document.createElement('div');
 div.className="containerTableStyle";
 div.style.width=this.width;
 div.style.height=this.height;
 this.parentObject.appendChild(div);
 return div;
};

 
 dhtmlXTreeObject.prototype.a14=function(itemObject)
{
 this.a15(itemObject,1);
 for(var i=0;i<itemObject.childsCount;i++)
 this.a14(itemObject.childNodes[i]);
};
 
 dhtmlXTreeObject.prototype.a16=function(itemObject)
{
 this.a15(itemObject,2);
 for(var i=0;i<itemObject.childsCount;i++)
 this.a16(itemObject.childNodes[i]);
};
 
 dhtmlXTreeObject.prototype.a10=function(itemObject){
 var workArray=this.lineArray;
 if((this.XMLsource)&&(!itemObject.XMLload))
{
 var workArray=this.plusArray;
 itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[2].childNodes[0].src=this.imPath+itemObject.images[2];
}
 else
try{
 if(itemObject.childsCount)
{
 if(itemObject.htmlNode.childNodes[0].childNodes[1].style.display!="none")
{
 var workArray=this.minusArray;
 itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[2].childNodes[0].src=this.imPath+itemObject.images[1];
}
 else
{
 var workArray=this.plusArray;
 itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[2].childNodes[0].src=this.imPath+itemObject.images[2];
}
}
 else
{
 itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[2].childNodes[0].src=this.imPath+itemObject.images[0];
}
}
 catch(e){};
 
 var tempNum=2;
 if(!itemObject.treeNod.treeLinesOn)itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0].src=this.imPath+workArray[3];
 else{
 if(itemObject.parentObject)tempNum=this.a17(itemObject.id,itemObject.parentObject);
 itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0].src=this.imPath+workArray[tempNum];
}
};
 
 dhtmlXTreeObject.prototype.a11=function(itemObject){
 var sNode=itemObject.parentObject;
 try{
 if(sNode)
 if((this.a18(itemObject.id,sNode)==0)||(!this.treeLinesOn))
{
 for(var i=1;i<=itemObject.childsCount;i++)
{
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundImage="";
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundRepeat="";
}
}
 else
 for(var i=1;i<=itemObject.childsCount;i++)
{
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundImage="url("+this.imPath+"line1.gif)";
 itemObject.htmlNode.childNodes[0].childNodes[i].childNodes[0].style.backgroundRepeat="repeat-y";
}
}
 catch(e){};
};
 
 dhtmlXTreeObject.prototype.a17=function(itemId,itemObject){
 try{
 if(itemObject.childsCount<=1){if(itemObject.id==this.rootId)return 4;else return 0;}
 
 if(itemObject.htmlNode.childNodes[0].childNodes[1].nodem.id==itemId)if(!itemObject.id)return 2;else return 1;
 if(itemObject.htmlNode.childNodes[0].childNodes[itemObject.childsCount].nodem.id==itemId)return 0;
}
 catch(e){};
 return 1;
};
 
 dhtmlXTreeObject.prototype.a18 =function(itemId,itemObject){
 if(itemObject.htmlNode.childNodes[0].childNodes[itemObject.childsCount].nodem.id==itemId)return 0;
 return 1;
}

 
 dhtmlXTreeObject.prototype.a15=function(itemObject,mode){
 if(((this.XMLsource)&&(!itemObject.XMLload))&&(!mode)){itemObject.XMLload=1;  this.saveParentObject=itemObject.id; this.loadXML(this.XMLsource+getUrlSymbol(this.XMLsource)+"id="+escape(itemObject.id));return;};
 var Nodes=itemObject.htmlNode.childNodes[0].childNodes;var Count=Nodes.length;
 if(Count>1){
 if(((Nodes[1].style.display!="none")||(mode==1))&&(mode!=2))nodestyle="none";else nodestyle="";
 for(var i=1;i<Count;i++)
 Nodes[i].style.display=nodestyle;
}
 this.a10(itemObject);
}
 
 dhtmlXTreeObject.prototype.a9=function(itemObject){
 var z=itemObject.htmlNode.childNodes[0].childNodes;
 if(z.length<=1)return 0;
 if(z[1].style.display!="none")return 1
 else return -1;
}

 
 
 
 dhtmlXTreeObject.prototype.onRowClick2=function(){
 if(this.parentObject.treeNod.dblclickFuncHandler)if(!this.parentObject.treeNod.dblclickFuncHandler(this.parentObject.id))return 0;
 if((this.parentObject.closeble)&&(this.parentObject.closeble!="0"))
 this.parentObject.treeNod.a15(this.parentObject);
 else
 this.parentObject.treeNod.a15(this.parentObject,2);
};
 
 dhtmlXTreeObject.prototype.onRowClick=function(){
 if(this.parentObject.treeNod.openFuncHandler)if(!this.parentObject.treeNod.openFuncHandler(this.parentObject.id,this.parentObject.treeNod.a9(this.parentObject)))return 0;
 if((this.parentObject.closeble)&&(this.parentObject.closeble!="0"))
 this.parentObject.treeNod.a15(this.parentObject);
 else
 this.parentObject.treeNod.a15(this.parentObject,2);
};
 
 
 dhtmlXTreeObject.prototype.onRowSelect=function(e,htmlObject,mode){
 if(!htmlObject)htmlObject=this;
 htmlObject.childNodes[0].className="selectedTreeRow";
 if(htmlObject.parentObject.scolor)htmlObject.parentObject.span.style.color=htmlObject.parentObject.scolor;
 if((htmlObject.parentObject.treeNod.lastSelected)&&(htmlObject.parentObject.treeNod.lastSelected!=htmlObject))
{
 htmlObject.parentObject.treeNod.lastSelected.childNodes[0].className="standartTreeRow";
 if(htmlObject.parentObject.treeNod.lastSelected.parentObject.acolor)htmlObject.parentObject.treeNod.lastSelected.parentObject.span.style.color=htmlObject.parentObject.treeNod.lastSelected.parentObject.acolor;
}
 htmlObject.parentObject.treeNod.lastSelected=htmlObject;
 if(!mode){if(htmlObject.parentObject.actionHandler)htmlObject.parentObject.actionHandler(htmlObject.parentObject.id);}
};
 



 
 
dhtmlXTreeObject.prototype.a12=function(dhtmlObject){
 if(!this.tscheck)return;
 if(dhtmlObject.id==this.rootId)return;
 var act=dhtmlObject.htmlNode.childNodes[0].childNodes;
 var flag1=0;var flag2=0;
 for(var i=1;i<act.length;i++)
 if(act[i].nodem.checkstate==0)flag1=1;
 else if(act[i].nodem.checkstate==1)flag2=1;
 else{flag1=1;flag2=1;break;}

 if((flag1)&&(flag2))this.a19(dhtmlObject,"notsure");
 else if(flag1)this.a19(dhtmlObject,false);
 else this.a19(dhtmlObject,true);
 
 this.a12(dhtmlObject.parentObject);
}
 
 
 dhtmlXTreeObject.prototype.onCheckBoxClick=function(e){
 if(this.treeNod.tscheck)
 if(this.parentObject.checkstate==1)this.treeNod.a31(false,this.parentObject);
 else this.treeNod.a31(true,this.parentObject);
 else
 if(this.parentObject.checkstate==1)this.treeNod.a19(this.parentObject,false);
 else this.treeNod.a19(this.parentObject,true);
 this.treeNod.a12(this.parentObject.parentObject);
 if(this.treeNod.checkFuncHandler)return(this.treeNod.checkFuncHandler(this.parentObject.id,this.parentObject.checkstate));
 else return true;
};
 
 dhtmlXTreeObject.prototype.a20=function(acheck,itemObject,mode){
 var table=document.createElement('table');
 table.cellSpacing=0;table.cellPadding=0;
 table.border=0;
 if(this.hfMode)table.style.tableLayout="fixed";
 table.style.margin=0;table.style.padding=0;
 
 var tbody=document.createElement('tbody');
 var tr=document.createElement('tr');
 var td1=document.createElement('td');
 td1.className="standartTreeImage";
 var img0=document.createElement("img");
 img0.border="0";td1.appendChild(img0);img0.style.padding=0;img0.style.margin=0;
 
 var td11=document.createElement('td');
 var inp=document.createElement("img");inp.checked=0;inp.src=this.imPath+this.checkArray[0];inp.style.width="16px";inp.style.height="16px";

 if(!acheck)inp.style.display="none";
 td11.appendChild(inp);
 inp.onclick=this.onCheckBoxClick;
 inp.treeNod=this;
 inp.parentObject=itemObject;

 var td12=document.createElement('td');
 td12.className="standartTreeImage";
 var img=document.createElement("img");
 img.border="0";
 if(!mode)img.src=this.imPath+this.imageArray[0];
 td12.appendChild(img);img.style.padding=0;img.style.margin=0;
 img.style.width="18px";img.style.height="18px";

 
 var td2=document.createElement('td');
 td2.className="standartTreeRow";
 td2.noWrap=true;
 itemObject.span=document.createElement('span');
 itemObject.span.className="standartTreeRow";
 td2.style.width="100%";
 itemObject.span.appendChild(document.createTextNode(itemObject.label));
 td2.appendChild(itemObject.span);
 td2.parentObject=itemObject;td1.parentObject=itemObject;
 td2.onclick=this.onRowSelect;td1.onclick=this.onRowClick;td2.ondblclick=this.onRowClick2;
 
 if(this.dragAndDropOff)this.dragger.addDraggableItem(td2,this);
 
 itemObject.span.style.paddingLeft="5px";itemObject.span.style.paddinRight="5px";td2.style.verticalAlign="";
 td2.style.fontSize="10pt";td2.style.cursor="pointer";
 tr.appendChild(td1);tr.appendChild(td11);tr.appendChild(td12);
 tr.appendChild(td2);
 tbody.appendChild(tr);
 table.appendChild(tbody);
 return table;
};
 
 
 
 dhtmlXTreeObject.prototype.setImagePath=function(newPath){this.imPath=newPath;};
 
 
 
 dhtmlXTreeObject.prototype.setOnClickHandler=function(func){if(typeof(func)=="function")this.aFunc=func;else this.aFunc=eval(func);};
 
 
 dhtmlXTreeObject.prototype.setXMLAutoLoading=function(filePath){this.XMLsource=filePath;};
 
 
 dhtmlXTreeObject.prototype.setOnCheckHandler=function(func){if(typeof(func)=="function")this.checkFuncHandler=func;else this.checkFuncHandler=eval(func);};
 
 
 
 dhtmlXTreeObject.prototype.setOnOpenHandler=function(func){if(typeof(func)=="function")this.openFuncHandler=func;else this.openFuncHandler=eval(func);};
 
 
 dhtmlXTreeObject.prototype.setOnDblClickHandler=function(func){if(typeof(func)=="function")this.dblclickFuncHandler=func;else this.dblclickFuncHandler=eval(func);};
 
 
 
 





 
 dhtmlXTreeObject.prototype.openAllItems=function(itemId)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 this.a16(temp);
};
 
 dhtmlXTreeObject.prototype.closeAllItems=function(itemId)
{
 if(this.rootId==itemId)return 0;
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 this.a14(temp);
};
 
 
 
 dhtmlXTreeObject.prototype.setUserData=function(itemId,name,value){
 var sNode=this.a0Find(itemId);
 if(!sNode)return;
 if(name=="hint")sNode.htmlNode.childNodes[0].childNodes[0].title=value;
 sNode[name]=value;
};
 
 
 dhtmlXTreeObject.prototype.getUserData=function(itemId,name){
 var sNode=this.a0Find(itemId);
 if(!sNode)return;
 return eval("sNode."+name);
};
 
 
 dhtmlXTreeObject.prototype.getSelectedItemId=function()
{
 if(this.lastSelected)
 return this.lastSelected.parentObject.id;
 else return("");
};
 
 
 dhtmlXTreeObject.prototype.getItemColor=function(itemId)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;

 if(temp.acolor)return temp.acolor;
 else return "";
};
 
 dhtmlXTreeObject.prototype.setItemColor=function(itemId,defaultColor,selectedColor)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 else{
 if((this.lastSelected)&&(temp.tr==this.lastSelected.parentObject.tr))
{if(selectedColor)temp.span.style.color=selectedColor;}
 else 
{if(defaultColor)temp.span.style.color=defaultColor;}
 
 if(selectedColor)temp.scolor=selectedColor;
 if(defaultColor)temp.acolor=defaultColor;
}
};
 
 
 dhtmlXTreeObject.prototype.getItemText=function(itemId)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 return(temp.htmlNode.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML);
};
 
 dhtmlXTreeObject.prototype.getParentId=function(itemId)
{
 var temp=this.a0Find(itemId);
 if((!temp)||(!temp.parentObject))return "";
 return temp.parentObject.id;
};



 
 dhtmlXTreeObject.prototype.changeItemId=function(itemId,newItemId)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 temp.id=newItemId;
 for(var i=0;i<this.a0Size;i++)
 if(this.a0[i]==itemId)
{
 this.a0[i]=newItemId;
}
};

 
 
 dhtmlXTreeObject.prototype.doCut=function(){
 if(this.nodeCut)this.clearCut();
 this.nodeCut=this.lastSelected;
 if(this.nodeCut)
{
 var tempa=this.nodeCut.parentObject;
 this.cutImg[0]=tempa.images[0];
 this.cutImg[1]=tempa.images[1];
 this.cutImg[2]=tempa.images[2];
 tempa.images[0]=tempa.images[1]=tempa.images[2]=this.cutImage;
 this.a10(tempa);
}
};
 
 
 dhtmlXTreeObject.prototype.doPaste=function(itemId){
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 if(this.nodeCut){
 if((!this.a21(this.nodeCut.parentObject.id,temp))&&(id!=this.nodeCut.parentObject.parentObject.id))
 this.a22(temp,this.nodeCut.parentObject);
 this.clearCut();
}
};
 
 
 dhtmlXTreeObject.prototype.clearCut=function(){
 if(this.nodeCut)
{
 var tempa=this.nodeCut.parentObject;
 tempa.images[0]=this.cutImg[0];
 tempa.images[1]=this.cutImg[1];
 tempa.images[2]=this.cutImg[2];
 if(tempa.parentObject)this.a10(tempa);
 if(tempa.parentObject)this.a11(tempa);
 this.nodeCut=0;
}
};
 


 
 dhtmlXTreeObject.prototype.a22=function(itemObject,targetObject){
 if(this.dragFunc)if(!this.dragFunc(itemObject.id,targetObject.id))return;
 if((targetObject.XMLload==0)&&(this.XMLsource))
{
 this.saveParentObject=pNode.id;
 targetObject.XMLload=1;this.loadXML(this.XMLsource+getUrlSymbol(this.XMLsource)+"id="+escape(pNode.id));
}
 this.openItem(targetObject.id);
 var oldTree=itemObject.treeNod;
 var c=itemObject.parentObject.childsCount;
 var z=itemObject.parentObject;
 var Count=targetObject.childsCount;var Nodes=targetObject.childNodes;
 Nodes[Count]=itemObject;
 itemObject.treeNod=targetObject.treeNod;
 targetObject.childsCount++;
 
 var tr=this.a7(Nodes[Count].htmlNode);
 targetObject.htmlNode.childNodes[0].appendChild(tr);
 
 itemObject.parentObject.htmlNode.childNodes[0].removeChild(itemObject.tr);
 
 for(var i=0;i<z.childsCount;i++)
 if(z.childNodes[i].id==itemObject.itemId){
 Nodes[i]=0;
 break;}
 oldTree.a28(z.childsCount,z.childNodes);
 z.childsCount--;
 itemObject.tr=tr;
 tr.nodem=itemObject;

 itemObject.parentObject=targetObject;
 if(oldTree!=targetObject.treeNod){if(itemObject.treeNod.a25(itemObject,oldTree))return;this.a24(itemObject);};
 
 
 if(c>1){oldTree.a10(z.childNodes[c-2]);
 oldTree.a11(z.childNodes[c-2]);}
 this.a10(targetObject);
 this.a11(targetObject);
 oldTree.a10(z);
 this.a11(itemObject);
 this.a10(Nodes[Count]);
 if(targetObject.childsCount>=2)
{
 this.a10(Nodes[targetObject.childsCount-2]);
 this.a11(Nodes[targetObject.childsCount-2]);
}
 if(this.tscheck)this.a12(targetObject);
 if(oldTree.tscheck)oldTree.a12(z);
};
 
 
dhtmlXTreeObject.prototype.a21=function(itemId,htmlObject){
 if(htmlObject.id==itemId)return 1;
 if(htmlObject.parentObject)return this.a21(itemId,htmlObject.parentObject);else return 0;
};
 
 
 
 
 dhtmlXTreeObject.prototype.a24=function(itemObject){
 var td1=itemObject.htmlNode.childNodes[0].childNodes[0].childNodes[1];
 var td3=td1.nextSibling.nextSibling;
 
 if(this.checkBoxOff){td1.childNodes[0].style.display="";td1.childNodes[0].onclick=this.onCheckBoxClick;}
 else td1.childNodes[0].style.display="none";
 td1.childNodes[0].treeNod=this;
 
 this.dragger.removeDraggableItem(td3);
 if(this.dragAndDropOff)this.dragger.addDraggableItem(td3,this);
 td3.childNodes[0].className="standartTreeRow";
 td3.onclick=this.onRowSelect;td3.ondblclick=this.onRowClick2;
 td1.previousSibling.onclick=this.onRowClick;


 this.a11(itemObject);
 this.a10(itemObject);
 for(var i=0;i<itemObject.childsCount;i++)this.a24(itemObject.childNodes[i]);
};
 
 dhtmlXTreeObject.prototype.a25=function(itemObject,oldTree){
 
 itemObject.id=this.a0Add(itemObject.id,itemObject);
 itemObject.treeNod=this;
 if(oldTree)oldTree.a0Sub(itemObject.id);
 for(var i=0;i<itemObject.childsCount;i++)
 this.a25(itemObject.childNodes[i],oldTree);
 return 0;
};
 
 
 
 dhtmlXTreeObject.prototype.enableThreeStateCheckboxes=function(mode){this.tscheck=convertStringToBoolean(mode);};
 
 
 dhtmlXTreeObject.prototype.enableFixedMode=function(mode){this.hfMode=convertStringToBoolean(mode);};
 
 
 dhtmlXTreeObject.prototype.enableCheckBoxes=function(mode){this.checkBoxOff=convertStringToBoolean(mode);};
 
 dhtmlXTreeObject.prototype.setStdImages=function(image1,image2,image3){
 this.imageArray[0]=image1;this.imageArray[1]=image2;this.imageArray[2]=image3;};

 
 dhtmlXTreeObject.prototype.enableTreeLines=function(mode){
 this.treeLinesOn=convertStringToBoolean(mode);
}

 
 dhtmlXTreeObject.prototype.setImageArrays=function(arrayName,image1,image2,image3,image4,image5){
 switch(arrayName){
 case "plus": this.plusArray[0]=image1;this.plusArray[1]=image2;this.plusArray[2]=image3;this.plusArray[3]=image4;this.plusArray[4]=image5;break;
 case "minus": this.minusArray[0]=image1;this.minusArray[1]=image2;this.minusArray[2]=image3;this.minusArray[3]=image4;this.minusArray[4]=image5;break;
}
};
 
 
 dhtmlXTreeObject.prototype.openItem=function(itemId){
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 this.a15(temp,2);
 if((temp.parentObject)&&(this.a9(temp.parentObject)<0))
 this.openItem(temp.parentObject.id);
};
 
 
 dhtmlXTreeObject.prototype.closeItem=function(itemId){
 if(this.rootId==itemId)return 0;
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 if(temp.closeble)
 this.a15(temp,1);
};
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 dhtmlXTreeObject.prototype.getLevel=function(itemId){
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 return this.a26(temp,0);
};
 
 

 
 dhtmlXTreeObject.prototype.setItemCloseable=function(itemId,flag)
{
 flag=convertStringToBoolean(flag);
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 temp.closeble=flag;
};
 
 
 dhtmlXTreeObject.prototype.a26=function(itemObject,count){
 if(itemObject.parentObject)return this.a26(itemObject.parentObject,count+1);
 return(count);
};
 
 
 dhtmlXTreeObject.prototype.hasChildren=function(itemId){
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 else 
{
 if((this.XMLsource)&&(!temp.XMLload))return true;
 else 
 return temp.childsCount;
};
};
 
 
 
 dhtmlXTreeObject.prototype.setItemText=function(itemId,newLabel)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 temp.htmlNode.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML=newLabel;
};
 
 dhtmlXTreeObject.prototype.refreshItem=function(itemId){
 if(!itemId)itemId=this.rootId;
 var temp=this.a0Find(itemId);
 this.deleteChildItems(itemId);
  this.saveParentObject=itemId;
 this.loadXML(this.XMLsource+getUrlSymbol(this.XMLsource)+"id="+escape(itemId));
};
 
 
 dhtmlXTreeObject.prototype.setItemImage2=function(itemId,image1,image2,image3){
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 temp.images[1]=image2;
 temp.images[2]=image3;
 temp.images[0]=image1;
 this.a10(temp);
};
 
 dhtmlXTreeObject.prototype.setItemImage=function(itemId,image1,image2)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 if(image2)
{
 temp.images[1]=image1;
 temp.images[2]=image2;
}
 else temp.images[0]=image1;
 this.a10(temp);
};
 
 
 
 dhtmlXTreeObject.prototype.getSubItems =function(itemId)
{
 var temp=this.a0Find(itemId);
 if(!temp)return 0;

 var z="";
 for(i=0;i<temp.childsCount;i++)
 if(!z)z=temp.childNodes[i].id;
 else z+=","+temp.childNodes[i].id;
 return z;
};
 
 dhtmlXTreeObject.prototype.getAllSubItems =function(itemId){
 return this.a27(itemId);
}
 
 
 dhtmlXTreeObject.prototype.a27 =function(itemId,z,node)
{
 if(node)temp=node;
 else{
 var temp=this.a0Find(itemId);
};
 if(!temp)return 0;
 
 z="";
 for(var i=0;i<temp.childsCount;i++)
{
 if(!z)z=temp.childNodes[i].id;
 else z+=","+temp.childNodes[i].id;
 var zb=this.getAllSubItems(id,z,temp.childNodes[i])
 if(zb)z+=","+zb;
}
 return z;
};
 

 
 
 dhtmlXTreeObject.prototype.selectItem=function(itemId,mode){
 mode=convertStringToBoolean(mode);
 var temp=this.a0Find(itemId);
 if(!temp)return 0;
 if(mode)
 this.onRowSelect(0,temp.htmlNode.childNodes[0].childNodes[0].childNodes[3],false);
 else
 this.onRowSelect(0,temp.htmlNode.childNodes[0].childNodes[0].childNodes[3],true);
};
 
 
 dhtmlXTreeObject.prototype.getSelectedItemText=function()
{
 if(this.lastSelected)
 return this.lastSelected.parentObject.htmlNode.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML;
 else return("");
};




 
 dhtmlXTreeObject.prototype.a28=function(Count,Nodes)
{
 Count--;
 for(var i=0;i<Count;i++)
{
 if(Nodes[i]==0){Nodes[i]=Nodes[i+1];Nodes[i+1]=0;}
};
};
 
 dhtmlXTreeObject.prototype.a29=function(itemId,htmlObject,skip){

 if(!skip){
 this.a0RecSub(htmlObject);
}
 
 if((!htmlObject)||(!htmlObject.parentObject))return 0;
 var tempos=0;var tempos2=0;
 if(htmlObject.tr.nextSibling)tempos=htmlObject.tr.nextSibling.nodem;
 if(htmlObject.tr.previousSibling)tempos2=htmlObject.tr.previousSibling.nodem;
 
 var sN=htmlObject.parentObject;
 var Count=sN.childsCount;
 var Nodes=sN.childNodes;
 for(var i=0;i<Count;i++)
{
 if(Nodes[i].id==itemId){
 if(!skip)sN.htmlNode.childNodes[0].removeChild(Nodes[i].tr);
 Nodes[i]=0;
 break;
}
}
 this.a28(Count,Nodes);
 if(!skip){
 sN.childsCount--;
}

 if(tempos){
 this.a10(tempos);
 this.a11(tempos);
}
 if(tempos2){
 this.a10(tempos2);
 this.a11(tempos2);
}
 if(this.tscheck)this.a12(sN);
};
 
 dhtmlXTreeObject.prototype.setCheck=function(itemId,state){
 state=convertStringToBoolean(state);
 var sNode=this.a0Find(itemId);
 if(!sNode)return;
 if(this.tscheck)return this.a31(state,sNode);
 else this.a19(sNode,state);
 this.a12(sNode.parentObject);
};
 
 dhtmlXTreeObject.prototype.a19=function(sNode,state){
 var z=sNode.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
 if(state=="notsure")sNode.checkstate=2;
 else if(state)sNode.checkstate=1;else sNode.checkstate=0;
 
 z.src=this.imPath+this.checkArray[sNode.checkstate];
};
 
 
dhtmlXTreeObject.prototype.setSubChecked=function(itemId,state){
 var sNode=this.a0Find(itemId);
 this.a31(state,sNode);
 this.a12(sNode.parentObject);
}
 
 dhtmlXTreeObject.prototype.a31=function(state,sNode){
 state=convertStringToBoolean(state);
 if(!sNode)return;
 for(var i=0;i<sNode.childsCount;i++)
{
 this.a31(state,sNode.childNodes[i]);
};
 var z=sNode.htmlNode.childNodes[0].childNodes[0].childNodes[1].childNodes[0];
 if(state)sNode.checkstate=1;
 else sNode.checkstate=0;
 z.src=this.imPath+this.checkArray[sNode.checkstate];
};

 
 dhtmlXTreeObject.prototype.isItemChecked=function(itemId){
 var sNode=this.a0Find(itemId);
 if(!sNode)return;
 return sNode.checkstate;
};
 




 
 dhtmlXTreeObject.prototype.getAllChecked=function(){
 return this.a32();
}
 
 dhtmlXTreeObject.prototype.a32=function(htmlNode,list){
 if(!htmlNode)htmlNode=this.htmlNode;
 if(htmlNode.checkstate==1){if(list)list+=","+htmlNode.id;else list=htmlNode.id;}
 var j=htmlNode.childsCount;
 for(var i=0;i<j;i++)
{
 list=this.a32(htmlNode.childNodes[i],list);
};
 if(list)return list;else return "";
};
 
 dhtmlXTreeObject.prototype.deleteChildItems=function(itemId)
{
 var sNode=this.a0Find(itemId);
 if(!sNode)return;
 var j=sNode.childsCount;
 for(var i=0;i<j;i++)
{
 this.a29(sNode.childNodes[0].id,sNode.childNodes[0]);
};
};
 
 
dhtmlXTreeObject.prototype.deleteItem=function(itemId,selectParent){
 this.a23(itemId,selectParent);
}
 
dhtmlXTreeObject.prototype.a23=function(itemId,selectParent,skip){
 selectParent=convertStringToBoolean(selectParent);
 var sNode=this.a0Find(itemId);
 if(!sNode)return;
 if(selectParent)this.selectItem(this.getParentId(this.getSelectedItemId()),1);
 if(!skip){
 this.a0RecSub(sNode);
};
 var zTemp=sNode.parentObject;
 this.a29(itemId,sNode,skip);
 this.a10(zTemp);
 this.a11(zTemp);
};
 
 
 dhtmlXTreeObject.prototype.a0RecSub=function(itemObject){
 for(var i=0;i<itemObject.childsCount;i++)
{
 this.a0RecSub(itemObject.childNodes[i]);
 this.a0Sub(itemObject.childNodes[i].id);
};
 this.a0Sub(itemObject.id);
};
 
 
 dhtmlXTreeObject.prototype.insertNewNext=function(parentItemId,itemId,itemName,itemActionHandler,image1,image2,image3,optionStr,childs){
 var sNode=this.a0Find(parentItemId);
 if(!sNode)return(0);
 this.a8(0,itemId,itemName,itemActionHandler,image1,image2,image3,optionStr,childs,sNode);
};

 
 
 
 dhtmlXTreeObject.prototype.getItemIdByIndex=function(itemId,index){
 var z=this.a0Find(itemId);
 if(!z)return 0;
 var temp=z.htmlNode.childNodes[0].childNodes[0];
 while(index>0)
{
 temp=temp.nextSibling;
 if((!temp)||(!temp.nodem))return 0;
 index--;
}
 return temp.nodem.id;
};
 
 dhtmlXTreeObject.prototype.getChildItemIdByIndex=function(itemId,index){
 var sNode=this.a0Find(itemId);
 if(!sNode)return(0);
 if(this.hasChildren(itemId)<index)return 0;
 return sNode.htmlNode.childNodes[0].childNodes[index].nodem.id;
};


 
 

 
 dhtmlXTreeObject.prototype.setDragHandler=function(func){if(typeof(func)=="function")this.dragFunc=func;else this.dragFunc=eval(func);};
 
 
 dhtmlXTreeObject.prototype.a33=function(htmlNode){
 if(htmlNode.parentObject.span){
 htmlNode.parentObject.span.className='standartTreeRow';
 if(htmlNode.parentObject.acolor)htmlNode.parentObject.span.style.color=node.acolor;
}
};
 
 
 dhtmlXTreeObject.prototype.enableDragAndDrop=function(mode){this.dragAndDropOff=convertStringToBoolean(mode);};
 

 
 dhtmlXTreeObject.prototype.a34=function(htmlNode){
 if(htmlNode.parentObject.span){
 htmlNode.parentObject.span.className='selectedTreeRow';
 if(htmlNode.parentObject.scolor)htmlNode.parentObject.span.style.color=node.scolor;
}
};
 
 
 
dhtmlXTreeObject.prototype.a35=function(htmlObject){
 dhtmlObject=htmlObject.parentObject;
 if(this.lastSelected)this.a33(this.lastSelected);
 var dragSpan=document.createElement('div');
 dragSpan.appendChild(document.createTextNode(dhtmlObject.label));
 dragSpan.style.position="absolute";
 dragSpan.className="dragSpanDiv";
 return dragSpan;
}

















 
dhtmlXTreeObject.prototype.a36=function(sourceHtmlObject,dhtmlObject,targetHtmlObject){

 this.a33(targetHtmlObject);
 if(dhtmlObject.lastSelected)dhtmlObject.a34(dhtmlObject.lastSelected);
 if((!this.dragMove)||(this.dragMove()))this.a22(sourceHtmlObject.parentObject,targetHtmlObject.parentObject);

}

dhtmlXTreeObject.prototype.a36In=function(htmlObject,shtmlObject){
 if((!this.a21(shtmlObject.parentObject.id,htmlObject.parentObject))&&(htmlObject.parentObject.id!=shtmlObject.parentObject.id))
{
 this.a34(htmlObject);
 if(this.a9(htmlObject.parentObject)<0)
 this.a38=window.setTimeout(new callerFunction(this.a39,this),1000);
 this.a40=htmlObject.parentObject.id;
 return htmlObject;
}
 else return 0;
}
dhtmlXTreeObject.prototype.a39=function(e,treeObject){
 treeObject.openItem(treeObject.a40);
};
dhtmlXTreeObject.prototype.a36Out=function(htmlObject){this.a33(htmlObject);if(this.a38)clearTimeout(this.a38);};