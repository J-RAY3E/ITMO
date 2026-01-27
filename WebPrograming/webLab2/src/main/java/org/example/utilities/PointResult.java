package org.example.utilities;

public class PointResult {
    private String x;
    private String y;
    private String r;
    private boolean hit;
    private String attemptTime;
    private double executionTime;

    public PointResult(String x, String y, String r, boolean hit, String attemptTime, double executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.attemptTime = attemptTime;
        this.executionTime = executionTime;
    }

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public String getHitResult() {
        return hit ? "IN" : "OUT";
    }

    public String getAttemptTime() {
        return attemptTime;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    // Format numbers: use scientific notation if more than 5 decimal places or very large/small
    private String formatNumber(String value) {
        try {
            double num = Double.parseDouble(value);
            // Count decimal places
            String[] parts = value.split("\\.");
            if (parts.length > 1 && parts[1].length() > 5) {
                return String.format("%.2e", num);
            }
            // Use scientific notation for very large or very small numbers
            if (Math.abs(num) >= 100000 || (Math.abs(num) < 0.00001 && num != 0)) {
                return String.format("%.2e", num);
            }
            return value;
        } catch (NumberFormatException e) {
            return value;
        }
    }

    public String getFormattedX() {
        return formatNumber(x);
    }

    public String getFormattedY() {
        return formatNumber(y);
    }

    public String getFormattedR() {
        return formatNumber(r);
    }

}