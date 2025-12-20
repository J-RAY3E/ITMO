package rest;

import dto.PointRequest;
import dto.PointResponse;
import entity.PointEntity;
import entity.UserEntity;
import service.AreaCheckService;
import service.UserService;

import javax.ejb.EJB;
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

            // Validation
            if (x < -4 || x > 4) {
                return Response.status(Response.Status.BAD_REQUEST).entity("X must be between -4 and 4").build();
            }
            if (y <= -3 || y >= 5) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Y must be between -3 and 5 (exclusive)")
                        .build();
            }
            if (r <= 0) {
                return Response.status(Response.Status.BAD_REQUEST).entity("R must be positive").build();
            }

            PointEntity result = areaService.checkAndSave(x, y, r, user);
            return Response.ok(toDTO(result)).build();

        } catch (NumberFormatException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Invalid number format").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
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
