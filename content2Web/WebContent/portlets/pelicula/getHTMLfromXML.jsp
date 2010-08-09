<%@ page language="java" contentType="text/html;charset=UTF-8"%>
<%@ page import="com.test.ContenidoHelper"%>
<%@ page import="org.apache.commons.lang.StringEscapeUtils"%>
<%@ page import="jwm.jdom.Document"%>
<%@ page import="jwm.jdom.Element"%>
<%@ page import="jwm.jdom.input.SAXBuilder"%>
<%@ page import="jwm.jdom.output.XMLOutputter"%>
<%
    response.setContentType("text/plain");
    String nodeContent = request.getParameter("__TelcelNodeContent__");
    java.io.StringWriter sw = new java.io.StringWriter();
    java.util.List editores = new java.util.ArrayList();
    out.write(ContenidoHelper.getHTMLfromXML(nodeContent, request, sw, editores));
%>
<textarea rows="0" name="__TelcelNodeContent__" style="display:none"><%=sw%></textarea>
<input type="hidden" id="editores" value="<%=ContenidoHelper.listToString(editores)%>">