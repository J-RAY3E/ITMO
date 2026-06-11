package rest;

import dto.Credentials;
import entity.UserEntity;
import service.UserService;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    @EJB
    private UserService userService;

    @POST
    @Path("/login")
    public Response login(Credentials credentials, @Context HttpServletRequest req) {
        UserEntity user = userService.authenticate(credentials.getUsername(), credentials.getPassword());
        if (user != null) {
            req.getSession().setAttribute("user", user.getId());
            return Response.ok().build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid credentials").build();
    }

    @POST
    @Path("/register")
    public Response register(Credentials credentials) {
        if (credentials.getUsername() == null || credentials.getPassword() == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Missing fields").build();
        }
        try {
            userService.register(credentials.getUsername(), credentials.getPassword());
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.CONFLICT).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/logout")
    public Response logout(@Context HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return Response.ok().build();
    }

    @GET
    @Path("/user")
    public Response getCurrentUser(@Context HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            Long userId = (Long) session.getAttribute("user");
            // Returning just ID or username usually sufficient for frontend state check
            return Response.ok("{\"id\": " + userId + "}").build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
