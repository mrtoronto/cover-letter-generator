# Getting Started

Use VSCode to run the code. Add all these files to a folder then open the folder in VSCode.

This will let you easily edit the text files, run the code and view the output all in one place.

## Installation

Just setup a python environment and install the requirements.

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Setup

- Add your resume to the resume.txt file
    - Just copy and paste the PDF. Don't worry about formatting unless its terribly messed up.
- Add an example cover letter to the cover_letter.txt file
    - GPT copies this format a bit so make sure its a good one
    - If GPT writes you a really good one, you can replace this in the future

## Running the app for a job

Add the job description to the job_description.txt file.

Open `write.ipynb` in Jupyter Notebook and run the cells.

Cover letter will appear in output.txt when its done.

## What does the app do

The app will write a cover letter using the JD, your resume and an example of a cover letter you've written previously.

Its told to keep things concise and in a 3 paragraph format which it normally listens to. 

It does two loops, one to generate the cover letter and one to edit it. You could add additional loops but they will have diminishing returns.

To add additional loops, just add more copies of this line to the bottom of the last code cell in the notebook.

`output = update_letter(new_cover_letter=output)`

Each of these takes in a letter, updates it and outputs a new letter. 
