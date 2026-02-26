<div align="center">
  <img src="https://raw.githubusercontent.com/rakibulsagor/biodatabd/main/biodata%20page%20image/template/weblogo.svg" alt="Biodata BD Logo" width="120" />
  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="85" stroke="#2D89C7" stroke-width="4"/>
  <circle cx="100" cy="100" r="75" stroke="#8DC63F" stroke-width="4"/>
  
  <circle cx="90" cy="85" r="18" fill="#8DC63F"/>
  <circle cx="120" cy="95" r="14" fill="#2D89C7"/>
  
  <path d="M50 140C50 110 90 105 100 125C110 105 150 110 150 140" stroke="#8DC63F" stroke-width="6" stroke-linecap="round"/>
  
  <path d="M90 65C90 55 100 50 105 55C105 60 100 65 95 65" fill="#8DC63F"/>
  <path d="M90 65C85 60 85 50 95 50" fill="#8DC63F"/>
</svg>

</div>

<h1 align="center">Biodata BD</h1>
<p align="center">
  <strong>A beautifully crafted, fully client-side HTML/CSS/JS web application for generating premium Shahi Islamic & Bengali Wedding Biodatas.</strong><br>
  Built to natively export clean, aesthetic Biodata documents directly to PDF in your browser.
</p>

---

## ✨ Key Features

- **No Server Required (100% Client-Side PDF Generation):** 
  Uses `html2pdf.js` to render your final biodata into a high-quality, printable PDF locally. Complete privacy—your data never leaves your browser.
  
- **Dynamic & Smart Form Hooking:** 
  The form is built intelligently. For example, if you leave a field (like "Dadar Bari" or "Occupation") completely blank, it automatically hides itself from the final generated PDF, keeping it clean and professional.
  
- **Interactive Image Cropper:**
  Upload your profile photo and immediately open a custom modal built with `Cropper.js`. Zoom in, zoom out, drag, and crop your image to a perfect 1:1 square for a pristine Biodata finish.
  
- **Dual Language Support (Bengali / English):**
  Forms feature built-in dropdown dictionaries for common occupations, degrees, and addresses in *both* native Bengali and English. Type in either script—it seamlessly handles both.
  
- **Religion-Specific UI & Details:**
  Dynamically adapts your Biodata's header. Selecting 'Islam' adds a beautiful Bismillah inscription at the top, while options exist for Hindu and Christian equivalents.
  
- **Interactive Contact Form Routing (Web3Forms):**
  A live "Contact Us & Feedback" section at the bottom of the landing page. It uses Web3Forms to securely route user submissions directly into a personal email inbox—all on a static deployment.

---

## 🚀 Getting Started

Because **Biodata BD** is an entirely static, single-page application, getting started is extremely straightforward:

1. Clone the repository:
   ```bash
   git clone https://github.com/rakibulsagor/biodatabd.git
   ```
2. Open the directory.
3. Quickly double-click `index.html` to open it locally in your favorite web browser.
4. Fill out the biodata generator, crop an image, and click **Download as PDF**!

---

## 🛠️ Tech Stack & Dependencies

- **HTML5 & CSS3:** For structuring and the heavily customized Shahi Wedding theme styling.
- **Vanilla JavaScript:** Fast, bloat-free DOM manipulation.
- **`html2pdf.js`:** Powers the magic behind converting HTML views seamlessly into downloadable PDFs.
- **`Cropper.js`:** High-performance, interactive photo cropping capabilities.

---

## 📧 Customizing the Feedback Form

If you intend to deploy this website publicly yourself, you will want the static contact form to forward messages to your own email address:

1. Register for an access key at [Web3Forms.com](https://web3forms.com/).
2. Open `index.html` and Ctrl+F for `access_key`.
3. Locate this specific hidden input:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
4. Paste your newly generated key right inside the `value` property. It's safe to use on the frontend.

---

## 🌍 Deployment

You can deploy Biodata BD anywhere that hosts static files for **free**. We recommend:
- **Vercel**
- **GitHub Pages**
- **Netlify**

Simply link this exact repository to the provider, and the `index.html` file will automatically be served on your custom root domain seamlessly!

---

### ❤️ Acknowledgements
*Created and maintained with love by Rakibul Sagor.*

<div align="center">
  <p>
    <a href="https://github.com/rakibulsagor">GitHub</a> &bull;
    <a href="https://linkedin.com">LinkedIn</a> &bull;
    <a href="https://x.com">X (Twitter)</a>
  </p>
</div>
