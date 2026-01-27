package com.example.pointchecker.util;

/**
 * Utility class for checking if a point falls within the defined area.
 * The area is defined according to the variant requirements:
 * - Quarter circle in quadrant II (x <= 0, y >= 0) with radius R
 * - Triangle in quadrant IV (x >= 0, y <= 0)
 * - Rectangle in quadrant III (x <= 0, y <= 0)
 */
public class AreaChecker {

    public static boolean checkHit(double x, double y, double r) {
        // Quadrant I (x > 0, y > 0) - no area
        if (x > 0 && y > 0) {
            return false;
        }

        // Quadrant II (x <= 0, y >= 0) - Quarter circle with radius R
        if (x <= 0 && y >= 0) {
            return (x * x + y * y) <= (r * r);
        }

        // Quadrant III (x <= 0, y <= 0) - Rectangle: width R/2, height R
        if (x <= 0 && y <= 0) {
            return (x >= -r / 2) && (y >= -r);
        }

        // Quadrant IV (x >= 0, y <= 0) - Triangle
        if (x >= 0 && y <= 0) {
            // Triangle vertices: (0,0), (R,0), (0,-R/2)
            // Line equation: y = -x/2 + 0
            // Point is inside if: y >= -x/2 AND x <= R AND y >= -R/2
            return (y >= -x / 2) && (x <= r) && (y >= -r / 2);
        }

        return false;
    }
}
