# Cover Letter Generator

This tool helps generate personalized cover letters using GPT-4. It analyzes your resume and an example cover letter to match your writing style, then generates a tailored cover letter based on the job description you provide.

## Web Version (GitHub Pages)

You can use the web version of this tool directly at: `https://[your-github-username].github.io/cover-letter-generator`

To use the web version:

1. Visit the website
2. Enter your OpenAI API key (stored only in your browser's local storage)
3. Paste your resume and an example cover letter (these will be saved for future use)
4. Paste the job description you want to create a cover letter for
5. Click "Generate Cover Letter"

Your data is stored locally in your browser and is only sent to OpenAI's API for generation.

## Local Notebook Version

If you prefer to run the tool locally using Jupyter Notebook:

1. Clone this repository:
```bash
git clone https://github.com/[your-username]/cover-letter-generator.git
cd cover-letter-generator
```

2. Install the required packages:
```bash
pip install -r requirements.txt
```

3. Create a `local_settings.py` file with your OpenAI API key:
```python
OPENAI_API_KEY_GPT4 = "your-api-key-here"
```

4. Update the following files with your information:
- `resume.txt`: Your resume
- `cover_letter.txt`: An example cover letter you've written
- `job_description.txt`: The job description you want to create a cover letter for

5. Run the Jupyter notebook:
```bash
jupyter notebook write.ipynb
```

## Features

- Uses GPT-4 for high-quality cover letter generation
- Maintains your writing style by analyzing an example cover letter
- Generates concise, three-paragraph cover letters
- Ensures relevance by analyzing both your resume and the job description
- Avoids overstating qualifications or making up experiences

## Privacy

- The web version stores all data locally in your browser
- Your API key and personal information are never stored on any server
- Data is only sent to OpenAI's API for cover letter generation

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements.

## License

This project is open source and available under the MIT License.
