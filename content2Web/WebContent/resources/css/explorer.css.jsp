<% response.setContentType("text/css"); %>
tbody {
    height: 100%;
}

#portapapeles{
    border: 1px solid black;
    background: white;
    font-family: Verdana;
    font-size: 11px;
    width: auto;
    position: absolute;
    display: none;
}

#portapapeles td{
    font-family: Verdana;
    font-size: 11px;
}

.load{
	display: none;
	position: absolute;
	height:100px;
	width:100px;
	z-index: 101;
}

.hideSelect{
	position:absolute;
	top: 0;
	left: 0;
    width: 1px;
    height: 1px;
	z-index:99;
	background:#ffffff;
	border:none;
	filter:alpha(opacity=0);
	-moz-opacity: 0;
	opacity: 0;
}
.overlay {
	position: absolute;
	z-index:100;
	top: 0px;
	left: 0px;
	background-color:#000;
	filter:alpha(opacity=70);
	-moz-opacity: 0.7;
	opacity: 0.7;
}
.textXML{
    width: 100%;
    height: 30px;
    border: 1px solid #cccccc;
    overflow: auto;
}
img.button {
	height: 20px;
	width: 20px;
	border: 0px none;
	vertical-align: middle;
}
a.button {
	color: ButtonText;
	text-decoration: none;
	cursor: pointer;
}

span.norm {
	display: block;
	border: 1px solid transparent !important;
    border: 1px solid #F6F6F6; /*IE*/
    border-bottom: 0px;
}

span.over {
	display: block;
	border-top: 1px solid ThreeDHighlight;
	border-left: 1px solid ThreeDHighlight;
	border-bottom: 1px solid ThreeDShadow;
	border-right: 1px solid ThreeDShadow;
}

span.push {
	display: block;
	border-top: 1px solid ThreeDShadow;
	border-left: 1px solid ThreeDShadow;
	border-bottom: 1px solid ThreeDHighlight;
	border-right: 1px solid ThreeDHighlight;
}

.toolbarElementos{
    position: absolute;
    background-color: #F6F6F6;
    border-top: 1px solid ThreeDHighlight;
	border-left: 1px solid ThreeDHighlight;
	border-bottom: 1px solid ThreeDShadow;
	border-right: 1px solid ThreeDShadow;
}

.contenedor{
    border:1px silver solid; 
    background-color:#F6F6F6;
    height:100%;
    width:100%;
}

.contenedor td{
	font-family: Verdana;
    font-size: 11px;
}
.verdanaText td{
    font-size: 11px;
    font-family: Verdana;
}
.verdanaText input{
    font-size: 11px;
    font-family: Verdana;
}

.maxSize{
    width:100%;
    height:100%;
}

.panel2{
	border:1px silver solid;
    background-color:#ffffff;
	height: 100%;
    width: auto !important;
    width: 100%; /*IE*/
	overflow: auto;
}

.contentPanel2{
	border:1px silver solid;
    background-color:#ffffff;
    height: 100%;
	overflow: auto;
    width: 100%;
}

.darksplitter{
    width:5px;
	height:100%;
	background-color:#555555;
}

.splitterbar{    
    width: 100%;
	height: 100%;
	background-color:#F6F6F6;
}

.header {
	border:1px silver solid;	
	background: url(<%=request.getContextPath()%>/resources/images/explorer/header_bg.gif) ;
	height: 25px;	
}

.headerGrid {
	border-right:1px silver solid;
    border-bottom:2px silver solid;		
	background: url(<%=request.getContextPath()%>/resources/images/explorer/header_bg.gif) ;
	height: 25px;	
}


.masterheader {
	background: url(<%=request.getContextPath()%>/resources/images/explorer/heading_bg.gif) ;
	height: 24px;
	color: #FFFFFF;
	font-weight:bold;
}

.fileHover{
	background-color: #E7EEF7;
    cursor: pointer;
}

.fileSelected{
	background-color: #6785A7;
    color: #FFFFFF;
    cursor: pointer;
}


.botonHover{
	background-color: #E7EEF7;
    border: 1px silver solid;
    cursor: pointer;
    height: 20px;
    width: 80px;
    float: left;
}

.boton{	
    border: 1px #F6F6F6 solid;
    height: 20px;
    width: 80px;
    float: left;
}

.tool{	
    border: 1px #EFEFDE solid;
}

.menuPopup{
    position: absolute; 
    border-top:    1px silver solid;
    border-left:   1px silver solid;
    border-right:  1px #000000 solid;
    border-bottom: 1px #000000 solid;
    background: #ffffff;
    font-size: 10px;
}

