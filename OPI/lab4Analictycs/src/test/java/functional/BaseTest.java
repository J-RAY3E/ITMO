package functional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestMethodOrder;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;

public class BaseTest {
    protected WebDriver webDriver;
    protected WebDriverWait wait;

    @BeforeEach
    public void setUp() throws MalformedURLException {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");

        String env = System.getenv("RUN_ENV");
        if ("docker".equalsIgnoreCase(env)) {
            options.addArguments("--headless=new");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            webDriver = new RemoteWebDriver(new URL("http://selenium-hub:4444/wd/hub"), options);
            webDriver.get("http://app-weblab:8080/webLab4/");
        } else {
            options.addArguments("--start-maximized");
            webDriver = new ChromeDriver(options);
            webDriver.manage().window().maximize();
            webDriver.get("http://localhost:8081/webLab4/");
        }
        wait = new WebDriverWait(webDriver, Duration.ofSeconds(10));
    }

    @AfterEach
    public void tearDown() {
        if (webDriver != null) {
            webDriver.quit();
        }
    }

    protected void loginAsAdmin() {
        WebElement inputU = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("userName")));
        WebElement inputP = webDriver.findElement(By.id("password"));
        WebElement btnS = webDriver.findElement(By.id("login"));
        inputU.sendKeys("admin");
        inputP.sendKeys("password");
        btnS.click();
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("logout-btn")));
    }



    protected void registerAdmin() {
        WebElement toggleBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("toggle-auth-btn")));
        toggleBtn.click();

        long randomSuffix = System.currentTimeMillis();
        WebElement inputU = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("userName")));
        WebElement inputP = webDriver.findElement(By.id("password"));
        WebElement btnS = webDriver.findElement(By.id("login"));

        inputU.sendKeys("admin");
        inputP.sendKeys("password");
        btnS.click();

        WebElement logoutBtn = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("logout-btn")));
        Assertions.assertTrue(logoutBtn.isDisplayed());
    }

    protected void clearReactInput(WebElement input) {
        input.sendKeys(Keys.chord(Keys.CONTROL, "a"), Keys.DELETE);
    }
}
