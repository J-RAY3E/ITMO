package org.example.utilities;

import java.io.InvalidClassException;
import java.math.BigDecimal;
import java.util.Set;

public class VerifyHit {

    public void validate(BigDecimal x, BigDecimal y, BigDecimal r) throws InvalidClassException {
        // Validate R: {1, 2, 3, 4, 5}
        Set<BigDecimal> validR = Set.of(
                BigDecimal.valueOf(1), BigDecimal.valueOf(2), BigDecimal.valueOf(3),
                BigDecimal.valueOf(4), BigDecimal.valueOf(5));
        if (!validR.contains(r)) {
            throw new InvalidClassException("Value r out of range {1, 2, 3, 4, 5}");
        }

        if (y.compareTo(BigDecimal.valueOf(-3)) < 0 || y.compareTo(BigDecimal.valueOf(3)) > 0) {
            throw new InvalidClassException("Value y out of range [-3, 3]");
        }

        // Validate X: {-5, -4, -3, -2, -1, 0, 1, 2, 3}
        Set<BigDecimal> validX = Set.of(
                BigDecimal.valueOf(-5), BigDecimal.valueOf(-4), BigDecimal.valueOf(-3),
                BigDecimal.valueOf(-2), BigDecimal.valueOf(-1), BigDecimal.ZERO,
                BigDecimal.ONE, BigDecimal.valueOf(2), BigDecimal.valueOf(3));

        if (!validX.contains(x)) {
            throw new InvalidClassException("Value x out of range {-5, -4, -3, -2, -1, 0, 1, 2, 3}");
        }
    }

    public Boolean pointchecker(BigDecimal x, BigDecimal y, BigDecimal r) {
        // Q1: Quarter Circle (x >= 0, y >= 0) -> x^2 + y^2 <= R^2
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return x.pow(2).add(y.pow(2)).compareTo(r.pow(2)) <= 0;
        }

        // Q2: Triangle (x <= 0, y >= 0) -> y <= 2x + R
        // Vertices: (0, R), (-R/2, 0), (0,0)
        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            // y <= 2x + R
            // Check: y - 2x <= R
            BigDecimal twoX = x.multiply(BigDecimal.valueOf(2));
            return y.subtract(twoX).compareTo(r) <= 0;
        }

        // Q3: Rectangle (x <= 0, y <= 0) -> x >= -R, y >= -R/2
        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            BigDecimal rDiv2 = r.divide(BigDecimal.valueOf(2));
            return x.compareTo(r.negate()) >= 0 && y.compareTo(rDiv2.negate()) >= 0;
        }

        // Q4: Empty (x > 0, y < 0)
        return false;
    }

}
