package org.example.beans;

import org.example.utilities.PointResult;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ResultsBean implements Serializable {
    private List<PointResult> results;

    public ResultsBean() {
        this.results = new ArrayList<>();
    }

    public List<PointResult> getResults() {
        return results;
    }

    public void setResults(List<PointResult> results) {
        this.results = results;
    }

    public void addResult(PointResult result) {
        this.results.add(result);
    }

    public void clearResults() {
        this.results.clear();
    }
}
