// Local Storage Keys
const STORAGE_KEYS = {
    OPENAI_API_KEY: 'openai_api_key',
    ANTHROPIC_API_KEY: 'anthropic_api_key',
    RESUME: 'resume_template',
    COVER_LETTER: 'cover_letter_template',
    CUSTOM_INSTRUCTIONS: 'custom_instructions',
    SELECTED_MODEL: 'selected_model'
};

// Model configurations
const MODEL_CONFIG = {
    openai_models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4.1'],
    anthropic_models: ['claude-sonnet-4-20250514', 'claude-opus-4-20250514']
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

// Function to toggle API key visibility
function toggleApiKeyVisibility(type) {
    const apiKeyInput = document.getElementById(type === 'openai' ? 'openaiApiKey' : 'anthropicApiKey');
    const eyeIcon = apiKeyInput.nextElementSibling.querySelector('i');
    
    if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        apiKeyInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Load saved data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    
    // Add event listener for generate button
    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', generateCoverLetter);
});

// Load data from localStorage
function loadSavedData() {
    const openaiApiKey = localStorage.getItem(STORAGE_KEYS.OPENAI_API_KEY);
    const anthropicApiKey = localStorage.getItem(STORAGE_KEYS.ANTHROPIC_API_KEY);
    const resume = localStorage.getItem(STORAGE_KEYS.RESUME);
    const coverLetter = localStorage.getItem(STORAGE_KEYS.COVER_LETTER);
    const customInstructions = localStorage.getItem(STORAGE_KEYS.CUSTOM_INSTRUCTIONS);
    const selectedModel = localStorage.getItem(STORAGE_KEYS.SELECTED_MODEL);

    if (openaiApiKey) {
        document.getElementById('openaiApiKey').value = openaiApiKey;
    }
    
    if (anthropicApiKey) {
        document.getElementById('anthropicApiKey').value = anthropicApiKey;
    }
    
    if (selectedModel) {
        document.getElementById('modelSelect').value = selectedModel;
    }
    
    // Show content sections if at least one API key is available
    if (openaiApiKey || anthropicApiKey) {
        showContentSections();
    } else {
        hideContentSections();
    }
    
    if (resume) document.getElementById('resumeTemplate').value = resume;
    if (coverLetter) document.getElementById('coverLetterTemplate').value = coverLetter;
    if (customInstructions) document.getElementById('customInstructions').value = customInstructions;
}

// Save OpenAI API Key
function saveOpenAIApiKey() {
    const apiKey = document.getElementById('openaiApiKey').value.trim();
    if (!apiKey) {
        alert('Please enter an OpenAI API key');
        return;
    }
    localStorage.setItem(STORAGE_KEYS.OPENAI_API_KEY, apiKey);
    showContentSections();
    alert('OpenAI API key saved successfully!');
}

// Save Anthropic API Key
function saveAnthropicApiKey() {
    const apiKey = document.getElementById('anthropicApiKey').value.trim();
    if (!apiKey) {
        alert('Please enter an Anthropic API key');
        return;
    }
    localStorage.setItem(STORAGE_KEYS.ANTHROPIC_API_KEY, apiKey);
    showContentSections();
    alert('Anthropic API key saved successfully!');
}

// Remove OpenAI API Key
function removeOpenAIApiKey() {
    localStorage.removeItem(STORAGE_KEYS.OPENAI_API_KEY);
    document.getElementById('openaiApiKey').value = '';
    
    // Check if we still have any API keys
    const anthropicApiKey = localStorage.getItem(STORAGE_KEYS.ANTHROPIC_API_KEY);
    if (!anthropicApiKey) {
        hideContentSections();
    }
    
    alert('OpenAI API key removed successfully!');
}

// Remove Anthropic API Key
function removeAnthropicApiKey() {
    localStorage.removeItem(STORAGE_KEYS.ANTHROPIC_API_KEY);
    document.getElementById('anthropicApiKey').value = '';
    
    // Check if we still have any API keys
    const openaiApiKey = localStorage.getItem(STORAGE_KEYS.OPENAI_API_KEY);
    if (!openaiApiKey) {
        hideContentSections();
    }
    
    alert('Anthropic API key removed successfully!');
}

