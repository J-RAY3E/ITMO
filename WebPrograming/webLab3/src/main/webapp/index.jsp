<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ page
        import="java.util.List, java.util.Collections, org.example.utilities.PointResult, org.example.beans.ResultsBean"
        %>

        <% // Prevent caching to avoid page reload when going back
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate" );
            response.setHeader("Pragma", "no-cache" ); response.setDateHeader("Expires", 0); %>

            <!DOCTYPE html>
            <html data-theme="dark">

            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
                <meta http-equiv="Pragma" content="no-cache">
                <meta http-equiv="Expires" content="0">
                <title>Check the position of your point</title>
                <link rel="stylesheet" type="text/css" href="css/index.css">
            </head>

            <body>

                <div id="student-header">
                    <p>Кантунья Жан Карло Саласар | P3220 | 1611</p>
                </div>

                <div class="header">
                    <h1 id="title">Check the position of your point</h1>
                </div>

                <div class="content">
                    <div class="main-grid">
                        <div class="image-container">
                            <svg id="miSVG" width="300" height="300" viewBox="-210 -210 420 420">
                                <!-- Axes -->
                                <line x1="-210" y1="0" x2="210" y2="0" stroke="#e0d6f0" stroke-width="1" />
                                <line x1="0" y1="-210" x2="0" y2="210" stroke="#e0d6f0" stroke-width="1" />

                                <!-- Numeric grid lines for 1,2,3,4,5,6,7 -->
                                <line x1="-210" y1="-30" x2="210" y2="-30" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="-60" x2="210" y2="-60" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="-90" x2="210" y2="-90" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="-120" x2="210" y2="-120" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="-150" x2="210" y2="-150" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="-180" x2="210" y2="-180" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="30" x2="210" y2="30" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="60" x2="210" y2="60" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="90" x2="210" y2="90" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="120" x2="210" y2="120" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="150" x2="210" y2="150" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-210" y1="180" x2="210" y2="180" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="30" y1="-210" x2="30" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="60" y1="-210" x2="60" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="90" y1="-210" x2="90" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="120" y1="-210" x2="120" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="150" y1="-210" x2="150" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="180" y1="-210" x2="180" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-30" y1="-210" x2="-30" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-60" y1="-210" x2="-60" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-90" y1="-210" x2="-90" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-120" y1="-210" x2="-120" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-150" y1="-210" x2="-150" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />
                                <line x1="-180" y1="-210" x2="-180" y2="210" stroke="#4a5568" stroke-dasharray="3,3"
                                    stroke-width="0.5" />

                                <!-- Numeric labels for grid (-7 to 7) -->
                                <text x="32" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">1</text>
                                <text x="62" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">2</text>
                                <text x="92" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">3</text>
                                <text x="122" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">4</text>
                                <text x="152" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">5</text>
                                <text x="182" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">6</text>
                                <text x="-28" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">-1</text>
                                <text x="-58" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">-2</text>
                                <text x="-88" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">-3</text>
                                <text x="-118" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">-4</text>
                                <text x="-148" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">-5</text>
                                <text x="-178" y="-5" font-size="16" fill="#94a3b8" text-anchor="middle">-6</text>
                                <text x="8" y="-27" font-size="16" fill="#94a3b8" text-anchor="middle">1</text>
                                <text x="8" y="-57" font-size="16" fill="#94a3b8" text-anchor="middle">2</text>
                                <text x="8" y="-87" font-size="16" fill="#94a3b8" text-anchor="middle">3</text>
                                <text x="8" y="-117" font-size="16" fill="#94a3b8" text-anchor="middle">4</text>
                                <text x="8" y="-147" font-size="16" fill="#94a3b8" text-anchor="middle">5</text>
                                <text x="8" y="-177" font-size="16" fill="#94a3b8" text-anchor="middle">6</text>
                                <text x="8" y="33" font-size="16" fill="#94a3b8" text-anchor="middle">-1</text>
                                <text x="8" y="63" font-size="16" fill="#94a3b8" text-anchor="middle">-2</text>
                                <text x="8" y="93" font-size="16" fill="#94a3b8" text-anchor="middle">-3</text>
                                <text x="8" y="123" font-size="16" fill="#94a3b8" text-anchor="middle">-4</text>
                                <text x="8" y="153" font-size="16" fill="#94a3b8" text-anchor="middle">-5</text>
                                <text x="8" y="183" font-size="16" fill="#94a3b8" text-anchor="middle">-6</text>

                                <!-- Axis labels -->
                                <text x="195" y="15" font-size="12" fill="#e0d6f0">X</text>
                                <text x="5" y="-195" font-size="12" fill="#e0d6f0">Y</text>
                                <!-- Legend -->
                                <g id="legend" transform="translate(-195, -195)">
                                    <rect x="0" y="0" width="60" height="35" fill="rgba(30, 41, 59, 0.9)"
                                        stroke="#475569" rx="3" />
                                    <rect x="5" y="8" width="10" height="10" fill="#a060f0" />
                                    <text x="18" y="16" font-size="9" fill="#a060f0" text-anchor="start">R</text>
                                    <rect x="5" y="21" width="10" height="10" fill="#ff6b9d" />
                                    <text x="18" y="29" font-size="9" fill="#ff6b9d" text-anchor="start">R/2</text>
                                </g>

                                <g id="rGridLines"></g>

                                <g id="areaGroup"></g>
                                <g id="pointsGroup"></g>
                            </svg>
                        </div>

                        <div id="histContainer" class="hist-container">
                            <div class="hist-header-bar">
                                <span>History</span>
                                <button type="button" id="flushHist" class="hist-flush-btn"
                                    onclick="clearHistory()">Clear History</button>
                            </div>
                            <table name="histTable" class="history-table">
                                <thead>
                                    <tr class="hist-header">
                                        <th>X</th>
                                        <th>Y</th>
                                        <th>R</th>
                                        <th>Result</th>
                                        <th>Date</th>
                                        <th>Exec Time (ms)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <% ResultsBean resultsBean=(ResultsBean) session.getAttribute("resultsBean");
                                        List<PointResult> history = (resultsBean != null) ? resultsBean.getResults() :
                                        null;
                                        if (history != null && !history.isEmpty()) {
                                        List<PointResult> reversedHistory = new java.util.ArrayList<>(history);
                                                Collections.reverse(reversedHistory);

                                                for (PointResult result : reversedHistory) {
                                                %>
                                                <tr>
                                                    <td>
                                                        <%= result.getFormattedX() %>
                                                    </td>
                                                    <td>
                                                        <%= result.getFormattedY() %>
                                                    </td>
                                                    <td>
                                                        <%= result.getFormattedR() %>
                                                    </td>
                                                    <td>
                                                        <%= result.isHit() ? "Hit" : "Miss" %>
                                                    </td>
                                                    <td>
                                                        <%= result.getAttemptTime() %>
                                                    </td>
                                                    <td>
                                                        <%= result.getExecutionTime() %>
                                                    </td>
                                                </tr>
                                                <% } } %>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <form id="form" class="form-group" method="GET" action="controllerS">
                    <input type="hidden" name="x" id="x_hidden_input">

                    <div name="x-selector">
                        <h3>Select X</h3>
                        <div class="buttons_group" id="x_buttons_container">
                            <% String[] xValues={"-5", "-4" , "-3" , "-2" , "-1" , "0" , "1" , "2" , "3" }; for (String
                                val : xValues) { %>
                                <button type="button" class="x-btn" data-value="<%= val %>" onclick="selectX(this)">
                                    <%= val %>
                                </button>
                                <% } %>
                        </div>
                        <span class="error-message" id="x-error"></span>
                    </div>

                    <div class="input-group">
                        <h3>Select Y</h3>
                        <label class="input-label">
                            <input type="text" name="y" id="y_input" placeholder="Enter Y value (-3 to 3)">
                            <span class="error-message" id="y-error"></span>
                        </label>
                    </div>

                    <div class="input-group">
                        <h3>Select R</h3>
                        <label class="input-label">
                            <select name="rad" id="r_input">
                                <option value="" disabled selected>Select R</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <span class="error-message" id="rad-error"></span>
                        </label>
                    </div>

                    <div class="button-group">
                        <button type="submit" class="form-button">Send</button>
                        <button type="reset" class="form-button">Clear</button>
                    </div>
                </form>

                <div id="coordsPloter"></div>

                <script src="./scrip.js"></script>
                <script>
                    window.serverHistory = [
            <%
            if (history != null && !history.isEmpty()) {
                        for (int i = 0; i < history.size(); i++) {
                    PointResult p = history.get(i);
            %>
                                { x: "<%= p.getX() %>", y: "<%= p.getY() %>", r: "<%= p.getR() %>", hit: <%= p.isHit() %> } <%= (i < history.size() - 1) ? "," : "" %>
            <%
                }
                    }
            %>
        ];
                </script>

            </body>

            </html>