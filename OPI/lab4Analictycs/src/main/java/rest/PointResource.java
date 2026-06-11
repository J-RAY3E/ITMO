package rest;

import dto.PointRequest;
import dto.PointResponse;
import entity.PointEntity;
import entity.UserEntity;
import manage.MissEvent;
import manage.MissPercentage;
import manage.PointsMonitor;
import manage.PointSetEvent;
import service.AreaCheckService;
import service.UserService;

import javax.ejb.EJB;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@Path("/points")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PointResource {

    @EJB
    private AreaCheckService areaService;

    @EJB
    private UserService userService;

    @GET
    public Response getPoints(@Context HttpServletRequest req) {
        UserEntity user = getUser(req);
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        List<PointEntity> points = areaService.getUserPoints(user);
        List<PointResponse> response = points.stream().map(this::toDTO).collect(Collectors.toList());
        return Response.ok(response).build();
    }

    @POST
    public Response checkPoint(PointRequest request, @Context HttpServletRequest req) {
        UserEntity user = getUser(req);
        if (user == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        try {
            double x = Double.parseDouble(request.getX());
            double y = Double.parseDouble(request.getY());
            double r = Double.parseDouble(request.getR());

            if (r == 0) {
                return Response.status(Response.Status.BAD_REQUEST).entity("R cannot be zero").build();
            }

            PointEntity result = areaService.checkAndSave(x, y, r, user);
            boolean isHit = result.isHit();
            int quarter = calculateQuarter(x, y);

            try{
                PointSetEvent pointEvent = new PointSetEvent();
                pointEvent.setX(x);
                pointEvent.setY(y);
                pointEvent.setR(r);
                pointEvent.setHit(isHit);
                pointEvent.commit();
            }
            catch(Exception ignored){}

            if (!isHit) {
                try{
                    MissEvent missEvent = new MissEvent();
                    missEvent.setX(x);
                    missEvent.setY(y);
                    missEvent.commit();
                } catch (Exception ignored) {}
            }

            ServletContext context = req.getServletContext();
            PointsMonitor monitor = (PointsMonitor) context.getAttribute("jmxMonitor");
            if (monitor != null) {
                monitor.addPoint(x, y, quarter, !isHit);
            }
            MissPercentage missPct = (MissPercentage) context.getAttribute("jmxPercentage");
            if (missPct != null) {
                missPct.addPoint(!isHit);
            }
            return Response.ok(toDTO(result)).build();

        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid number format").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    private int calculateQuarter(double x, double y) {
        if (x > 0 && y > 0) return 1;
        if (x < 0 && y > 0) return 2;
        if (x < 0 && y < 0) return 3;
        if (x > 0 && y < 0) return 4;
        return 0;
    }

    private UserEntity getUser(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session != null) {
            Long userId = (Long) session.getAttribute("user");
            if (userId != null) {
                return userService.findById(userId);
            }
        }
        return null;
    }

    private PointResponse toDTO(PointEntity entity) {
        return new PointResponse(
                entity.getX(),
                entity.getY(),
                entity.getR(),
                entity.isHit(),
                entity.getTimestamp().toString(),
                entity.getExecutionTime());
    }
}
