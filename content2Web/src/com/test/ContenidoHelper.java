package com.test;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletInputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import jwm.jdom.CDATA;
import jwm.jdom.Document;
import jwm.jdom.Element;
import jwm.jdom.input.SAXBuilder;
import jwm.jdom.output.XMLOutputter;

import org.apache.commons.collections.MultiHashMap;
import org.apache.commons.lang.StringEscapeUtils;
import org.w3c.dom.Text;
import org.xml.sax.InputSource;

import com.bea.content.Node;
import com.bea.content.manager.NodeOps;
import com.bea.content.manager.RepositoryManager;
import com.bea.content.manager.RepositoryManagerFactory;
import com.bea.content.virtual.WorkspaceOps;

import freemarker.cache.StringTemplateLoader;
import freemarker.ext.dom.NodeModel;
import freemarker.template.Configuration;
import freemarker.template.Template;

public class ContenidoHelper {
	private static RepositoryManager manager = null;            
    private static NodeOps nodeOps = null;
    private static WorkspaceOps workspaceOps = null; 
    public static RepositoryManager getManager(){
        if (manager == null) 
            try{
                manager = RepositoryManagerFactory.connect();
            }catch(Exception e){e.printStackTrace();}
        return manager;
    }
    public static NodeOps getNodeOps(){
        if (nodeOps == null)  nodeOps = getManager().getNodeOps();
        return nodeOps;
    }
    
