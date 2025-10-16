package com.mohan.studentresources.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Forward unknown, non-API, non-static requests to index.html so the client-side router can handle deep links.
 */
@Controller
public class SpaController {

    @RequestMapping("/**")
    public String forwardSpa(HttpServletRequest request) {
        String path = request.getRequestURI();

        // Exclude API, static assets, uploads and common asset files
        if (path.startsWith("/api") || path.startsWith("/static") || path.startsWith("/uploads")
                || path.equals("/favicon.ico") || path.contains(".") ) {
            // Let Spring serve these normally (return 404 if not found)
            return null;
        }

        // For all other paths, forward to index.html (client router handles)
        return "forward:/index.html";
    }
}
