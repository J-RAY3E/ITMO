package manage;

import jdk.jfr.*;

@Label("Point Set")
@Category({"WebLab", "Interaction"})
@Threshold("1 ms")
public class PointSetEvent extends Event {

    @Label("X Coordinate")
    private double x;

    @Label("Y Coordinate")
    private double y;

    @Label("Radius")
    private double r;

    @Label("Is Hit")
    private boolean hit;

    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }
    public void setR(double r) { this.r = r; }
    public void setHit(boolean hit) { this.hit = hit; }
}
