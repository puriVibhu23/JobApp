package Project.JobApp.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiService {

    private final ChatClient chatClient;

    public AiService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String generateJobDiscription(String profile) {
        String prompt = """
                You are an expert HR professional and technical recruiter.
                Generate a professional job description for the role: "%s"

                Include the following sections:
                - Role Overview (2-3 lines)
                - Key Responsibilities (5 bullet points)
                - Required Skills & Qualifications (5 bullet points)
                - Nice to Have (2-3 bullet points)

                Keep it concise, professional, and suitable for a tech job portal.
                """.formatted(profile);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }

    public String reviewResume(String resumeText, String jobProfile) {
        String prompt = """
                You are an expert HR professional and resume reviewer.
                Analyze the following resume for the role: "%s"

                Resume Content:
                %s

                Respond ONLY in this exact JSON format, no extra text outside JSON:
                {
                  "matchScore": <number 0-100>,
                  "strengths": ["<point1>", "<point2>", "<point3>"],
                  "missingSkills": ["<skill1>", "<skill2>", "<skill3>"],
                  "tips": ["<tip1>", "<tip2>", "<tip3>"]
                }
                """.formatted(jobProfile, resumeText);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}