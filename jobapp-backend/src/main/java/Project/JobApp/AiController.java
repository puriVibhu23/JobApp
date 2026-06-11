package Project.JobApp;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.apache.pdfbox.Loader;
import Project.JobApp.service.AiService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/ai")
public class AiController {

    @Autowired
    private AiService aiService;

    @GetMapping("/generate-jd")
    public String generateJD(@RequestParam String profile) {
        return aiService.generateJobDiscription(profile);
    }

    @PostMapping("/review-resume")
    public String reviewResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("jobProfile") String jobProfile) {
        try {
            PDDocument document = Loader.loadPDF(file.getBytes());
            PDFTextStripper stripper = new PDFTextStripper();
            String resumeText = stripper.getText(document);
            document.close();
            return aiService.reviewResume(resumeText, jobProfile);
        } catch (Exception e) {
            return "{\"error\": \"Failed to process PDF: " + e.getMessage() + "\"}";
        }
    }
}