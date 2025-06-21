# Cocaine Anonymous Logo Finder
> Many C.A. members, groups and areas use the incorrect C.A. logo. Now they don't have to. This is a full gallery of every appproved C.A. logo.

### Demo
[Demo here](https://cawscit.github.io/logo-finder/). It's not really a demo, it's the live website.

### Technology:
- [x] React.js
- [x] Vite

### Installation and build:
```
npm i
npm run build
```

### The filesystem
.pdf's or .png's, that is the question? In this project we use `.pdf` files as the source of truth. We create transparent `.png` files based off of the `.pdf` files with a script.

### Adding a new logo
Add the `.pdf` file to `src/pdf` and then run the Python script:
```python
# Python environment
python -m venv .venv
source .venv/bin/activate

# Python requirements
pip install -r requirements.txt

# Convert pdf to png and re-create the image list dynamically.
python convert_pdf.py
```

Commit the new .png files. Push to `main` to deploy.

* * *
> **Note**: Please follow the existing naming convention of all the pdf files.
* * *

### Adding a new language
Adding a new language requires adding the language to `languages` and _all_ the files to `imageFiles`. You do this inside the App.jsx file. These are simple JavaScript Arrays of strings.

### Deployment:
Push a change to the `main` branch and GitHub pages will auto-deploy in about 3 minutes.

