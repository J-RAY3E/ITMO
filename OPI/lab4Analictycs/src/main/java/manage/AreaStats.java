package manage;

import java.beans.ConstructorProperties;
import java.io.Serializable;

public class AreaStats implements Serializable {

    private int quarter1 = 0;
    private int quarter2 = 0;
    private int quarter3 = 0;
    private int quarter4 = 0;

    public  AreaStats() {};

    @ConstructorProperties({"quarter1", "quarter2", "quarter3", "quarter4"})
    public AreaStats(int quarter1, int quarter2, int quarter3, int quarter4){
        this.quarter1 = quarter1;
        this.quarter2 = quarter2;
        this.quarter3 = quarter3;
        this.quarter4 = quarter4;
    }

    public int getQuarter1() { return quarter1; }
    public int getQuarter2() { return quarter2; }
    public int getQuarter3() { return quarter3; }
    public int getQuarter4() { return quarter4; }

    public void setQuarter1(int quarter1) { this.quarter1 = quarter1; }
    public void setQuarter2(int quarter2) { this.quarter2 = quarter2; }
    public void setQuarter3(int quarter3) { this.quarter3 = quarter3; }
    public void setQuarter4(int quarter4) { this.quarter4 = quarter4; }
}
