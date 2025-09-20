# Developer documentation

## Technology:
- [x] React.js
- [x] Vite
- [x] Python

### Installation and build:
```
npm i
npm run build
```

### The filesystem
.pdf's or .png's, that is the question? In this project we use `.pdf` files as the source of truth. We create transparent `.png` files based off of the `.pdf` files with a script.

### Adding a new logo
Add the `.pdf` file to `public/pdf` and then run the Python script:
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

> **Note**: This is an open source repository, but pull requests may not be approved.

### File naming convention
> This is _very_ important to follow.

File naming is very important. We follow this structure:
```
{Language} - {Color} Outline - {Color} Background - {Inner/Outer} {TM/R}.pdf
```

Some examples would be:
```
English - White Outline - Green Background - Inner R.pdf
Danish - Green Outline - White Background - Outer TM.pdf
```
