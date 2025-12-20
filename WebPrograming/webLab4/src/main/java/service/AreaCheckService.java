package service;

import entity.PointEntity;
import entity.UserEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

@Stateless
public class AreaCheckService {

    @PersistenceContext(unitName = "AreaPU")
    private EntityManager em;

    public PointEntity checkAndSave(double x, double y, double r, UserEntity owner) {
        long startTime = System.nanoTime();
        boolean hit = checkHit(x, y, r);
        long executionTime = System.nanoTime() - startTime;

        PointEntity point = new PointEntity(x, y, r, hit, LocalDateTime.now(), executionTime, owner);
        em.persist(point);
        return point;
    }

    public List<PointEntity> getUserPoints(UserEntity user) {
        return em
                .createQuery("SELECT p FROM PointEntity p WHERE p.owner = :user ORDER BY p.timestamp DESC",
                        PointEntity.class)
                .setParameter("user", user)
                .getResultList();
    }

    private boolean checkHit(double x, double y, double r) {
        if (x > 0 && y > 0) {
            return false;
        }

        if (x <= 0 && y >= 0) {
            // Triangle: Corners (0,0), (0, r/2), (-r/2, 0) ?
            // Logic was: y <= x + r / 2.0
            return (y <= x + r / 2.0);
        }

        if (x <= 0 && y <= 0) {
            // Square: -r to 0
            return (x >= -r) && (y >= -r);
        }

        if (x >= 0 && y <= 0) {
            // Quarter Circle radius r
            return (x * x + y * y) <= (r * r);
        }

        return false;
    }
}
