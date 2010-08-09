<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.bea.com/servers/portal/tags/content" prefix="cm" %>
<%@ taglib uri="http://beehive.apache.org/netui/tags-html-1.0" prefix="netui" %>
<%@ taglib uri="http://www.bea.com/servers/portal/tags/netuix/render" prefix="render" %>
<cm:getNode id="pelicula" path="/WLP Repository/test/test3"/>


<link href="<%=request.getContextPath()%>/resources/css/explorer.css" type="text/css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/resources/css/templates.css" type="text/css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/resources/js/explorer.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/prototype.js"></script>

<table >
	<tr>
		<td colspan="2">
			<h1>
				<cm:getProperty node="<%=pelicula%>" name="titulo"/>
			</h1>
		</td>
	</tr>
	<tr>
		<td>
			<img width="150" src="http://192.168.10.134:7001/content2Web/ShowBinary?nodePath=/WLP Repository/test/test3&propertyName=imagen">
		</td>
		<td>
			<b> Sinopsis:</b> <cm:getProperty node="<%=pelicula%>" name="sinopsis"/>
			<br/><br/>
			<b>Director: </b><cm:getProperty node="<%=pelicula%>" name="director"/>
			<br/><br/>
			<b>Actores: </b><cm:getProperty node="<%=pelicula%>" name="actores"/>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			
			<render:pageUrl pageLabel="content_portal_page_3" template="contenido" var="contenidoUrl">
				<render:param name="contentNode" value="/WLP Repository/test/test2"></render:param>
			</render:pageUrl>	
			
			<a href="${contenidoUrl }" target="_blank">Editar</a>
		</td>
	</tr>
</table>


<%
String nodeContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<TelcelXML>\r\n<titulo tipo=\"texto\" label=\"Titulo\" index=\"0\"><![CDATA[tit123]]></titulo>\r\n<imagen tipo=\"imagen\" label=\"Imagen de titulo\" index=\"0\"><![CDATA[img123]]></imagen>\r\n<parrafo repetir=\"si\" label=\"Parrafo\" index=\"0\">\r\n\t<titulo tipo=\"texto\" label=\"Titulo\" index=\"0\"><![CDATA[123]]></titulo>\r\n\t<imagen tipo=\"imagen\" label=\"Imagen de parrafo\" index=\"0\"><![CDATA[123]]></imagen>\r\n\t<contenido tipo=\"texto\" label=\"Contenido\" index=\"0\"><![CDATA[123]]></contenido>\r\n\t<pie tipo=\"texto\" label=\"Pie de parrafo\" index=\"0\"><![CDATA[123]]></pie>\r\n</parrafo><parrafo repetir=\"si\" label=\"Parrafo\" index=\"1\">\r\n\t<titulo tipo=\"texto\" label=\"Titulo\" index=\"0\"><![CDATA[234]]></titulo>\r\n\t<imagen tipo=\"imagen\" label=\"Imagen de parrafo\" index=\"0\"><![CDATA[234]]></imagen>\r\n\t<contenido tipo=\"texto\" label=\"Contenido\" index=\"0\"><![CDATA[234]]></contenido>\r\n\t<pie tipo=\"texto\" label=\"Pie de parrafo\" index=\"0\"><![CDATA[234]]></pie>\r\n</parrafo>\r\n\r\n</TelcelXML>\r\n";
java.io.StringWriter sw = new java.io.StringWriter();
java.util.List editores = new java.util.ArrayList();
%>
<div id="toolBarXml" style='display:none' class='toolbarElementos'></div>
    <table cellpadding="0" cellspacing="0" width="100%" height="100%">
        <tr> 
            <td align='center' valign="top">
                <form action="plantilla.jsp" style="height:100%; margin-bottom: 0" id="formaSave" name="formaSave" method="post">
                    <input type="hidden" name="__TelcelNodeId__" value="">
                    <input type="hidden" name="__TelcelElemento__" id="__TelcelElemento__">
                    <input type="hidden" name="__TelcelComando__" id="__TelcelComando__">
                    <input type="hidden" id="__idText__">
                    <table bgcolor="#f8f8f8" width="100%" height="100%">
                        <tr>
                            <td>
                                <div style="height:100%; width:100%;" id="htmlOfXml">
                                    <%= com.test.ContenidoHelper.getHTMLfromXML(nodeContent, request, sw, editores) %>
                                    <textarea rows="0" name="__TelcelNodeContent__" style="display:none"><%=sw%></textarea>
                                    <input type="hidden" id="editores" value="<%=com.test.ContenidoHelper.listToString(editores)%>">
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </td>
        </tr>
    </table>
    <iframe id='_hideSelect' class="hideSelect"></iframe>
    <div id='_overlay' class="overlay"></div>
    <div id='_load' class="load"><img src="<%=request.getContextPath()%>/resources/images/saving.gif" /></div>

