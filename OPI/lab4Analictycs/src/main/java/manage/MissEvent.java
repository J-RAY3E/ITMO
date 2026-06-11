package manage;

import jdk.jfr.*;

@Label("Point Miss")
@Category({"WebLab", "Interaction"})
@Threshold("1 ms")
public class MissEvent extends Event {

    @Label("X Coordinate")
    private double x;

    @Label("Y Coordinate")
    private double y;

    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }
}
