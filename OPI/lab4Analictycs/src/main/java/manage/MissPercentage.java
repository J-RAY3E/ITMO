package manage;


public class MissPercentage implements MissPercentageMXBean {

    private int missedPoints = 0;
    private int totalPoints = 0;

    public synchronized void addPoint(boolean isMiss) {
        this.totalPoints++;
        if (isMiss) {
            this.missedPoints++;
        }
    }

    @Override
    public double getMissPercentage() {
        return totalPoints == 0 ? 0.0 : (missedPoints * 100.0 / totalPoints);
    }

    @Override
    public int getMissedPoints() { return missedPoints; }

    @Override
    public int getTotalPoints() { return totalPoints; }

    @Override
    public void reset() {
        this.totalPoints = 0;
        this.missedPoints = 0;
    }
}
