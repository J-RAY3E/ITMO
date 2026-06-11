package service;

import entity.PointEntity;
import entity.UserEntity;

import javax.ejb.Stateless;
import javax.management.MBeanServer;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

@Stateless
public class AreaCheckService {

    @PersistenceContext(unitName = "AreaPU")
    private EntityManager em;
    public AreaCheckService() {
    }
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

    public boolean checkHit(double x, double y, double r) {
        
        if (r < 0) {
            x = -x;
            y = -y;
            r = -r;
        }

        if (x <= 0 && y >= 0) {
            return (x * x + y * y) <= (r * r);
        }

        if (x >= 0 && y <= 0) {
            return y >= (x - r);
        }

        if (x <= 0 && y <= 0) {
            return (x >= -r / 2.0) && (y >= -r);
        }

        return false;
    }
}
