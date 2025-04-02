// Local Storage Keys
const STORAGE_KEYS = {
    API_KEY: 'openai_api_key',
    RESUME: 'resume_template',
    COVER_LETTER: 'cover_letter_template',
    CUSTOM_INSTRUCTIONS: 'custom_instructions'
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
    const instructions = document.getElementById('customInstructions').value.trim();
    localStorage.setItem(STORAGE_KEYS.CUSTOM_INSTRUCTIONS, instructions);
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

Do not write more than 3 concise paragraphs.

${customInstructions ? `Additional Instructions from the user:\n${customInstructions}` : ''}`
                    },
                    {
                        role: 'user',
                        content: `Here's my resume:\n\n${resume}`