#contextMenu{
    position: absolute; 
    border-top:    1px silver solid;
    border-left:   1px silver solid;
    border-right:  1px #000000 solid;
    border-bottom: 1px #000000 solid;
    background: #ffffff;
    font-size: 10px;
    left: 0;
    top: 0;
}

#contextMenu #menuTitulo{
    text-align:center;    
    border-bottom: 1px silver solid;
    
}


.menu {
}
.menuHover {
	background-color: #E7EEF7;
    cursor: pointer;
}

.menu table {
    font-size: 10px;
    height: 25px;
}

.menuHover table {
    font-size: 10px;
    height: 25px;
}
.separadorMenu{
    border-bottom: 1px silver solid
}

.thumbnail, .thumbnailHover{
	/* border: 1px silver solid; */
	width: 125px;
	height: 140px;
    background-color:#ffffff;
	float: left;
	text-align:center;
}

.thumbnail span{ /* Label del thumbnail */
	border: 0px silver solid;
	cursor: pointer;	
}
.thumbnailHover span{ /* Label del thumbnail */
	text-decoration: underline;
	border: 0px silver solid;
	cursor: pointer;	
}

.thumbnail div, .thumbnailHover div{ /* Div para imagen del thumbnail */
	width: 96px;
	height: 96px;
	border: 0px;
	background-color:#ffffff;
	margin: 0 auto;
	cursor: pointer;	
    /* border: 1px red solid; */
}

.thumbnail div img, .thumbnailHover div img{ /* imagen del thumbnail */
	border: 0px ;
}
.thumbnail div table, .thumbnailHover div table{ /* tabla para imagen del thumbnail */
	text-align:center;
	padding:0px;
	border-width: 0px; 
    height: 100%;
}
.thumbnail div table label, .thumbnailHover div table label{ 
    color: #999999;
}
.divImagenReal{
	position: absolute;
	height: 10px;
	width: 10px;
	left:1;
	top: 1;
	overflow: auto;
	visibility: hidden;
}
.thumbnailPreload{
	/* position: relative; */
	text-decoration:none;
}

.imagenPreview{
	border: 1px silver solid;
	vertical-align:bottom;
}
.infoPreview{
	border: 1px silver solid;
	background-color:#FaFaFa;
}
.imagenContainer{
	overflow: auto;
	width: 100%;
	height: 100%;
    background: #ffffff;
}
.barPreview{
	border: 1px silver solid;
	height: 30px;
	background: url(<%=request.getContextPath()%>/resources/images/explorer/bar.gif);
}

.barButtonHover{
	margin: 1px;
	height: 19px;
	width: 90px;
	float: left;
	cursor: pointer;
	background: #FFFFFF;
}
.barButton{
	margin: 1px;
	height: 19px;
	width: 90px;
	float: left;
	cursor: pointer;
}



/*********  TREE ***************/

/**** DIR ***/

.DIRtop   { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/folder_top.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.DIRtopNoChildren { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/folder_top.gif) 0 0 no-repeat; width:17px; height:22px; }
.DIRtopCollapsable { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/tm.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.DIRtopCollapsableHover { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/tmh.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.DIRtopExpandible { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/tp.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer; }
.DIRtopExpandibleHover { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/tph.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }

.DIRbottom  { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/folder_bottom.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.DIRbottomNoChildren { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/ln.gif) 0 0 no-repeat; width:17px; height:22px; }
.DIRbottomCollapsable { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/lm.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer; }
.DIRbottomCollapsableHover { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/lmh.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.DIRbottomExpandible { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/lp.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.DIRbottomExpandibleHover { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/lph.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }


/**** IMAGE ***/
.IMAGEtop   { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/image_top.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.IMAGEbottom{ background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/image_bottom.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }

/**** FILE ***/
.FILEtop   { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/file_top.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
.FILEbottom{ background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/file_bottom.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }


.DIRloading { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/loadingFolder.gif) 0 0 no-repeat; width:34px; height:22px; }
.IMAGEloading { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/loadingImage.gif) 0 0 no-repeat; width:34px; height:22px; }
.FILEloading { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/loadingFile.gif) 0 0 no-repeat; width:34px; height:22px; }
.DepthCell { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/vline.gif) 0 0 no-repeat; width:17px; height:22px; }
.BlankDepthCell {width:17px; height:22px; }
.ygtvitem { }
.ygtvitem td {
    height: 22px;
 }    
.ygtvchildren {}  
* html .ygtvchildren { height:1%; }  
.ygtvlabel, .ygtvlabel:link, .ygtvlabel:visited{ 
	color:#000000;
	margin-left:2px;
	text-decoration: none;
}
.ygtvlabel:hover {
	text-decoration: underline;
}
.file { background: url(<%=request.getContextPath()%>/resources/images/explorer/folders/file.gif) 0 0 no-repeat; width:34px; height:22px; cursor:pointer }
