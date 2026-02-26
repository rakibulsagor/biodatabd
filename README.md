# Biodata BD

A beautifully crafted, fully client-side HTML/CSS/JS web application for generating premium Shahi Islamic/Bengali Wedding Biodatas. Built to seamlessly export clean, aesthetic Biodatas directly to PDF natively in your browser.

## Features
- **Client-Side PDF**: Uses html2pdf.js to render your final biodata into a printable PDF locally. Absolutely no server needed.
- **Dynamic Formatting**: Automatic formatting hooks for inputs. Sections correctly hide themselves if no specific inputs are provided securely.
- **Image Cropper**: Implements Cropper.js for a beautiful custom modal perfectly sizing your images into a 1:1 format.
- **Dual Language**: Supports native Bengali characters and dual script input seamlessly. Forms have dropdown inputs for English & Bengali variants.
- **Form Forwarding**: Integrated Web3Forms contact page linking static feedback to your personal email inbox.

## Getting Started

Because Biodata BD is entirely static, getting started is extremely straightforward:

1. Clone the repository.
2. Open `index.html` in your web browser.
3. Start filling out the biodata generator.

## Customizing Web3Forms
If you are deploying this site yourself, you'll want the contact form to route to your own email:
1. Register for an access key at *Web3Forms.com*.
2. Open `index.html` and search for `access_key`.
3. Paste the key inside the `value` of the hidden input.

## Deployment
Use any static hosting provider. We recommend **Vercel** or **GitHub Pages**. Simply link your repository and the `.html` file will be served on the root domain seamlessly. 

---
### Acknowledgements
Template design and logic provided free for open-source use.