// Handle model selection change
function updateModelSelection() {
    const selectedModel = document.getElementById('modelSelect').value;
    localStorage.setItem(STORAGE_KEYS.SELECTED_MODEL, selectedModel);
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
    const generateButton = document.getElementById('generateButton');
    
    // Prevent multiple clicks
    if (generateButton.disabled) {
        return;
    }

    const selectedModel = document.getElementById('modelSelect').value;
    const openaiApiKey = localStorage.getItem(STORAGE_KEYS.OPENAI_API_KEY);
    const anthropicApiKey = localStorage.getItem(STORAGE_KEYS.ANTHROPIC_API_KEY);
    
    // Check if we have the required API key for the selected model
    const isOpenAIModel = MODEL_CONFIG.openai_models.includes(selectedModel);
    const isAnthropicModel = MODEL_CONFIG.anthropic_models.includes(selectedModel);
    
    if (isOpenAIModel && !openaiApiKey) {
        alert('Please save your OpenAI API key first to use GPT models');
        return;
    }
    
    if (isAnthropicModel && !anthropicApiKey) {
        alert('Please save your Anthropic API key first to use Claude models');
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

    const originalText = generateButton.textContent;
    generateButton.textContent = 'Generating...';
    generateButton.disabled = true;
    generateButton.classList.add('opacity-50', 'cursor-not-allowed');

    // Clear existing generated text
    document.getElementById('generatedCoverLetter').value = '';

    try {
        let generatedText;
        
        if (isOpenAIModel) {
            generatedText = await callOpenAI(selectedModel, openaiApiKey, resume, coverLetter, jobDescription, customInstructions);
        } else if (isAnthropicModel) {
            generatedText = await callAnthropic(selectedModel, anthropicApiKey, resume, coverLetter, jobDescription, customInstructions);
        } else {
            throw new Error(`Unknown model: ${selectedModel}`);
        }

        document.getElementById('generatedCoverLetter').value = generatedText;

    } catch (error) {
        alert(`Error generating cover letter: ${error.message}`);
    } finally {
        // Always restore the button state, even if there's an error
        generateButton.textContent = originalText;
        generateButton.disabled = false;
        generateButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Call OpenAI API
async function callOpenAI(model, apiKey, resume, coverLetter, jobDescription, customInstructions) {
    const messages = [
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
        }
    ];
    
    if (customInstructions.trim()) {
        messages.push({
            role: 'user',
            content: `Please follow these additional instructions when writing the cover letter:\n\n${customInstructions}`
        });
    }
    
    messages.push({
        role: 'user',
        content: `Please write me a 3 paragraph cover letter for this job:\n\n${jobDescription}`
    });

    const requestBody = {
        model: model,
        messages: messages,
        temperature: 0.2,
        max_tokens: 1000,
        frequency_penalty: 0.2,
        presence_penalty: 0.2
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('OpenAI API Error:', errorText);
            throw new Error(`OpenAI API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('OpenAI API call failed:', error);
        throw error;
    }
}

// Call Anthropic API
async function callAnthropic(model, apiKey, resume, coverLetter, jobDescription, customInstructions) {
    const systemPrompt = `You are CoverLetterGPT. You are trained to help users write effective, concise cover letters for jobs based on their experiences and the job description. 

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

Do not write more than 3 concise paragraphs.`;

    let userContent = `Here's my resume:\n\n${resume}\n\nHere's an example cover letter I wrote for another job I applied for:\n\n${coverLetter}`;
    
    if (customInstructions.trim()) {
        userContent += `\n\nPlease follow these additional instructions when writing the cover letter:\n\n${customInstructions}`;
    }
    
    userContent += `\n\nPlease write me a 3 paragraph cover letter for this job:\n\n${jobDescription}`;

    const requestBody = {
        model: model,
        max_tokens: 1000,
        temperature: 0.2,
        system: systemPrompt,
        messages: [
            {
                role: 'user',
                content: userContent
            }
        ]
    };

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Anthropic API Error:', errorText);
            throw new Error(`Anthropic API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.content[0].text.trim();
    } catch (error) {
        console.error('Anthropic API call failed:', error);
        
        // If it's a network/CORS error, provide helpful message
        if (error.message.includes('Failed to fetch') || error.message.includes('Invalid value')) {
            throw new Error('Network error: This might be due to CORS restrictions. Consider using a backend proxy for API calls.');
        }
        
        throw error;
    }
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