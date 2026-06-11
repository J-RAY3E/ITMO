

import io.gatling.javaapi.core.ScenarioBuilder;
import io.gatling.javaapi.core.Simulation;
import io.gatling.javaapi.http.HttpProtocolBuilder;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Stream;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

public class BasisSimulation extends Simulation {
    String baseUrl = "http://localhost:8180/webLab4/api";
    HttpProtocolBuilder httpProtocol = http.baseUrl(baseUrl)
            .acceptHeader("application/json, text/plain, */*")
            .contentTypeHeader("application/json")
            .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36");


    private static final int[] R_VALUES = {1, 2, 3, 4};

    Iterator<Map<String,Object>> feeder = Stream.generate(() -> {
        Map<String, Object> point = new HashMap<>();

        double x = ThreadLocalRandom.current().nextDouble(-5.0, 5.0);
        double y = ThreadLocalRandom.current().nextDouble(-5.0, 5.0);
        int r = R_VALUES[ThreadLocalRandom.current().nextInt(0, R_VALUES.length)];

        point.put("x", String.format(Locale.US, "%.2f", x));
        point.put("y", String.format(Locale.US, "%.2f", y));
        point.put("r", String.valueOf(r));
        return point;
    }).iterator();

    ScenarioBuilder scn = scenario("LoadDots")
            .exec(session -> {
                String username = "user_" + java.util.UUID.randomUUID().toString().substring(0, 8);
                return session.set("generatedUser", username);
            })

            .exec(http("RegisterOnPage")
                    .post("/auth/register")
                    .body(StringBody("{\"username\":\"#{generatedUser}\",\"password\":\"password123\"}"))
                    .check(status().is(200))
            )
            .pause(1)

            .exec(http("LoginAfterRegister")
                    .post("/auth/login")
                    .body(StringBody("{\"username\":\"#{generatedUser}\",\"password\":\"password123\"}"))
                    .check(status().is(200))
            )
            .pause(1)

            .repeat(20).on(
                    feed(feeder)
                            .exec(http("Check Point (Click)")
                                    .post("/points")
                                    .body(StringBody("{\"x\":\"#{x}\",\"y\":\"#{y}\",\"r\":\"#{r}\"}"))
                                    .check(status().is(200))
                            )
                            .pause(1)
            );
    {
        setUp(scn.injectOpen(
            constantUsersPerSec(20).during(100)
            )
        ).protocols(httpProtocol);
    }
}
