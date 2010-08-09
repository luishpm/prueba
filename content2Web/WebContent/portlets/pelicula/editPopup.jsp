<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<link href="<%=request.getContextPath()%>/resources/css/explorer.css" type="text/css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/resources/css/templates.css" type="text/css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/resources/js/explorer.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/prototype.js"></script>

<%
String nodeContent = com.test.ContenidoHelper.readFromFile("/home/luishpm/tmp/contenido/contenidos/"+request.getParameter("contentId"));
java.io.StringWriter sw = new java.io.StringWriter();
java.util.List editores = new java.util.ArrayList();
%>


<div id="toolBarXml" style='display:none' class='toolbarElementos'></div>
    <table cellpadding="0" cellspacing="0" width="100%" height="100%">
        <tr> 
            <td align='center' valign="top">
                <form action="plantilla.jsp" style="height:100%; margin-bottom: 0" id="formaSave" name="formaSave" method="post">
                    <input type="hidden" name="__TelcelNodeId__" value="pelicula1.xml">
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
        <tr>
        	<td>
        		<a href="#" onclick="saveXmlData(false);return false;">Guardar</a>
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
        var url = "<%=request.getContextPath()%>/portlets/pelicula/saveToUcm.jsp";
        new Ajax.Request(url,
            {   parameters : Form.serialize($("formaSave")),
                onComplete:function (resp){
                    parent.showLoading(false);
                    if (salirAfterSave)
                        parent.salirDelEditor();
                    $('htmlOfXml').innerHtml = resp.responseText;
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