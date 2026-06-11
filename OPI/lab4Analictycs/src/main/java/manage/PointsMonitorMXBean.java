package manage;

import javax.management.MXBean;
import javax.management.openmbean.CompositeData;


@MXBean
public interface PointsMonitorMXBean {
    int getMissedPoints();
    int getTotalPoints();
    int getConsecutiveMisses();
    CompositeData getAreaStats();
    void reset();
}
