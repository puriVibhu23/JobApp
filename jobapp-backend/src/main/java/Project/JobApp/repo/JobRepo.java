package Project.JobApp.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import Project.JobApp.model.JobPost;

public interface JobRepo extends JpaRepository<JobPost, Integer> {
    
    List<JobPost> findByPostProfileContainingIgnoreCase(String keyword);
}