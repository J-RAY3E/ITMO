package functional;


import java.util.Random;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.List;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ResultsTableTest extends BaseTest {

    @Order(1)
    @Test
    public void randomPointGraphic() throws InterruptedException {
        loginAsAdmin();
        Thread.sleep(6500);

        Random rand = new Random();
        int randomX = rand.nextInt(0,5);
        int randomY = rand.nextInt(-5,1);
        int initialRows = webDriver.findElements(By.className("result-row")).size();
        WebElement svg = wait.until(ExpectedConditions.elementToBeClickable(By.id("graph-svg")));
        Actions actions = new Actions(webDriver);
        actions.moveToElement(svg,randomX*10, randomY*10).click().perform();

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(By.className("result-row"), initialRows));
        int finalRows = webDriver.findElements(By.className("result-row")).size();
        Assertions.assertTrue(finalRows > initialRows);
    }

}
