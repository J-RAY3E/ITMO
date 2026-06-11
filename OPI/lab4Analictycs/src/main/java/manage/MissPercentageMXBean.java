package manage;

import javax.management.MXBean;


@MXBean
public interface MissPercentageMXBean {
    double getMissPercentage();
    int getMissedPoints();
    int getTotalPoints();
    void reset();
}