<script>
    function saveXmlData(salirAfterSave){
        var evalue = document.getElementById("editores").value;
        if (evalue.replace(/^\s+|\s+$/g, "") != ""){
            var editores = evalue.split(",");
            for (i=0;i<editores.length;i++){
                var fck = FCKeditorAPI.GetInstance(editores[i]);
                $(editores[i]).value = fck.GetXHTML(true);
            }
        }
        var url = "<%=request.getContextPath()%>/contenidos/saveXmlData.do";
        new Ajax.Request(url,
            {   parameters : Form.serialize($("formaSave")),
                onComplete:function (resp){
                    parent.showLoading(false);
                    if (salirAfterSave)
                        parent.salirDelEditor();
                    //var respuesta = resp.responseText.replace(/^\s+|\s+$/g, "");
                },
                onFailure: function (resp){
                    alert('Error al guardar los datos...');
                }
            });
    }
    function exeComando(comando){
        $("__TelcelComando__").value = comando;
        cursor_wait();
        var evalue = document.getElementById("editores").value;
        if (evalue.replace(/^\s+|\s+$/g, "") != ""){
            var editores = evalue.split(",");
            for (i=0;i<editores.length;i++){
                var fck = FCKeditorAPI.GetInstance(editores[i]);
                $(editores[i]).value = fck.GetXHTML(true);
            }
        }
        var url = "<%=request.getContextPath()%>/portlets/pelicula/getHTMLfromXML.jsp";
        new Ajax.Updater('htmlOfXml', url,
            {   parameters : Form.serialize($("formaSave")),
                onComplete:function (resp){
                    cursor_clear();
                },
                onFailure: function (resp){
                    alert('Error al guardar los datos...');
                    cursor_clear();
                }
            });
    }
    function showToolBarXml(a, show, nombre){
        if (show){
            var nomToolBar = "div"+nombre;
            var posX = findPosX(a);
            var posY = findPosY(a);
            $("toolBarXml").innerHTML = $(nomToolBar).innerHTML;
            $("toolBarXml").style.left = (posX-80)+"px";
            $("toolBarXml").style.top = (posY+15)+"px";
            $("toolBarXml").style.display = 'block';
            $("__TelcelElemento__").value = nombre;
            
        }else $("toolBarXml").style.display = 'none';
    }
    
    function setTimeToolBarXml(setTimer){
        if (setTimer) {
            buttonTimer = setTimeout("showToolBarXml(null,false)", 1500);
        }else{
            if (buttonTimer!=null)
                clearTimeout(buttonTimer);
        }
    }
    function openImageExplorer(id){
        $('__idText__').value=id;
        var w = window.open('<%=request.getContextPath()%>/catalogos/imagenes/ImagenesController.jpf?dirBase=/imagenes/contenido','img',' width=900, height=500, status=yes');
        w.focus();
    }
    function setImagePath(path){
        $($('__idText__').value).value = path;
    }
</script>

