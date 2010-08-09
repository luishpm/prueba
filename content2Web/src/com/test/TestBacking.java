package com.test;

import javax.security.auth.login.LoginException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bea.jsptools.patterns.tree.TreeStateBean;
import com.bea.netuix.servlets.controls.content.backing.AbstractJspBacking;
import com.bea.p13n.security.Authentication;
import com.bea.portal.tools.content.NodeID;
import com.bea.portal.tools.portlet.orb.PortletORB;
import com.bea.portal.tools.resource.ResourceType;
import com.bea.portal.tools.ui.tree.ResourcePath;
import com.bea.portal.tools.ui.tree.TreeSelectListener;

/**
 * A backing file is a simple Java class implementing the JspBacking interface.
 * Backing files work in conjunction with JSPs. The JSPs allow the developer to code the presentation logic,
 * while the backing files allows the developer to code simple business logic. Backing files are always run before the JSPs.
 * A backing file has a lifecycle with four methods (see below). These methods are run 'in order' on all objects.
 * The developer may affect the underlying object from the <code>BackingContext</code>. The <code>BackingContext</code> should be
 * used from the backing file and the <code>PresentationContext</code> should be used from the JSPs.</p>
 */
public class TestBacking extends AbstractJspBacking {
	private static final long serialVersionUID = 1L;

	/**
	 * <p>This method is called once per request, as a place to do
	 * request-scoped initialization by implementing this method. This method is run on
	 * the window (book/page/portlet) even if the window is not currently on a selected page.</p>
	 *
	 * @param request HTTP request
	 * @param response HTTP response
	 */
	@Override
	public void init(HttpServletRequest request, HttpServletResponse response) {
		try {
			Authentication.login("weblogic", "weblogic", request, response);
		} catch (LoginException e) {
			e.printStackTrace();
		}

		TreeStateBean.getTreeStateBean(request);

		if(request.getParameter("contentNode")!=null){

			NodeID resourceID = new NodeID("{::content:node}path="+request.getParameter("contentNode"));
			PortletORB portletORB = PortletORB.getPortletORB(request, response);
			ResourceType resourceType = resourceID.getResourceType();
			ResourcePath resourcePath = new ResourcePath(new com.bea.portal.tools.resource.ResourceID[] { resourceID});
			((TreeSelectListener)portletORB.getBroadcastPortletHandle().narrow(TreeSelectListener.class)).selected(resourcePath, resourceType, resourceID);
		}
		super.init(request, response);

	}

	/**
	 * <p>The purpose of this method is to let an implementation process
	 * request data.</p>
	 *
	 * <p>This method should return <code>true</code> if it changes the
	 * window mode, window state, or the current page.  If the method returns true, 
	 * any caches are invalidated, and event processing is run on this control. 
	 *
	 * @param request HTTP request
	 * @param response HTTP response
	 * @return boolean true if the window mode, state, or current page were changed
	 */
	@Override
	public boolean handlePostbackData(HttpServletRequest request,
			HttpServletResponse response) {


		return super.handlePostbackData(request, response);
	}

	/**
	 * <p>This method is called before rendering the JSP that this backing file
	 * is associated with. This method will not be run if the book/page/portlet is
	 * not being rendered (displayed).
	 *
	 * <p>This method should return <code>true</code> to let the framework render
	 * the JSP. If this method returns <code>false</code>, the framework
	 * will not render the content JSP.</p>
	 * <p>Note: if you don't want the containing Window (book, page or portlet) to 
	 * render at all, call <code>setVisible(false)</code> on the backing context.
	 * @see com.bea.netuix.servlets.controls.BackingContext
	 * @see com.bea.netuix.servlets.controls.portlet.backing.PortletBackingContext
	 * @see com.bea.netuix.servlets.controls.page.BookBackingContext
	 * @see com.bea.netuix.servlets.controls.page.PageBackingContext
	 * @param request HTTP request
	 * @param response HTTP response
	 * @return boolean true if the content JSP should be rendered.
	 */
	@Override
	public boolean preRender(HttpServletRequest request,
			HttpServletResponse response) {


		return super.preRender(request, response);
	}

	/**
	 * <p>This method is called at the end of serving the request, after the JSP has rendered.</p>
	 */
	@Override
	public void dispose() {
		super.dispose();
	}

}