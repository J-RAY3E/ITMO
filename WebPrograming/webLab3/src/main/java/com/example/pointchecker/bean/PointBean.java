package com.example.pointchecker.bean;

import jakarta.inject.Named;
import jakarta.enterprise.context.SessionScoped;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@Named("pointBean")
@SessionScoped
public class PointBean implements Serializable {

    @NotNull(message = "X coordinate is required")
    private Double x;

    @NotNull(message = "Y coordinate is required")
    private Double y;

    @NotNull(message = "Radius is required")
    private Double r = 1.0;

    // For canvas clicks
    private Double canvasX;
    private Double canvasY;

    public PointBean() {
    }

    // Getters and Setters
    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public Double getCanvasX() {
        return canvasX;
    }

    public void setCanvasX(Double canvasX) {
        this.canvasX = canvasX;
    }

    public Double getCanvasY() {
        return canvasY;
    }

    public void setCanvasY(Double canvasY) {
        this.canvasY = canvasY;
    }

    public void reset() {
        this.x = null;
        this.y = null;
        this.r = 1.0;
        this.canvasX = null;
        this.canvasY = null;
    }
}
