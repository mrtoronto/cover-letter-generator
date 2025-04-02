// Local Storage Keys
const STORAGE_KEYS = {
    API_KEY: 'openai_api_key',
    RESUME: 'resume_template',
    COVER_LETTER: 'cover_letter_template',
    CUSTOM_INSTRUCTIONS: 'custom_instructions'
};

// Add default file contents as constants
const DEFAULT_FILES = {
    resume: `MATTHEW TORONTO
Berkeley, CA 94704
508-439-1180     Matt.toronto97@gmail.com
https://github.com/mrtoronto

https://www.linkedin.com/in/matthewtoronto/

EXPERIENCE
Machine Learning Engineer, Evaluate.market, Boston, MA	01/21 – 09/23
[... rest of resume content ...]`,

    coverLetter: `Dear Hiring Team at ZORA,

I am excited to apply for the Data Scientist role. With my blend of experience in machine learning, data analysis and blockchain technology, I believe I can make a significant impact on your team.

[... rest of cover letter content ...]`,

    jobDescription: `About the job
About Us

Flagship Pioneering is a biotechnology company that invents and builds platform companies that change the world. We bring together the greatest scientific minds with entrepreneurial company builders and assemble the capital to allow them to take courageous leaps.

[... rest of job description content ...]`,

    customInstructions: `- Make sure to emphasize my role at ______.
- Mention that I want to work on _____ and learn ______.
- Do not use the following words and phrases:
    - Thrilled
    - Overjoyed
    - Synergy
    - Tenure`
};

// Load saved data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
});

// Load data from localStorage
function loadSavedData() {
    const apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);
    const resume = localStorage.getItem(STORAGE_KEYS.RESUME);
    const coverLetter = localStorage.getItem(STORAGE_KEYS.COVER_LETTER);
    const customInstructions = localStorage.getItem(STORAGE_KEYS.CUSTOM_INSTRUCTIONS);

    if (apiKey) {
        document.getElementById('apiKey').value = apiKey;
        showContentSections();
    } else {
        hideContentSections();
    }
    
    if (resume) document.getElementById('resumeTemplate').value = resume;
    if (coverLetter) document.getElementById('coverLetterTemplate').value = coverLetter;
    if (customInstructions) document.getElementById('customInstructions').value = customInstructions;
}

// Save API Key
function saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }
    localStorage.setItem(STORAGE_KEYS.API_KEY, apiKey);
    showContentSections();
    alert('API key saved successfully!');
}

// Save Resume
function saveResume() {
    const resume = document.getElementById('resumeTemplate').value.trim();
    if (!resume) {
        alert('Please enter a resume');
        return;
    }
    localStorage.setItem(STORAGE_KEYS.RESUME, resume);
    alert('Resume saved successfully!');
}

// Save Cover Letter
function saveCoverLetter() {
    const coverLetter = document.getElementById('coverLetterTemplate').value.trim();
    if (!coverLetter) {
        alert('Please enter an example cover letter');
        return;
    }
    localStorage.setItem(STORAGE_KEYS.COVER_LETTER, coverLetter);
    alert('Cover letter template saved successfully!');
}

// Save Custom Instructions
function saveCustomInstructions() {
    const customInstructions = document.getElementById('customInstructions').value.trim();
    if (!customInstructions) {
        alert('Please enter custom instructions');
        return;
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INSTRUCTIONS, customInstructions);
    alert('Custom instructions saved successfully!');
}

// Copy generated cover letter to clipboard
function copyToClipboard() {
    const generatedText = document.getElementById('generatedCoverLetter');
    generatedText.select();
    document.execCommand('copy');
    alert('Cover letter copied to clipboard!');
}

