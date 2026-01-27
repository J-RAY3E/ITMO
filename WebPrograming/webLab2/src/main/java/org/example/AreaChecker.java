package org.example;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.example.utilities.PointResult;
import org.example.utilities.VerifyHit;
import org.example.beans.ResultsBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/areaCheckerS")
public class AreaChecker extends HttpServlet {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yy");

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    protected void processRequest(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        long time_start = System.nanoTime();

        if ("true".equals(req.getParameter("clear_history"))) {
            HttpSession session = req.getSession(false);
            if (session != null) {
                ResultsBean resultsBean = (ResultsBean) session.getAttribute("resultsBean");
                if (resultsBean != null) {
                    resultsBean.clearResults();
                }
            }

            resp.sendRedirect(req.getContextPath() + "/controllerS");
            return;
        }

        String xParam = req.getParameter("x");
        String yParam = req.getParameter("y");
        String rParam = req.getParameter("rad");
        String fromGraph = req.getParameter("from_graph"); // Check if request is from graph

        try {
            // Sanitize inputs: replace commas with dots
            if (xParam != null)
                xParam = xParam.replace(',', '.');
            if (yParam != null)
                yParam = yParam.replace(',', '.');
            if (rParam != null)
                rParam = rParam.replace(',', '.');

            if (xParam == null || yParam == null || rParam == null || xParam.isEmpty() || yParam.isEmpty()
                    || rParam.isEmpty()) {
                throw new IllegalArgumentException("Missing coordinates (X, Y, R).");
            }

            BigDecimal x = new BigDecimal(xParam);
            BigDecimal y = new BigDecimal(yParam);
            BigDecimal r = new BigDecimal(rParam);

            VerifyHit verifyHit = new VerifyHit();

            if (fromGraph == null || !fromGraph.trim().equalsIgnoreCase("true")) {
                verifyHit.validate(x, y, r);
            }

            long time_end = System.nanoTime();
            String execTime = String.format("%.3f", (time_end - time_start) / 1_000_000.0);
            boolean hit = verifyHit.pointchecker(x, y, r);
            String resultText = hit ? "IN" : "OUT";

            req.setAttribute("x", x.toString());
            req.setAttribute("y", y.toString());
            req.setAttribute("r", r.toString());
            req.setAttribute("hit", resultText);
            req.setAttribute("date", LocalDateTime.now().format(DATE_FORMATTER));
            req.setAttribute("execTime", execTime);

            // Create PointResult and store in session via ResultsBean
            PointResult pointResult = new PointResult(
                    x.toString(),
                    y.toString(),
                    r.toString(),
                    hit,
                    LocalDateTime.now().format(DATE_FORMATTER),
                    (time_end - time_start) / 1_000_000.0);

            HttpSession session = req.getSession(true);
            ResultsBean resultsBean = (ResultsBean) session.getAttribute("resultsBean");

            if (resultsBean == null) {
                resultsBean = new ResultsBean();
                session.setAttribute("resultsBean", resultsBean);
            }

            resultsBean.addResult(pointResult);

            req.getRequestDispatcher("/result.jsp").forward(req, resp);

        } catch (Exception e) {
            req.setAttribute("error_message", "ERROR: " + e.getMessage());

            req.setAttribute("x", xParam != null ? xParam : "N/A");
            req.setAttribute("y", yParam != null ? yParam : "N/A");
            req.setAttribute("r", rParam != null ? rParam : "N/A");
            req.setAttribute("hit", "FAILED");

            req.getRequestDispatcher("/result.jsp").forward(req, resp);
        }
    }
}