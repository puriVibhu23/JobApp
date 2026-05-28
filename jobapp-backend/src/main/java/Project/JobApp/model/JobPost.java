package Project.JobApp.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;
import org.springframework.stereotype.Component;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Entity
@Table(name = "job_posts")
public class JobPost {
    @Id
    @Min(value = 1, message = "Post ID must be greater than 0")
    private int postId;

    @NotBlank(message = "Post profile cannot be empty")
    private String postProfile;

    @NotBlank(message = "Post description cannot be empty")
    private String postDesc;

    @Min(value = 0 , message = "Experience cannot be negative")
    private int reqExperience;

    @NotEmpty(message = "Tech stack cannot be empty")
    @ElementCollection
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<String> postTechStack;
}