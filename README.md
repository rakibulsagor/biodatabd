# Biodata BD

A beautifully designed, bilingual (English & Bangla) static web application for generating high-quality Shahi-themed wedding biodatas instantly.

![Biodata BD Preview](biodata%20page%20image/template)

## Features

- **Dual Language Support:** Separate interfaces for English (`index.html`) and Bangla (`bangla.html`) to ensure a native experience and strict input validation.
- **Real-Time Preview:** As you fill out the form, the elegant Biodata document automatically populates on the right side of the screen.
- **Image Cropper:** Built-in photo cropper functionality (via `Cropper.js`) ensures your profile picture is perfectly squared and zoomed before placing it onto the template.
- **Instant PDF Download:** Generates a high-quality, print-ready A4 PDF directly from the browser (via `html2pdf.js`) without needing a backend server.
- **Dynamic Fields:** Add as many Educational Qualifications and Extended Family Members as needed with a single click.
- **Address Auto-Suggestions:** Built-in datalist suggestions for districts and upazilas to speed up typing.
- **Feedback System:** Integrated Contact/Feedback form powered securely by Web3Forms.

## How to Run Locally

Since this is a fully static website (HTML/CSS/JS), there is no complex build process required.

1. Clone the repository:
   ```bash
   git clone https://github.com/rakibulsagor/biodatabd.git
   ```
2. Navigate to the folder:
   ```bash
   cd biodatabd
   ```
3. Open `index.html` in your favorite web browser:
   - On Windows: Double-click `index.html`
   - On Mac: `open index.html`
   - On Linux: `chromium index.html` or `google-chrome index.html`
   
*(Alternatively, you can run a local server using `python3 -m http.server 8080` if you want to test over a local network.)*

## Usage Details

- **English Mode:** Go to `index.html`, select "English" at the top. All labels, suggestions, and output text will be in English. Name fields will only allow English characters.
- **Bangla Mode:** Go to `bangla.html`, select "বাংলা" at the top. All labels, suggestions, and output text will be in Bengali (`শাহী বায়োডাটা`). Name fields will strictly enforce Bengali characters.
- **Image Cropping:** Upload a `.jpg` or `.png`. A modal will appear allowing you to drag the image and use the `+` / `-` buttons to zoom. Click "Crop & Apply".
- **Exporting:** Ensure you have selected a "Gender" (compulsory) and click the **Download PDF** button at the top of the form. 

## Credits & Dependencies

- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - Client-side HTML-to-PDF rendering.
- [Cropper.js](https://fengyuanchen.github.io/cropperjs/) - Client-side image cropping layout.
- [Web3Forms](https://web3forms.com/) - Static site email handler for the Feedback section.
- Fonts: Custom Bengali fonts (`ArafaBangla`, `MasudNandonik`, `FNJagat`), and Google Fonts (`Playfair Display`, `Outfit`, `Amiri`).

## Developer setup & Contact

Developed and maintained by Rakibul Sagor.

- LinkedIn: [Your Profile](https://linkedin.com)
- GitHub: [rakibulsagor](https://github.com/rakibulsagor)
- X (Twitter): [Your Handle](https://x.com)
