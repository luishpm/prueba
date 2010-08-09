package portlets.test.test.test2;

import javax.servlet.http.HttpSession;
import org.apache.beehive.netui.pageflow.PageFlowController;
import org.apache.beehive.netui.pageflow.Forward;
import org.apache.beehive.netui.pageflow.annotations.Jpf;

// Substitute with this annotation if nested pageflow
// @Jpf.Controller( nested=true )

@Jpf.Controller()
public class Test2 extends PageFlowController {
	private static final long serialVersionUID = 1L;

	@Jpf.Action(forwards = { @Jpf.Forward(name = "index", path = "test.jsp") })
	protected Forward begin() {
		return new Forward("index");
	}

	// Uncomment this block if nested pageflow
	/**
	@Jpf.Action(
	    forwards={
	       @Jpf.Forward(name="done", returnAction="NestedTemplateDone")
	    }
	)
	protected Forward done()
	{
		return new Forward("done");
	}
	 **/

	/**
	 * Callback that is invoked when this controller instance is created.
	 */
	protected void onCreate() {
	}

	/**
	 * Callback that is invoked when this controller instance is destroyed.
	 */
	protected void onDestroy(HttpSession session) {
	}
}