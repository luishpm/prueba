<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.bea.com/servers/portal/tags/content" prefix="cm" %>
<%@ taglib uri="http://beehive.apache.org/netui/tags-html-1.0" prefix="netui" %>
<%@ taglib uri="http://www.bea.com/servers/portal/tags/netuix/render" prefix="render" %>
<cm:getNode id="pelicula" path="/WLP Repository/test/test3"/>


<link href="<%=request.getContextPath()%>/resources/css/explorer.css" type="text/css" rel="stylesheet">
<link href="<%=request.getContextPath()%>/resources/css/templates.css" type="text/css" rel="stylesheet">
<script src="<%=request.getContextPath()%>/resources/js/explorer.js"></script>
<script src="<%=request.getContextPath()%>/resources/js/prototype.js"></script>

<%
out.println(com.test.ContenidoHelper.renderizeContent(request, "pelicula1.xml", "pelicula1.xml", "template.fm"));
%>

<table>
	<tr>
		<td>
			<a target="_blank" href="<%=request.getContextPath()%>/portlets/pelicula/editPopup.jsp?contentId=pelicula1.xml" >Editar</a>
		</td>
	</tr>
</table>




