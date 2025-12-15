package ma.jaouad.controller;

import ma.jaouad.model.Course;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final List<Course> courses = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong();

    public CourseController() {
        courses.add(new Course(idCounter.incrementAndGet(), "Confiance numérique et accès biométrique", "Digital trust and biometric access systems", "M. OUAGUID"));
        courses.add(new Course(idCounter.incrementAndGet(), "Systèmes distribués/ Parallèles et sécurité", "Distributed systems, parallelism, and security", "M. YOUSSFI"));

        courses.add(new Course(idCounter.incrementAndGet(), "Management et gouvernance de la sécurité des SI", "Management and governance of IS security", "Mme BENSAG"));
        courses.add(new Course(idCounter.incrementAndGet(), "Projets de la cybersécurité et confiance numérique", "Cybersecurity and digital trust projects", "M. OUAGUID"));

        courses.add(new Course(idCounter.incrementAndGet(), "Sécurité des services et applications", "Service/Application security & secure development", "M. BOUSSELHAM"));

        courses.add(new Course(idCounter.incrementAndGet(), "Conduite et Management de Projet", "Project Management (Shared Module)", "Mme NAIM"));
        courses.add(new Course(idCounter.incrementAndGet(), "Contrôle de gestion", "Management Control (Shared Module)", "M. AMIFI"));

        courses.add(new Course(idCounter.incrementAndGet(), "Machine et Deep Learning", "Machine and Deep Learning for Cybersecurity", "Mme OUHMIDA"));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_STUDENT', 'ROLE_ADMIN')")
    public List<Course> getAllCourses() {
        return courses;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Course createCourse(@RequestBody Course course) {
        course.setId(idCounter.incrementAndGet());
        courses.add(course);
        return course;
    }
}
