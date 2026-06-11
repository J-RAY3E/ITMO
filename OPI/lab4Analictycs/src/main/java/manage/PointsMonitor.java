package manage;

import javax.management.Notification;
import javax.management.NotificationBroadcasterSupport;
import javax.management.openmbean.*;


public class PointsMonitor extends NotificationBroadcasterSupport implements PointsMonitorMXBean {

    private int strike = 0;
    private int missedPoints = 0;
    private int totalPoints = 0;
    private int sequenceNumber = 1;
    private int quarter1 = 0, quarter2 = 0, quarter3 = 0, quarter4 = 0;

    private static CompositeType areaStatsType;

    static {
        try {
            String[] itemNames = {"quarter1", "quarter2", "quarter3", "quarter4"};
            String[] itemDescriptions = {"Points in Quadrant I", "Points in Quadrant II", "Points in Quadrant III", "Points in Quadrant IV"};
            OpenType<?>[] itemTypes = {SimpleType.INTEGER, SimpleType.INTEGER, SimpleType.INTEGER, SimpleType.INTEGER};
            areaStatsType = new CompositeType(
                    "AreaStats",
                    "Per-quadrant point distribution",
                    itemNames,
                    itemDescriptions,
                    itemTypes
            );
        } catch (OpenDataException e) {
            throw new RuntimeException(e);
        }
    }

    public synchronized void addPoint(double x, double y, int quarter, boolean isMiss) {
        this.totalPoints++;
        switch (quarter) {
            case 1: this.quarter1++; break;
            case 2: this.quarter2++; break;
            case 3: this.quarter3++; break;
            case 4: this.quarter4++; break;
        }

        if (isMiss) {
            this.missedPoints++;
            this.strike++;
        } else {
            this.strike = 0;
        }

        if (this.strike >= 3) {
            Notification notification = new Notification(
                    "lab4.three.consecutive.misses",
                    this,
                    sequenceNumber++,
                    System.currentTimeMillis(),
                    "Three consecutive misses detected"
            );
            this.strike = 0;
            this.sendNotification(notification);
        }
    }

    @Override
    public int getMissedPoints() { return missedPoints; }

    @Override
    public int getTotalPoints() { return totalPoints; }

    @Override
    public int getConsecutiveMisses() { return strike; }

    @Override
    public CompositeData getAreaStats() {
        try {
            Object[] itemValues = {quarter1, quarter2, quarter3, quarter4};
            return new CompositeDataSupport(areaStatsType, new String[]{"quarter1", "quarter2", "quarter3", "quarter4"}, itemValues);
        } catch (OpenDataException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void reset() {
        this.totalPoints = 0;
        this.strike = 0;
        this.missedPoints = 0;
        this.quarter1 = 0;
        this.quarter2 = 0;
        this.quarter3 = 0;
        this.quarter4 = 0;
    }
}
