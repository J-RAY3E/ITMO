package unit;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import service.AreaCheckService;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ACServiceTest {

    private AreaCheckService service;

    @BeforeEach
    void setUp() {
        service = new AreaCheckService();
    }

    @Test
    public void validationIsInArea() {
        double x = .0;
        double y = .0;
        double z = 2.0;
        boolean result = service.checkHit(x, y, z);
        assertTrue(result, "The dot (1,1) should be inside the radius 2");
    }


}