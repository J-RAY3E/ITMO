package benchmark;

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;
import service.AreaCheckService;

import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 5, time = 1)
@Measurement(iterations = 5, time = 1)
@Fork(1)
@State(Scope.Thread)
public class CheckHitBenchmark {

    private AreaCheckService service;
    private double[] xs, ys, rs;
    private int idx;

    @Setup
    public void setup() {
        service = new AreaCheckService();
        ThreadLocalRandom rng = ThreadLocalRandom.current();
        int n = 10_000;
        xs = new double[n];
        ys = new double[n];
        rs = new double[n];
        for (int i = 0; i < n; i++) {
            xs[i] = rng.nextDouble(-5.0, 5.0);
            ys[i] = rng.nextDouble(-5.0, 5.0);
            rs[i] = rng.nextDouble(0.5, 5.0);
        }
    }

    @Benchmark
    public void deadCodeCheckHit() {
        new AreaCheckService().checkHit(1.0, 2.0, 3.0);
    }

    @Benchmark
    public boolean constantFoldingCheckHit() {
        return new AreaCheckService().checkHit(1.0, 2.0, 3.0);
    }


    @Benchmark
    public void correctCheckHit(Blackhole bh) {
        int i = idx++ & (xs.length - 1);
        bh.consume(service.checkHit(xs[i], ys[i], rs[i]));
    }
}
