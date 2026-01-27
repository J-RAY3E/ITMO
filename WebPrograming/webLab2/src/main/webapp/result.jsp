<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <% response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate" );
        response.setHeader("Pragma", "no-cache" ); response.setDateHeader("Expires", 0); String xStr=(String)
        request.getAttribute("x"); String yStr=(String) request.getAttribute("y"); String rStr=(String)
        request.getAttribute("r"); String hitResult=(String) request.getAttribute("hit"); String errorMessage=(String)
        request.getAttribute("error_message"); %>

        <!DOCTYPE html>
        <html data-theme="dark">

        <head>
            <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
            <meta http-equiv="Pragma" content="no-cache">
            <meta http-equiv="Expires" content="0">
            <title>Result</title>

            <style>
                body {
                    font-family: sans-serif;
                    background-color: #1e293b;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 20px;
                }

                .container {
                    background: #334155;
                    padding: 2rem;
                    border-radius: 10px;
                    margin-top: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                    max-width: 800px;
                    width: 100%;
                }

                .result-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                .result-table th,
                .result-table td {
                    border: 1px solid #475569;
                    padding: 12px;
                    text-align: left;
                }

                .result-table th {
                    background: #1e293b;
                    font-weight: 600;
                }

                .button {
                    display: inline-block;
                    background-color: #3b82f6;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 15px;
                    transition: all 0.2s;
                }

                .button:hover {
                    background-color: #2563eb;
                    transform: translateY(-2px);
                }

                .error-box {
                    background-color: #ef4444;
                    color: white;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 15px;
                }

                .svg-container {
                    text-align: center;
                    margin: 20px 0;
                    padding: 20px;
                    background: #0f172a;
                    border-radius: 8px;
                }

                h2 {
                    color: #3b82f6;
                    margin-bottom: 20px;
                }

                #coordsPloter {
                    position: fixed;
                    display: none;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 12px;
                    pointer-events: none;
                    z-index: 1000;
                }
            </style>
        </head>

        <body>

            <div class="container">
                <h2>Result</h2>

                <div class="svg-container">
                    <svg id="miSVG" width="300" height="300" viewBox="-210 -210 420 420">

                        <line x1="-210" y1="0" x2="210" y2="0" stroke="#e0d6f0" stroke-width="1" />
                        <line x1="0" y1="-210" x2="0" y2="210" stroke="#e0d6f0" stroke-width="1" />

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
                        <rect x="5" y="8" width="10" height="10" fill="#a060f0" />
                        <text x="18" y="16" font-size="9" fill="#a060f0" text-anchor="start">R</text>
                        <rect x="5" y="21" width="10" height="10" fill="#ff6b9d" />
                        <text x="18" y="29" font-size="9" fill="#ff6b9d" text-anchor="start">R/2</text>
                        </g>

                        <% if (rStr !=null && errorMessage==null) { try { double rVal=Double.parseDouble(rStr); double
                            s=30.0; double radius=rVal * s; double halfRadius=radius / 2.0; %>
                            <!-- R grid lines -->
                            <line x1="-210" y1="<%= radius %>" x2="210" y2="<%= radius %>" stroke="#a060f0"
                                stroke-dasharray="2,2" stroke-width="0.5" />
                            <line x1="-210" y1="<%= -radius %>" x2="210" y2="<%= -radius %>" stroke="#a060f0"
                                stroke-dasharray="2,2" stroke-width="0.5" />
                            <line x1="<%= radius %>" y1="-210" x2="<%= radius %>" y2="210" stroke="#a060f0"
                                stroke-dasharray="2,2" stroke-width="0.5" />
                            <line x1="<%= -radius %>" y1="-210" x2="<%= -radius %>" y2="210" stroke="#a060f0"
                                stroke-dasharray="2,2" stroke-width="0.5" />

                            <!-- R/2 grid lines -->
                            <line x1="-210" y1="<%= halfRadius %>" x2="210" y2="<%= halfRadius %>" stroke="#ff6b9d"
                                stroke-dasharray="2,2" stroke-width="0.5" />
                            <line x1="-210" y1="<%= -halfRadius %>" x2="210" y2="<%= -halfRadius %>" stroke="#ff6b9d"
                                stroke-dasharray="2,2" stroke-width="0.5" />
                            <line x1="<%= halfRadius %>" y1="-210" x2="<%= halfRadius %>" y2="210" stroke="#ff6b9d"
                                stroke-dasharray="2,2" stroke-width="0.5" />
                            <line x1="<%= -halfRadius %>" y1="-210" x2="<%= -halfRadius %>" y2="210" stroke="#ff6b9d"
                                stroke-dasharray="2,2" stroke-width="0.5" />

                            <!-- Area shapes -->
                            <path d="M 0 0 L<%= radius %> 0 A <%= radius %> <%= radius %> 0 0 0 0 <%= -radius %> Z"
                                fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6" />
                            <polygon points="0,0 <%= -halfRadius %>,0 0,<%= -radius %>" fill="#3b82f6"
                                fill-opacity="0.5" stroke="#3b82f6" />
                            <rect x="<%= -radius %>" y="0" width="<%= radius %>" height="<%= halfRadius %>"
                                fill="#3b82f6" fill-opacity="0.5" stroke="#3b82f6" />
                            <% } catch (Exception e) { } } %>

                                <% if (xStr !=null && yStr !=null) { try { double xVal=Double.parseDouble(xStr); double
                                    yVal=Double.parseDouble(yStr); double scale=30.0; double cx=xVal * scale; double
                                    cy=-yVal * scale; String color=(hitResult !=null && hitResult.equals("IN"))
                                    ? "#10b981" : "#ef4444" ; %>
                                    <circle cx="<%= cx %>" cy="<%= cy %>" r="4" fill="<%= color %>" stroke="#fff"
                                        stroke-width="1" />
                                    <% } catch (Exception e) { } } %>

                    </svg>
                </div>

                <% if (errorMessage !=null) { %>
                    <div class="error-box">
                        <h3>Processing Failed!</h3>
                        <p>⚠️ <%= errorMessage %>
                        </p>
                    </div>
                    <% } %>

                        <table class="result-table">
                            <tr>
                                <th>X Coordinate</th>
                                <td>
                                    <%= xStr !=null ? xStr : "N/A" %>
                                </td>
                            </tr>
                            <tr>
                                <th>Y Coordinate</th>
                                <td>
                                    <%= yStr !=null ? yStr : "N/A" %>
                                </td>
                            </tr>
                            <tr>
                                <th>R Parameter</th>
                                <td>
                                    <%= rStr !=null ? rStr : "N/A" %>
                                </td>
                            </tr>
                            <tr>
                                <th>Result</th>
                                <td>
                                    <%= hitResult !=null ? hitResult : "N/A" %>
                                </td>
                            </tr>
                            <tr>
                                <th>Execution Time</th>
                                <td>
                                    <%= request.getAttribute("execTime") !=null ? request.getAttribute("execTime")
                                        + " ms" : "N/A" %>
                                </td>
                            </tr>
                        </table>

                        <div id="coordsPloter"></div>

                        <script>
                            const svg = document.getElementById('miSVG');
                            const coordsPloter = document.getElementById('coordsPloter');

                            svg.addEventListener('mousemove', function (e) {
                                const svgRect = svg.getBoundingClientRect();
                                const svgX = ((e.clientX - svgRect.left - svgRect.width / 2) * 14 / svgRect.width).toFixed(2);
                                const svgY = (-(e.clientY - svgRect.top - svgRect.height / 2) * 14 / svgRect.height).toFixed(2);

                                coordsPloter.textContent = `X: ${svgX}, Y: ${svgY}`;
                                coordsPloter.style.display = 'block';
                                coordsPloter.style.left = (e.clientX + 15) + 'px';
                                coordsPloter.style.top = (e.clientY + 15) + 'px';
                            });

                            svg.addEventListener('mouseleave', function () {
                                coordsPloter.style.display = 'none';
                            });

                            function formatNumber(value) {
                                try {
                                    const num = parseFloat(value);
                                    const str = String(value);
                                    const parts = str.split('.');
                                    if (parts.length > 1 && parts[1].length > 5) {
                                        return num.toExponential(2);
                                    }
                                    if (Math.abs(num) >= 100000 || (Math.abs(num) < 0.00001 && num !== 0)) {
                                        return num.toExponential(2);
                                    }
                                    return value;
                                } catch (e) {
                                    return value;
                                }
                            }
                            const xCell = document.querySelector('.result-table tr:nth-child(1) td');
                            const yCell = document.querySelector('.result-table tr:nth-child(2) td');
                            const rCell = document.querySelector('.result-table tr:nth-child(3) td');

                            if (xCell && xCell.textContent.trim() !== 'N/A') {
                                xCell.textContent = formatNumber(xCell.textContent.trim());
                            }
                            if (yCell && yCell.textContent.trim() !== 'N/A') {
                                yCell.textContent = formatNumber(yCell.textContent.trim());
                            }
                            if (rCell && rCell.textContent.trim() !== 'N/A') {
                                rCell.textContent = formatNumber(rCell.textContent.trim());
                            }
                        </script>

                        <div style="text-align: center; margin-top: 20px;">
                            <a href="index.jsp" class="button">Go Back</a>
                        </div>
            </div>

        </body>

        </html>