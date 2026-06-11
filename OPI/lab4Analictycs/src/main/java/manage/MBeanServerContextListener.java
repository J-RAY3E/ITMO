package manage;

import javax.management.MBeanServer;
import javax.management.ObjectName;
import javax.management.monitor.GaugeMonitor;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.lang.management.ManagementFactory;

@WebListener
public class MBeanServerContextListener implements ServletContextListener {

    public void contextInitialized(ServletContextEvent sce) {
        try {
            PointsMonitor monitor = new PointsMonitor();
            MissPercentage percentage = new MissPercentage();
            MBeanServer mbserver = ManagementFactory.getPlatformMBeanServer();

            ObjectName monitorName = new ObjectName("lab4:type=PointsMonitor");
            mbserver.registerMBean(monitor, monitorName);
            sce.getServletContext().setAttribute("jmxMonitor", monitor);

            ObjectName percentageName = new ObjectName("lab4:type=MissPercentage");
            mbserver.registerMBean(percentage, percentageName);
            sce.getServletContext().setAttribute("jmxPercentage", percentage);

            GaugeMonitor gaugeMonitor = new GaugeMonitor();
            gaugeMonitor.addObservedObject(monitorName);
            gaugeMonitor.setObservedAttribute("ConsecutiveMisses");
            gaugeMonitor.setNotifyHigh(true);
            gaugeMonitor.setThresholds(3.0, 0.0);
            gaugeMonitor.setGranularityPeriod(500);
            gaugeMonitor.start();

            ObjectName gaugeName = new ObjectName("lab4:type=GaugeMonitor");
            mbserver.registerMBean(gaugeMonitor, gaugeName);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