    public static void saveToFile(HttpServletRequest request){
        String id = request.getParameter("__TelcelNodeId__");
        String xml = request.getParameter("__TelcelNodeContent__");
        try{
            SAXBuilder builder;
            Document root = null;
            try {
                builder = new SAXBuilder("org.apache.xerces.parsers.SAXParser");
                root = builder.build(new StringReader(xml));
            }catch(Exception ee){ 
                System.out.println("Exception building Document : " + ee);
            }
            
            List lista = root.getRootElement().getChildren();
            for (int i=0;i<lista.size(); i++){
                getData((Element)lista.get(i), request, "");
            }    
            StringWriter sw = new StringWriter();
            new XMLOutputter().output(root, sw);
            String xmlToSave = sw.toString();
            
            FileOutputStream fos = new FileOutputStream("/home/luishpm/tmp/contenido/contenidos/"+id);
    		Writer out = new OutputStreamWriter(fos, "UTF8");
    		out.write(xmlToSave);
    		out.close();
            
            
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    
    private static void getData(Element elemento, HttpServletRequest request, String prefix){
        String strRep = elemento.getAttributeValue("repetir");
        String tipo = elemento.getAttributeValue("tipo");
        if (strRep==null) strRep="no";
        if (tipo==null) tipo = "";
        boolean repetir = false;
        if (strRep.equals("si")) repetir=true;
        String httpName = prefix+elemento.getName()+"_"+elemento.getAttribute("index").getValue();
        if (elemento.getChildren()!=null && elemento.getChildren().size()>0){
            List lista = elemento.getChildren();
            for (int j=0;j<lista.size(); j++){
                getData((Element)lista.get(j), request, httpName+"_");
            }
        }else{
            String valor = request.getParameter(httpName);
            elemento.getContent().clear();
            /**
             * JOEL: Comenté esta línea para que reciba los valores del HTML, a ver si no me da lata después. Prueba
             */
            //if (!tipo.equals("libre")) valor = ContenidoHelper.HTMLEncode(valor);
            elemento.addContent(new CDATA(valor));
        }
    }
    
    public static String readFromFile(String path){
    	StringBuffer buffer = new StringBuffer();
    	try{
    		// Open the file that is the first 
    		// command line parameter
    		FileInputStream fstream = new FileInputStream(path);
    		// Get the object of DataInputStream
    		DataInputStream in = new DataInputStream(fstream);
    		BufferedReader br = new BufferedReader(new InputStreamReader(in,"UTF8"));
    		String strLine;
    		
    		//Read File Line By Line
    		while ((strLine = br.readLine()) != null)   {
    			// Print the content on the console
    			buffer.append(strLine);
    		}
    		//Close the input stream
    		in.close();
    	}catch (Exception e){//Catch exception if any
    		System.err.println("Error: " + e.getMessage());
    	}
    	return buffer.toString();
    }
    
    public static String renderizeContent(HttpServletRequest request, String id,String xmlId,String idTemplate) throws Exception{
        String html = null;
        try {
            Configuration cfg = new Configuration();
            StringTemplateLoader stl = new StringTemplateLoader();
            //Obtener template            
            stl.putTemplate("telcel", readFromFile("/home/luishpm/Oracle/bea103/user_projects/workspaces/default/content2Web/WebContent/portlets/pelicula/"+idTemplate));
            cfg.setTemplateLoader(stl);    
            Template temp = cfg.getTemplate("telcel");  
            StringWriter sw = new StringWriter();
            String xml = getContentById(id);
            if (xml==null){
                if (regeneraContenido(id))
                     xml = getContentById(id);
            }
            NodeModel nodeModel = NodeModel.parse(new InputSource(new StringReader(xml)));
            org.w3c.dom.Document root = (org.w3c.dom.Document) nodeModel.getNode();
            org.w3c.dom.Element cp = root.createElement("contextPath");
            Text tx = root.createTextNode(request.getContextPath());
            cp.appendChild(tx);
            root.getDocumentElement().appendChild(cp);
            temp.process(nodeModel.getChildNodes(), sw);
            html = sw.toString();
        }catch(Exception e){
            e.printStackTrace();
            throw e;
        }
        return html;
    }
    
    public static Element getElemento(String nombreABuscar, Element root, String prefix){
        Element e = null;
        List lista = root.getChildren();
        for (int i=0;i<lista.size();i++){
            Element elemento = (Element)lista.get(i);
            String index = elemento.getAttributeValue("index");
            String nombre = prefix + elemento.getName() + "_" + index;
            System.out.println(nombre);
            if (nombreABuscar.equals(nombre)){
                e = elemento;
                break;
            }
            if (elemento.getChildren()!= null && elemento.getChildren().size()>0){
                e = getElemento(nombreABuscar, elemento, nombre+"_");
                if (e != null) break;
            }
        }
        return e;
    }
    public static WorkspaceOps getWorkspaceOps(){
        if (workspaceOps == null)  workspaceOps = getManager().getWorkspaceOps();
        return workspaceOps;
    }
    public static int getLastIndexOfName(Element element, String nameOfChilds){
        int lastIndex = -1;
        List lista = element.getContent();
        for (int i=0;i<lista.size();i++){
            if (lista.get(i) instanceof Element){
                Element hijo = (Element) lista.get(i);
                if (hijo.getName().equals(nameOfChilds)) lastIndex = i;
            }
        }
        return lastIndex;
    }
    public static Element getNextElement(Element elemento){
        Element next = null;
        List lista = elemento.getParentElement().getChildren(elemento.getName());
        for (int i=0;i<lista.size();i++){
            Element hermano = (Element) lista.get(i);
            if (hermano.equals(elemento)){
                if (i<lista.size()-1) next = (Element) lista.get(i+1);
                break;
            }
        }
        return next;
    }
    public static Element getPreviousElement(Element elemento){
        Element previous = null;
        List lista = elemento.getParentElement().getChildren(elemento.getName());
        for (int i=0;i<lista.size();i++){
            Element hermano = (Element) lista.get(i);
            if (hermano.equals(elemento)){
                if (i>0) previous = (Element) lista.get(i-1);
                break;
            }
        }
        return previous;
    }
    public static int getNumberOfElements(Element elemento){
        return elemento.getParentElement().getChildren(elemento.getName()).size();
    }
    public static String getHTMLfromXML(String xml, HttpServletRequest request, StringWriter xmlWriterOut, List editores){
        SAXBuilder builder;
        Document root = null;
        String html = "";
        try {
            builder = new SAXBuilder("org.apache.xerces.parsers.SAXParser");
            StringReader sr = new StringReader(xml);
            root = builder.build(sr);
            Element rootElement = root.getRootElement();
            if(request!=null){
            String comando = request.getParameter("__TelcelComando__");
            if (comando != null){
                String nombreDelElemento = request.getParameter("__TelcelElemento__");            
                if (nombreDelElemento != null){
                    Element elemento = getElemento(nombreDelElemento, rootElement,"");
                    if (comando.equals("nuevo")){
                        Element nuevoElemento = (Element) elemento.clone();
                        nuevoElemento.removeAttribute("index");
                        int index = getLastIndexOfName(elemento.getParentElement(), elemento.getName());
                        elemento.getParentElement().addContent(index + 1, nuevoElemento);
                    }else  if (comando.equals("eliminar")){
                        if (getNumberOfElements(elemento)>1)
                            elemento.getParentElement().removeContent(elemento);
                    }else  if (comando.equals("moverArriba")){
                        Element previous = getPreviousElement(elemento);
                        if (previous != null){
                            int index = elemento.getAttribute("index").getIntValue();
                            elemento.setAttribute("index",String.valueOf(index - 1));
                            previous.setAttribute("index",String.valueOf(index));
                        }
                    }else  if (comando.equals("moverAbajo")){
                        Element next = getNextElement(elemento);
                        if (next != null){
                            int index = elemento.getAttribute("index").getIntValue();
                            elemento.setAttribute("index",String.valueOf(index + 1));
                            next.setAttribute("index",String.valueOf(index));
                        }
                    }

                }
            }
            
            }
            MultiHashMap nombres = new MultiHashMap();        
            html = "<table width='100%'>";
            List lista = rootElement.getChildren();
            for (int i=0;i<lista.size();i++){
                Element elemento = (Element)lista.get(i);
                html += getHTML(elemento, request, "", "", nombres, editores);
            }
            html += "</table>";
            
            System.out.println(html);
            
            new XMLOutputter().output(root, xmlWriterOut);
        
        }catch (Exception e){
            System.out.println("Error: "+e.getMessage());
            e.printStackTrace();
        }
        return html;
    }
    
    public static String boton(String pathImagen, String title, String onclick, String onmouseover, String onmouseout){
        String html = null;
        html =  "<div style='width: 23px; float: left;'>"+
                    "<a href='javascript:void(0)' class='button' title='"+title+"' onclick=\""+onclick+"\" onmouseover=\""+onmouseover+"\" onmouseout=\""+onmouseout+"\">"+
                        "<span unselectable='on' class='norm' onmouseover=\"className='over'\" onmouseout=\"className='norm'\" onmousedown=\"className='push'\" onmouseup=\"className='over'\">"+
                            "<img class='button' src='"+pathImagen+"'>"+
                        "</span>"+
                    "</a>"+
                "</div>";
        return html;
    }
    public static String botonConLabel(String pathImagen, String label, String onclick, String onmouseover, String onmouseout){
        String html = null;
        html =  "<div style='float: left;'>"+
                    "<a href='javascript:void(0)' class='button' onclick=\""+onclick+"\" onmouseover=\""+onmouseover+"\" onmouseout=\""+onmouseout+"\">"+
                        "<span class='norm' onmouseover=\"className='over'\" onmouseout=\"className='norm'\" onmousedown=\"className='push'\" onmouseup=\"className='over'\">"+
                            "<table><tr><td>"+
                                "<img class='button' src='"+pathImagen+"'>"+
                            "</td><td>"+label+"</td><td style='width:5px;'></td></tr></table>"+
                        "</span>"+
                    "</a>"+
                "</div>";
        return html;
    }
    public static String repetible(String nombre, Element elemento, HttpServletRequest request){
        String btnNuevo = boton(request.getContextPath()+"/resources/images/new.png", "","exeComando('nuevo')","","");
        String btnMoveDown = boton(request.getContextPath()+"/resources/images/move_down.png", "","exeComando('moverAbajo')","","");
        String btnMoveUp = boton(request.getContextPath()+"/resources/images/move_up.png", "","exeComando('moverArriba')","","");
        String btnDelete = boton(request.getContextPath()+"/resources/images/deletecontent.png", "","exeComando('eliminar')","","");
        if (getNumberOfElements(elemento)==1){
            btnMoveDown = "<img src='"+request.getContextPath()+"/resources/images/move_down_in.png'>";
            btnMoveUp = "<img src='"+request.getContextPath()+"/resources/images/move_up_in.png'>";
            btnDelete = "<img src='"+request.getContextPath()+"/resources/images/deletecontent_in.png'>";
        }else{
            if (getPreviousElement(elemento)==null)
                btnMoveUp = "<img src='"+request.getContextPath()+"/resources/images/move_up_in.png'>";
            if (getNextElement(elemento)==null)
                btnMoveDown = "<img src='"+request.getContextPath()+"/resources/images/move_down_in.png'>";
        }
        String html="<td style='vertical-align: top; width: 25px;' id='bRep"+nombre+"'>"+
                        boton(request.getContextPath()+"/resources/images/xmledit_add.png", "","","showToolBarXml(this, true,'"+nombre+"'); setTimeToolBarXml(false);","setTimeToolBarXml(true);")+
                        "<div id='div"+nombre+"' style='display:none'>"+
                            "<table onclick='showToolBarXml(null,false)' onmouseover='setTimeToolBarXml(false)' onmouseout='setTimeToolBarXml(true)' cellpadding='0' cellspacing='0'>" +
                                "<tr>"+
                                    "<td>"+btnDelete+"</td>"+
                                    "<td>"+btnMoveUp+"</td>"+
                                    "<td>"+btnMoveDown+"</td>"+
                                    "<td>"+btnNuevo+"</td>"+
                                "</tr>"+
                            "</table>"+
                        "</div>"+
                    "</td>";
        return html;
    }
    public static int getIndexOfElement(String nombre, MultiHashMap nombres){
        int index = 0;
        if (nombres.containsKey(nombre)){
            List lista = (List) nombres.get(nombre);
            index = lista.size();
        }
        nombres.put(nombre, "");
        return index;
    }
    
    public static String getHTML(Element elemento, HttpServletRequest request, String prefix, String oldPrefix, MultiHashMap nombres, List editores){
        String texto    = elemento.getText();
        String label    = elemento.getAttributeValue("label");
        String strRep   = elemento.getAttributeValue("repetir");
        String tipo     = elemento.getAttributeValue("tipo");
        String oldIndex = elemento.getAttributeValue("index");
        
        boolean repetir = false;
        if (strRep==null) strRep="no";
        if (label==null) label = elemento.getName();
        if (oldIndex == null) oldIndex = "";
        if (strRep.equals("si")) repetir=true;
        if (tipo == null) tipo = "";
        
        String html = "";
        int index = getIndexOfElement(elemento.getName(), nombres);
        String nombre = prefix + elemento.getName() + "_" + index;
        String oldNombre = oldPrefix + elemento.getName() + "_" + oldIndex;
        String valor = request.getParameter(oldNombre);
        
        if (valor!=null){
            if (!tipo.equals("libre"))
                texto = HTMLEncode(valor);
            else 
                texto = valor;
        }
        elemento.setAttribute("index", String.valueOf(index));
        html = "<tr>";
        html+="<td width='10%' align='right' nowrap>"+label+":</td>";
        List hijos = elemento.getChildren();
        if (hijos!=null && hijos.size()>0){
            MultiHashMap nombresHijos = new MultiHashMap();
            html+="<td>"+
                    "<input type='hidden' name='"+nombre+"'>"+
                    "<table width='100%' style='border: 1px #AAAAAA solid'>";
            for (int i=0;i<hijos.size();i++){
                Element hijo = (Element)hijos.get(i);
                html+=getHTML(hijo,request, nombre+"_", oldNombre+"_", nombresHijos, editores);
            }
            html += "</table>"+
                  "</td>";
        }else{
            elemento.setText("");
            if (tipo==null) tipo = "";
            if (tipo.equals("texto")){
                html += "<td><textarea class='textXML' name='"+nombre+"'>"+texto+"</textarea></td>";
                //html += "<td><input class='textXML' name='"+nombre+"' value=\""+texto+"\"></td>";
            }else if (tipo.equals("imagen")){
                html += "<td>"+
                            "<table width='100%'>"+
                                "<tr>"+
                                    "<td width='100%'><textarea class='textXML' name='"+nombre+"' id='"+nombre+"'>"+texto+"</textarea></td>"+
                                    "<td>"+boton(request.getContextPath()+"/resources/images/preview.png", "","openImageExplorer('"+nombre+"')","","")+"</td>"+
                                "</tr>"+
                            "</table>"+
                        "</td>";
                //html += "<td><input class='textXML' type='text' name='"+nombre+"' value='"+texto+"'></td>";
            }else if (tipo.equals("libre")){
                editores.add(nombre);
//                FCKeditor editor = new FCKeditor(request,nombre,"100%","200","libreXml",texto);
//                html += "<td>"+
//                            editor.create()+
//                        "</td>";
            }
        }
        if (repetir) html += repetible(nombre, elemento, request);
        html += "</tr>";
        return html;
    }
    
    public static String getContentByPath(String nodePath) throws Exception{
        Node node = getNodeOps().getNode(nodePath);
        int size = node.getProperty("file").getValue().getBinaryValue().getSize();
        InputStream in = node.getPropertyBytes(node.getProperty("file").getId());
        byte buff[] = new byte[size];
        in.read(buff,0,size);
        in.close();
        return new String(buff);
    }
    
    public static String getContentById(String id) throws Exception{
        String contenido = null;
        try{
            return readFromFile("/home/luishpm/tmp/contenido/contenidos/"+id);
        }catch(Exception e){
            System.out.println("Error al obtener el contenido del nodo "+id+": "+e.getMessage());
        }
        return contenido;
    }
    
    public static String HTMLEncode(String txt) {
		return StringEscapeUtils.escapeHtml(txt);
	}
    public static String listToString(List lista) {
        String str="";
        for (int i=0;i<lista.size(); i++){
            if (i>0) str+=",";
            str += (String)lista.get(i);
        }
        return str;
    }
    public static boolean regeneraContenido(String id){
        boolean ok = false;
        String xml = "";
        try{
            xml = readFromFile("/home/luishpm/tmp/contenido/contenidos"+id);
            ok = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return ok;
    }
    
    
    public static String menuContextualImg(String label, String srcImg, String funcion){
        String html = "<div onclick="+funcion+" class='menu' onmouseover=\"this.className='menuHover'\" onmouseout=\"this.className='menu'\">"+
                "    <table cellpadding='0' cellspacing='0'>"+
                "        <tr>"+
                "            <td width='26'>&nbsp;<img src='"+srcImg+"'></td>"+
                "            <td>"+label+"</td>"+
                "        </tr>"+
                "    </table>"+
                "</div>";
        return html;
    }
    
    public static String menuSeparador(){
        return "<div class='separadorMenu'></div>";
    }
	
    
    
    
    
    
    public static String matchXmlData(String xmlBase, String xmlData){
        String newXml = null;
        try {
            Document rootBase = null, rootData=null;
            SAXBuilder builder = new SAXBuilder("org.apache.xerces.parsers.SAXParser");
            xmlBase = "<TelcelXML>"+xmlBase+"</TelcelXML>";
            xmlData = "<TelcelXML>"+xmlData+"</TelcelXML>";
            rootBase = builder.build(new StringReader(xmlBase));
            rootData = builder.build(new StringReader(xmlData));
            Element base = rootBase.getRootElement();
            Element data = rootData.getRootElement();
            match(base, data); 
            StringWriter xmlWriterOut = new StringWriter();
            new XMLOutputter().output(rootBase, xmlWriterOut);
            newXml = xmlWriterOut.toString();
        }catch (Exception e){
            e.printStackTrace();
        }
        return newXml;
    }
    public static void match(Element base, Element data){
        Object lista[] = (Object []) base.getChildren().toArray();
        for (int i = 0; i<lista.length; i++){
            Element nodoBase = (Element) lista[i];
            Object nodosData[] = (Object []) data.getChildren(nodoBase.getName()).toArray();
            for (int j=0;j<nodosData.length; j++){
                Element nodoData = (Element) nodosData[j];
                Element nodoAdd = null;
                if (nodoBase.getChildren() != null && nodoBase.getChildren().size()>0){
                    nodoAdd = (Element) nodoBase.clone();
                    match(nodoAdd, nodoData);
                }else{
                    nodoAdd = (Element) nodoData.clone();
                }
                int index = getLastIndexOfName(base, nodoBase.getName())+1;
                if (j==0){
                    base.removeChild(nodoBase.getName());
                    index--;
                }
                base.addContent(index, nodoAdd);
            }
        }
    }
    
    public static void main(String[] args) throws Exception {
    	String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<TelcelXML><contenido tipo=\"texto\" label=\"titulo\"/> "+
"<contenido tipo=\"texto\" label=\"sinopsis\"/>"+
"<contenido tipo=\"texto\" label=\"director\"/>"+
"<contenido tipo=\"texto\" label=\"actores\"/>"+
"<imagen tipo=\"imagen\" label=\"Imagen de titulo\"/></TelcelXML>" ;
    			
    	StringWriter sw = new StringWriter();
    	
    	System.out.println(getHTMLfromXML(xml,request, sw, new ArrayList()));
    	
    	
    	System.out.println(sw);
    	System.out.println(renderizeContent(request, "pelicula1.xml", "pelicula1.xml", "template.fm"));
//    			System.out.println(matchXmlData(xml,xml));
	}
    
	public static String main(HttpServletRequest request) {
		String xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<TelcelXML>\r\n<titulo tipo=\"texto\" label=\"Titulo\" index=\"0\"><![CDATA[tit123]]></titulo>\r\n<imagen tipo=\"imagen\" label=\"Imagen de titulo\" index=\"0\"><![CDATA[img123]]></imagen>\r\n<parrafo repetir=\"si\" label=\"Parrafo\" index=\"0\">\r\n\t<titulo tipo=\"texto\" label=\"Titulo\" index=\"0\"><![CDATA[123]]></titulo>\r\n\t<imagen tipo=\"imagen\" label=\"Imagen de parrafo\" index=\"0\"><![CDATA[123]]></imagen>\r\n\t<contenido tipo=\"texto\" label=\"Contenido\" index=\"0\"><![CDATA[123]]></contenido>\r\n\t<pie tipo=\"texto\" label=\"Pie de parrafo\" index=\"0\"><![CDATA[123]]></pie>\r\n</parrafo><parrafo repetir=\"si\" label=\"Parrafo\" index=\"1\">\r\n\t<titulo tipo=\"texto\" label=\"Titulo\" index=\"0\"><![CDATA[234]]></titulo>\r\n\t<imagen tipo=\"imagen\" label=\"Imagen de parrafo\" index=\"0\"><![CDATA[234]]></imagen>\r\n\t<contenido tipo=\"texto\" label=\"Contenido\" index=\"0\"><![CDATA[234]]></contenido>\r\n\t<pie tipo=\"texto\" label=\"Pie de parrafo\" index=\"0\"><![CDATA[234]]></pie>\r\n</parrafo>\r\n\r\n</TelcelXML>\r\n";
		
		
		return getHTMLfromXML(xml,request, new StringWriter(), new ArrayList());
	}
	
	private static HttpServletRequest request = new HttpServletRequest(){

		@Override
		public String getAuthType() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getContextPath() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Cookie[] getCookies() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public long getDateHeader(String name) {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public String getHeader(String name) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Enumeration getHeaderNames() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Enumeration getHeaders(String name) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int getIntHeader(String name) {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public String getMethod() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getPathInfo() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getPathTranslated() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getQueryString() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getRemoteUser() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getRequestURI() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public StringBuffer getRequestURL() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getRequestedSessionId() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getServletPath() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public HttpSession getSession() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public HttpSession getSession(boolean create) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Principal getUserPrincipal() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public boolean isRequestedSessionIdFromCookie() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isRequestedSessionIdFromURL() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isRequestedSessionIdFromUrl() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isRequestedSessionIdValid() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isUserInRole(String role) {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public Object getAttribute(String name) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Enumeration getAttributeNames() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getCharacterEncoding() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int getContentLength() {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public String getContentType() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public ServletInputStream getInputStream() throws IOException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getLocalAddr() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getLocalName() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int getLocalPort() {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public Locale getLocale() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Enumeration getLocales() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getParameter(String name) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Map getParameterMap() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Enumeration getParameterNames() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String[] getParameterValues(String name) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getProtocol() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public BufferedReader getReader() throws IOException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getRealPath(String path) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getRemoteAddr() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getRemoteHost() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int getRemotePort() {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public RequestDispatcher getRequestDispatcher(String path) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getScheme() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public String getServerName() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public int getServerPort() {
			// TODO Auto-generated method stub
			return 0;
		}

		@Override
		public boolean isSecure() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public void removeAttribute(String name) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void setAttribute(String name, Object o) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void setCharacterEncoding(String env)
				throws UnsupportedEncodingException {
			// TODO Auto-generated method stub
			
		}};
}
