package com.example.pointchecker.dao;

import com.example.pointchecker.entity.PointResult;
import com.example.pointchecker.util.HibernateUtil;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityTransaction;
import java.util.List;

public class PointResultDAO {

    public void save(PointResult result) {
        EntityManager em = HibernateUtil.getEntityManager();
        EntityTransaction transaction = null;

        try {
            transaction = em.getTransaction();
            transaction.begin();
            em.persist(result);
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            throw new RuntimeException("Error saving point result", e);
        } finally {
            em.close();
        }
    }

    public List<PointResult> findAll() {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            return em.createQuery("SELECT p FROM PointResult p ORDER BY p.checkTime DESC", PointResult.class)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public void deleteAll() {
        EntityManager em = HibernateUtil.getEntityManager();
        EntityTransaction transaction = null;

        try {
            transaction = em.getTransaction();
            transaction.begin();
            em.createQuery("DELETE FROM PointResult").executeUpdate();
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            throw new RuntimeException("Error deleting all results", e);
        } finally {
            em.close();
        }
    }
}