// Generate Cover Letter
async function generateCoverLetter() {
    const apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY);
    if (!apiKey) {
        alert('Please save your OpenAI API key first');
        return;
    }

    const resume = document.getElementById('resumeTemplate').value.trim();
    const coverLetter = document.getElementById('coverLetterTemplate').value.trim();
    const jobDescription = document.getElementById('jobDescription').value.trim();
    const customInstructions = document.getElementById('customInstructions').value.trim();

    if (!resume || !coverLetter || !jobDescription) {
        alert('Please fill in all required fields (resume, example cover letter, and job description)');
        return;
    }

    const generateButton = document.querySelector('button[onclick="generateCoverLetter()"]');
    const originalText = generateButton.textContent;
    generateButton.textContent = 'Generating...';
    generateButton.disabled = true;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `You are CoverLetterGPT. You are trained to help users write effective, concise cover letters for jobs based on their experiences and the job description. 

You write concise, 3 paragraph cover letters communicating user's skills. Even if the provided example cover letter is longer than 3 paragraphs, you only write 3 concise paragraphs.
    
The 3 paragraphs in your cover letters have the following content:
- introduction
    - Broadly describe the user's experience and why they are a good fit for the job. Mention relevant previous work without going into too much detail
- experiences
    - Specifically describe the user's experiences and how they relate to the job description. Mention relevant previous work in detail
- conclusion
    - Thank the hiring manager for their time and express interest in the job. Keep this simple and concise.

You do not write more than 3 concise paragraphs. 

You copy the tone of the author of the example cover letter provided to you. Try to use a similar level of formality and professionalism as the example cover letter. 

You do not copy the length of the example cover letter. You only write 3 concise paragraphs.
    
Relate the user's experience to the job description and make the user sounds like a good fit for the job without making up experiences they had or requirements not mentioned in the job description. 

Make sure to not overstate the user's experience and refer to the resume and job description for details.
    
Output the entire cover letter to the user so they can copy and paste it. Be concise, engaging and professional. 

Do not write more than 3 concise paragraphs.`
                    },
                    {
                        role: 'user',
                        content: `Here's my resume:\n\n${resume}`
                    },
                    {
                        role: 'user',
                        content: `Here's an example cover letter I wrote for another job I applied for:\n\n${coverLetter}`
                    },
                    ...(customInstructions.trim() ? [{
                        role: 'user',
                        content: `Please follow these additional instructions when writing the cover letter:\n\n${customInstructions}`
                    }] : []),
                    {
                        role: 'user',
                        content: `Please write me a 3 paragraph cover letter for this job:\n\n${jobDescription}`
                    }
                ],
                temperature: 0.2,
                max_tokens: 1000,
                frequency_penalty: 0.2,
                presence_penalty: 0.2
            })
        });

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        const generatedText = data.choices[0].message.content.trim();
        document.getElementById('generatedCoverLetter').value = generatedText;

    } catch (error) {
        alert(`Error generating cover letter: ${error.message}`);
    } finally {
        generateButton.textContent = originalText;
        generateButton.disabled = false;
    }
}

// Add this new function for removing API key
function removeApiKey() {
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
    document.getElementById('apiKey').value = '';
    hideContentSections();
    alert('API key removed successfully!');
}

// Add this function to control content visibility
function hideContentSections() {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        if (!section.classList.contains('api-key-section')) {
            section.style.display = 'none';
        }
    });
}

function showContentSections() {
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'block';
    });
}

// Modify the useDefaultFile function to use the constants
function useDefaultFile(type) {
    let content;
    let targetElement;
    
    switch(type) {
        case 'resume':
            content = DEFAULT_FILES.resume;
            targetElement = 'resumeTemplate';
            break;
        case 'coverLetter':
            content = DEFAULT_FILES.coverLetter;
            targetElement = 'coverLetterTemplate';
            break;
        case 'jobDescription':
            content = DEFAULT_FILES.jobDescription;
            targetElement = 'jobDescription';
            break;
        case 'customInstructions':
            content = DEFAULT_FILES.customInstructions;
            targetElement = 'customInstructions';
            break;
        default:
            return;
    }

    try {
        document.getElementById(targetElement).value = content;
    } catch (error) {
        alert(`Error loading default ${type}: ${error.message}`);
    }
} 