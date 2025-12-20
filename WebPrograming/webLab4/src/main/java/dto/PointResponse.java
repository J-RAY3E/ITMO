package dto;

import java.io.Serializable;

public class PointResponse implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String timestamp;
    private long executionTime;

    public PointResponse() {
    }

    public PointResponse(double x, double y, double r, boolean hit, String timestamp, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
        this.timestamp = timestamp;
        this.executionTime = executionTime;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }
}
