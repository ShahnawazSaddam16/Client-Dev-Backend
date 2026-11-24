const Groq = require("groq-sdk");
const Projects = require("../../models/projects");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiSuggestProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const project = await Projects.findOne({ _id: id, userId });

        if (!project) {
            return res.status(404).json({ success: false, message: "Project Not Found" });
        }

        const now = new Date();
        const deadline = new Date(project.projectDuration);
        const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
        const daysSinceCreated = Math.floor((now - new Date(project.createdAt)) / (1000 * 60 * 60 * 24));
        const daysSinceUpdated = Math.floor((now - new Date(project.updatedAt)) / (1000 * 60 * 60 * 24));

        const projectData = {
            projectName: project.projectName,
            projectType: project.projectType,
            status: project.status,
            deadline: deadline.toISOString().split("T")[0],
            daysLeft,
            isOverdue: daysLeft < 0,
            daysSinceCreated,
            daysSinceLastUpdate: daysSinceUpdated,
            progressUpdates: project.projectProgress,
            totalProgressUpdates: project.projectProgress.length,
            totalImages: project.projectImages.length,
            links: project.projectLinks,
            totalLinks: project.projectLinks.length,
        };

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            temperature: 0.4,
            top_p: 0.9,
            max_completion_tokens: 2048,
            reasoning_effort: "low",
            response_format: { type: "json_object" },
            messages: [
                {
                    role: "system",
                    content:
                        "You are a senior project management assistant. Analyze the project data provided and return only a valid JSON object with exactly these keys: " +
                        "summary (string, 2-3 sentences on where the project stands), " +
                        "health (one of: \"On Track\", \"At Risk\", \"Delayed\", \"Completed\", \"Not Started\"), " +
                        "suggestedStatus (one of: \"Not Started\", \"In Progress\", \"Completed\"), " +
                        "nextSteps (array of 3-5 specific, actionable strings), " +
                        "risks (array of 0-4 strings), " +
                        "progressUpdateIdeas (array of 2-3 short strings the user could log as their next progress update), " +
                        "timelineAdvice (string). " +
                        "Base every suggestion strictly on the data given, tailor it to the project type, consider the deadline and days left, and treat a long gap since the last update or an empty progress list as a signal. Do not invent facts. Do not include any text outside the JSON object.",
                },
                {
                    role: "user",
                    content: JSON.stringify(projectData),
                },
            ],
        });

        const raw = completion.choices?.[0]?.message?.content;

        if (!raw) {
            return res.status(502).json({ success: false, message: "AI returned an empty response" });
        }

        let suggestion;

        try {
            suggestion = JSON.parse(raw);
        } catch (parseErr) {
            return res.status(502).json({ success: false, message: "AI returned an invalid response" });
        }

        return res.status(200).json({
            success: true,
            projectId: project._id,
            projectName: project.projectName,
            suggestion,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

module.exports = { aiSuggestProject };