package Project.JobApp.exception;

public class JobNotFoundException extends RuntimeException{

    public JobNotFoundException(int id){
        super("Job with id " + id + " not found.");
    }
}
