package Project.JobApp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Project.JobApp.exception.JobNotFoundException;
import Project.JobApp.model.JobPost;
import Project.JobApp.repo.JobRepo;

@Service
public class JobService {

    @Autowired
    private JobRepo repo;

    public JobPost addJob(JobPost jobPost) {
        System.out.println("Saving job: " + jobPost);
        JobPost saved = repo.save(jobPost);
        System.out.println("Job saved successfully!");
        return saved;
    }
    
    public List<JobPost> getAllJobs(){
        return repo.findAll();
    }

    @Transactional
    public void deleteJob(int id) {
        repo.deleteById(id);
    }

    public List<JobPost> searchJobs(String keyword) {
        return repo.findByPostProfileContainingIgnoreCase(keyword);
    }

    public JobPost getJobById(int id){
        return repo.findById(id).orElseThrow(()->new JobNotFoundException(id));
    }
}
