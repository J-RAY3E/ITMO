package com.example.pointchecker.bean;

import com.example.pointchecker.dao.PointResultDAO;
import com.example.pointchecker.entity.PointResult;
import com.example.pointchecker.util.AreaChecker;

import jakarta.annotation.PostConstruct;
import jakarta.faces.application.FacesMessage;
import jakarta.inject.Named;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.faces.context.FacesContext;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Named("resultsBean")
@ApplicationScoped
public class ResultsBean implements Serializable {

    private PointResultDAO dao;
    private List<PointResult> results;

    @Inject
    private PointBean pointBean;

    @PostConstruct
    public void init() {
        dao = new PointResultDAO();
        loadResults();
    }

    private void loadResults() {
        try {
            results = dao.findAll();
        } catch (Exception e) {
            results = new ArrayList<>();
            System.err.println("Error loading results: " + e.getMessage());
        }
    }

    public void checkPoint() {
        if (pointBean.getX() == null || pointBean.getY() == null || pointBean.getR() == null) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", "All coordinates must be specified"));
            return;
        }

        double x = pointBean.getX();
        double y = pointBean.getY();
        double r = pointBean.getR();

        // Validate input
        if (r <= 0) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", "Radius must be positive"));
            return;
        }

        long startTime = System.nanoTime();
        boolean hit = AreaChecker.checkHit(x, y, r);
        long executionTime = System.nanoTime() - startTime;

        PointResult result = new PointResult(x, y, r, hit, LocalDateTime.now(), executionTime);

        try {
            dao.save(result);
            loadResults();

            String message = hit ? "Point is inside the area!" : "Point is outside the area";
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_INFO, "Result", message));
        } catch (Exception e) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", "Failed to save result: " + e.getMessage()));
        }
    }

    public void checkCanvasPoint() {
        if (pointBean.getCanvasX() != null && pointBean.getCanvasY() != null && pointBean.getR() != null) {
            pointBean.setX(pointBean.getCanvasX());
            pointBean.setY(pointBean.getCanvasY());
            checkPoint();
        }
    }

    public void clearResults() {
        try {
            dao.deleteAll();
            loadResults();
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_INFO, "Success", "All results cleared"));
        } catch (Exception e) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error",
                            "Failed to clear results: " + e.getMessage()));
        }
    }

    // Getters and Setters
    public List<PointResult> getResults() {
        return results;
    }

    public void setResults(List<PointResult> results) {
        this.results = results;
    }

    public PointBean getPointBean() {
        return pointBean;
    }

    public void setPointBean(PointBean pointBean) {
        this.pointBean = pointBean;
    }
}
