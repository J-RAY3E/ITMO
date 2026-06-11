package unit;

import entity.UserEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import service.UserService;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;



public class UServiceTest {


    private UserService service;
    private EntityManagerFactory emf;
    private EntityManager em;

    @BeforeEach
    void SetUp(){
        emf = Persistence.createEntityManagerFactory("testPU");
        em = emf.createEntityManager();
        service = new UserService(em);
    }

    @Test
    public void shouldNotRegisterSameUserTwice() throws Exception {
        EntityTransaction tx = em.getTransaction();
        tx.begin(); // Iniciamos la transacción aquí en el test

        try {
            // 1. Primer registro
            service.register("J-RAY", "2312");

            // 2. Sincronizamos con la DB para que el próximo SELECT lo encuentre
            em.flush();

            // 3. El segundo registro ahora SÍ verá que el usuario existe
            assertThrows(IllegalArgumentException.class, () -> {
                service.register("J-RAY", "2312");
            });

        } finally {
            if (tx.isActive()) tx.rollback(); // Limpiamos para no ensuciar otros tests
        }
    }


    @Test
    public void autenticationUserName() throws Exception {

        UserEntity regist1;
        UserEntity authregist;
        regist1 = service.register("personnew", "123445");
        authregist = service.register("personnew", "123445");
        assertNotNull(authregist);
        assertEquals(service.hashPassword("123445"),authregist.getPassword());
    }


}
