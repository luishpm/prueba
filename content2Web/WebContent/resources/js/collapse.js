var iHeight = 400 ;
var collapseStep = 50 ;
var aniSpeed = 2;

function minimisepanel(objDiv)
{

	YAHOO.util.Dom.setStyle(objDiv, 'display','none');

	/*
	var t = parseInt( YAHOO.util.Dom.getStyle(objDiv, 'height'));
	YAHOO.util.Dom.setStyle(objDiv, 'opacity',t/iHeight );
	if(t>0)
	{	t=t-collapseStep ;
		if(t<=0){YAHOO.util.Dom.setStyle(objDiv, 'display','none');}
		YAHOO.util.Dom.setStyle(objDiv, 'height',t);
		setTimeout( "minimisepanel('"+objDiv+"');",aniSpeed);
	}*/
}

function maximisepanel(objDiv)
{
	YAHOO.util.Dom.setStyle(objDiv, 'display','block')
	/*
	var t = parseInt( YAHOO.util.Dom.getStyle(objDiv, 'height'));
	YAHOO.util.Dom.setStyle(objDiv, 'opacity',t/iHeight );
	if(t<=(iHeight-collapseStep))
	{	t=t+collapseStep ;
		YAHOO.util.Dom.setStyle(objDiv, 'height',t);
		setTimeout( "maximisepanel('"+objDiv+"');",aniSpeed);
	}*/
}


function ShowHide(objID,imgref)
{
	var src = '/admin/resources/images/';
	if (YAHOO.util.Dom.getStyle(objID, 'display')=='block')
	{
	minimisepanel(objID);
	imgref.src= src + "widget_down.png";
	return
	}
	
	maximisepanel(objID);
	imgref.src= src + "widget_up.png";
}

function ShowHideEstados(objID,imgref)
{
	var src = '/admin/resources/images/';
	if (YAHOO.util.Dom.getStyle(objID, 'display')=='block')
	{
	minimisepanel(objID);
	imgref.src= src + "collapsible_plus.gif";
	return
	}
	
	maximisepanel(objID);
	imgref.src= src + "collapsible_minus.gif";
}

