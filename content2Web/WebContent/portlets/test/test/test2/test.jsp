<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://www.bea.com/servers/portal/tags/netuix/render" prefix="render" %>


asdf
<render:customEventUrl forcedAmpForm="false" eventName="com.bea.portal.tools.ui.tree.TreeSelectListener#selected;resourceType=::content:node" var="customEventUrl" >
	<render:param name="node">test</render:param>
</render:customEventUrl>

<%=customEventUrl %>

<script type="text/javascript">
  var fireMyEvent = function() { 
    var paXhr = new bea.wlp.disc.io.XMLHttpRequest();
    paXhr.open("GET", "<%=customEventUrl%>");
    paXhr.send();
  }
</script>
<input type="button" onclick="fireMyEvent()" value="Fire Event"/>


<%
%>
