package Project.JobApp;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import Project.JobApp.model.JobPost;
import Project.JobApp.service.JobService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.DELETE, RequestMethod.PUT })
@RestController
@RequestMapping("/api/jobs")
public class JobRestController {

    @Autowired
    private JobService service;

    @PostMapping
    public JobPost addJob(@Valid @RequestBody JobPost jobPost) {
        return service.addJob(jobPost);
    }

    @GetMapping
    public List<JobPost> getAllJobs() {
        return service.getAllJobs();
    }

    @GetMapping("/search")
    public List<JobPost> searchJobs(@RequestParam String keyword) {
        return service.searchJobs(keyword);
    }

    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable("id") int id) { // Explicit path variable tracking
        service.deleteJob(id);
        return "Job deleted successfully.";
    }

    @GetMapping("/{id}")
    public JobPost getJobById(@PathVariable("id") int id) { // Explicit path variable tracking
        return service.getJobById(id);
    }
}