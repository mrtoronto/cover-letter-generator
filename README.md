# Cover Letter Generator

A web-based tool that helps generate personalized cover letters using GPT-4o. It analyzes your resume and an example cover letter to match your writing style, then generates a tailored cover letter based on the job description you provide.

## Live Demo

You can use this tool at: https://mrtoronto.github.io/cover-letter-generator/

## Features

- **Smart Cover Letter Generation**: Uses GPT-4o to create personalized, relevant cover letters
- **Three-Paragraph Format**: Generates concise cover letters with:
  - Introduction: Overview of experience and fit
  - Experience Details: Specific relevant experiences
  - Professional Conclusion: Brief closing paragraph
- **Style Matching**: Analyzes your example cover letter to match your writing tone
- **Custom Instructions**: Add specific requirements for tone, content focus, or words to avoid
- **Local Storage**: Saves your templates for future use
- **Privacy Focused**: All data stored locally in your browser

## How to Use

1. **API Key Setup**
   - Enter your OpenAI API key (stored only in your browser's local storage)
   - You can get an API key from your OpenAI account dashboard

2. **Template Setup**
   - Paste your resume for reference
   - Add an example cover letter to match your writing style
   - (Optional) Add custom instructions for tone and content preferences

3. **Generate Cover Letters**
   - Paste the job description you're applying for
   - Click "Generate Cover Letter"
   - Review, edit if needed, and copy to clipboard

## Privacy & Security

- All data (API key, resume, templates) is stored only in your browser's local storage
- No data is stored on any external servers
- Your information is only sent to OpenAI's API when generating a cover letter
- API key is securely stored and only used for OpenAI API calls

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements.

## License

This project is open source and available under the MIT License.
