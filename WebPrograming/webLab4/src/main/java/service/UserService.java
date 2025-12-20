package service;

import entity.UserEntity;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@Stateless
public class UserService {

    @PersistenceContext(unitName = "AreaPU")
    private EntityManager em;

    public UserEntity register(String username, String password) throws Exception {
        // Check if exists
        List<UserEntity> existing = em.createQuery("SELECT u FROM UserEntity u WHERE u.username = :u", UserEntity.class)
                .setParameter("u", username)
                .getResultList();
        if (!existing.isEmpty()) {
            throw new IllegalArgumentException("User already exists");
        }

        UserEntity user = new UserEntity();
        user.setUsername(username);
        user.setPassword(hashPassword(password));
        em.persist(user);
        return user;
    }

    public UserEntity authenticate(String username, String password) {
        try {
            String hash = hashPassword(password);
            List<UserEntity> users = em
                    .createQuery("SELECT u FROM UserEntity u WHERE u.username = :u AND u.password = :p",
                            UserEntity.class)
                    .setParameter("u", username)
                    .setParameter("p", hash)
                    .getResultList();
            return users.isEmpty() ? null : users.get(0);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public UserEntity findByUsername(String username) {
        List<UserEntity> users = em.createQuery("SELECT u FROM UserEntity u WHERE u.username = :u", UserEntity.class)
                .setParameter("u", username)
                .getResultList();
        return users.isEmpty() ? null : users.get(0);
    }

    public UserEntity findById(Long id) {
        return em.find(UserEntity.class, id);
    }

    private String hashPassword(String original) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = digest.digest(original.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encodedhash);
    }
}
