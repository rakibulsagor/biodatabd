document.addEventListener('DOMContentLoaded', () => {

    // Define the schema for sections
    const schema = {
        personal: [
            { id: 'fullName', label: 'Name / নাম' },
            { id: 'gender', label: 'Gender / লিঙ্গ' },
            { id: 'age', label: 'Age / বয়স' },
            { id: 'height', label: 'Height / উচ্চতা' },
            { id: 'bloodGroup', label: 'Blood Group / রক্ত' },
            { id: 'job', label: 'Occupation / পেশা' },
            { id: 'salary', label: 'Income / আয়' },
            { id: 'maritalStatus', label: 'Marital Status / বৈবাহিক অবস্থা' }
        ],
        family: [
            { id: 'fatherName', label: 'Father / পিতা' },
            { id: 'fatherWork', label: "Father's Job / পিতার পেশা" },
            { id: 'motherName', label: 'Mother / মাতা' },
            { id: 'motherWork', label: "Mother's Job / মাতার পেশা" },
            { id: 'parentsIncome', label: "Parents' Income / পিতা-মাতার আয়" },
            { id: 'familyMembers', label: 'Total Members / সদস্য সংখ্যা' }
        ],
        contact: [
            { id: 'presentAddress', label: 'Present Address / বর্তমান ঠিকানা' }
        ]
    };

    // Prevent non-alphabet characters in names (allows English + Bangla)
    const alphaInputs = document.querySelectorAll('.alpha-only');
    alphaInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^a-zA-Z\u0980-\u09FF\s]/g, '');
        });
    });

    // Format Income with commas
    const incomeInputs = document.querySelectorAll('.income-input');
    incomeInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            // Remove non-digit characters
            let value = this.value.replace(/\D/g, "");
            // Format back with commas if it's a number
            if (value) {
                this.value = Number(value).toLocaleString('en-US');
            } else {
                this.value = "";
            }
        });
    });

    // Height Dropdown Logic
    const heightFt = document.getElementById('height-ft');
    const heightIn = document.getElementById('height-in');
    const heightHidden = document.getElementById('height');

    function updateHeightHidden() {
        if (heightFt && heightIn && heightHidden) {
            if (heightFt.value && heightIn.value) {
                heightHidden.value = heightFt.value + ' ' + heightIn.value;
            } else if (heightFt.value) {
                heightHidden.value = heightFt.value;
            } else {
                heightHidden.value = '';
            }
            // Trigger input event to update the bio-preview array
            heightHidden.dispatchEvent(new Event('input'));
        }
    }

    if (heightFt && heightIn && heightHidden) {
        heightFt.addEventListener('change', updateHeightHidden);
        heightIn.addEventListener('change', updateHeightHidden);
    }

    // Numeric-only input restriction
    document.querySelectorAll('.num-only').forEach(input => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // --- Cascading Address Dropdowns (District -> Upazila) ---
    const zillaSelect = document.getElementById('presentZilla');
    const upazilaSelect = document.getElementById('presentUpazila');
    const addressHidden = document.getElementById('presentAddress');

    function updateAddressHidden() {
        const parts = [];
        const village = document.getElementById('presentVillage');
        if (village && village.value) parts.push(village.value);
        if (upazilaSelect && upazilaSelect.value) parts.push(upazilaSelect.value);
        if (zillaSelect && zillaSelect.value) parts.push(zillaSelect.value);
        parts.push('Bangladesh');
        if (addressHidden) {
            addressHidden.value = parts.join(', ');
            addressHidden.dispatchEvent(new Event('input'));
        }
    }

    // Also update address when village typed
    const villageInput = document.getElementById('presentVillage');
    if (villageInput) villageInput.addEventListener('input', updateAddressHidden);

    if (zillaSelect && typeof geoDistricts !== 'undefined') {
        // Populate districts
        geoDistricts.forEach(dist => {
            const opt = document.createElement('option');
            opt.value = dist;
            opt.textContent = dist;
            zillaSelect.appendChild(opt);
        });

        zillaSelect.addEventListener('change', function () {
            const selectedDist = this.value;
            // Reset upazila
            upazilaSelect.innerHTML = '<option value="">Select Upazila</option>';
            upazilaSelect.disabled = true;

            if (selectedDist && geoUpazilasByDistrict[selectedDist]) {
                geoUpazilasByDistrict[selectedDist].forEach(up => {
                    const opt = document.createElement('option');
                    opt.value = up;
                    opt.textContent = up;
                    upazilaSelect.appendChild(opt);
                });
                upazilaSelect.disabled = false;
            }
            updateAddressHidden();
        });

        upazilaSelect.addEventListener('change', updateAddressHidden);
    }

    // Religion Logo Logic
    const religionSelect = document.getElementById('religion');
    const religionLogo = document.getElementById('religion-logo');
    const bismillahText = document.querySelector('.bismillah');
    if (religionSelect) {
        religionSelect.addEventListener('change', function () {
            const val = this.value;
            if (val === 'Islam') {
                religionLogo.style.display = 'none';
                if (bismillahText) bismillahText.style.display = 'block';
            } else if (val === 'Hindu') {
                religionLogo.src = 'biodata page image/hindu/vecteezy_flower-mandala-with-om-hindu-symbol_12742089.jpg';
                religionLogo.style.display = 'inline-block';
                if (bismillahText) bismillahText.style.display = 'none';
            } else if (val === 'Christian') {
                religionLogo.src = 'biodata page image/christan/vecteezy_religious-cross-with-shine_75640922.jpg';
                religionLogo.style.display = 'inline-block';
                if (bismillahText) bismillahText.style.display = 'none';
            } else {
                religionLogo.style.display = 'none';
                if (bismillahText) bismillahText.style.display = 'none';
            }
        });
    }

    // Render static schema items
    function renderStaticSection(sectionKey, tableId) {
        const table = document.getElementById(tableId);
        if (!table) return;
        table.innerHTML = ''; // clear

        let hasVisibleField = false;

        schema[sectionKey].forEach(item => {
            const el = document.getElementById(item.id);
            if (el && el.value.trim() !== '') {
                hasVisibleField = true;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.label}</td>
                    <td class="colon">:</td>
                    <td class="val">${el.value.trim()}</td>
                `;
                table.appendChild(tr);
            }
        });

        const sectionBlock = document.getElementById(`section-${sectionKey}`);
        if (sectionBlock) {
            sectionBlock.classList.toggle('hidden-section', !hasVisibleField);
        }
    }

    // Render dynamic education section as a specialized table
    function renderEducationSection() {
        const tbody = document.getElementById('table-education-body');
        if (!tbody) return;
        tbody.innerHTML = '';

        let hasVisibleField = false;
        const items = document.querySelectorAll('.education-item');

        items.forEach(item => {
            const nameInput = item.querySelector('.dyn-edu-name');
            const streamInput = item.querySelector('.dyn-edu-stream');
            const gpaInput = item.querySelector('.dyn-edu-gpa');

            if (nameInput && streamInput && gpaInput && (nameInput.value.trim() !== '' || streamInput.value.trim() !== '' || gpaInput.value.trim() !== '')) {
                hasVisibleField = true;

                const tr = document.createElement('tr');
                tr.style.borderBottom = '1px solid #eee';
                tr.innerHTML = `
                    <td style="padding: 0.5rem; vertical-align: middle; color: var(--primary-dark); font-weight: 500;">${nameInput.value.trim() || '-'}</td>
                    <td class="val" style="padding: 0.5rem; vertical-align: middle;">${streamInput.value.trim() || '-'}</td>
                    <td class="val" style="padding: 0.5rem; vertical-align: middle; color: var(--text-main); font-weight: 500;">${gpaInput.value.trim() || '-'}</td>
                `;
                tbody.appendChild(tr);
            }
        });

        const sectionBlock = document.getElementById('section-education');
        if (sectionBlock) {
            sectionBlock.classList.toggle('hidden-section', !hasVisibleField);
        }
    }

    // Render dynamic grandparents/origin section
    function renderOriginSection() {
        const table = document.getElementById('table-origin');
        if (!table) return;
        table.innerHTML = '';

        let hasVisibleField = false;
        const inputs = document.querySelectorAll('.dyn-gp-input');

        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                hasVisibleField = true;
                const label = input.getAttribute('data-gp-label');
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${label}</td>
                    <td class="colon">:</td>
                    <td class="val">${input.value.trim()}</td>
                `;
                table.appendChild(tr);
            }
        });

        const sectionBlock = document.getElementById('section-origin');
        if (sectionBlock) {
            sectionBlock.classList.toggle('hidden-section', !hasVisibleField);
        }
    }

    // Render dynamic families section (siblings, grandparents)
    function renderFamilyMembersSection() {
        const table = document.getElementById('table-family-members');
        if (!table) return;
        table.innerHTML = '';

        let hasVisibleField = false;
        const items = document.querySelectorAll('.family-member-item');

        items.forEach(item => {
            const nameInput = item.querySelector('.dyn-fm-name');
            const relationSelect = item.querySelector('.dyn-fm-relation');
            const ageInput = item.querySelector('.dyn-fm-age');

            if (nameInput && nameInput.value.trim() !== '' && relationSelect.value !== '') {
                hasVisibleField = true;
                const relationLabel = relationSelect.options[relationSelect.selectedIndex].text.split('/')[0].trim();
                const ageText = ageInput.value.trim() ? ` (${ageInput.value.trim()})` : '';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${relationLabel}</td>
                    <td class="colon">:</td>
                    <td class="val">${nameInput.value.trim()}${ageText}</td>
                `;
                table.appendChild(tr);
            }
        });

        const sectionBlock = document.getElementById('section-family-members');
        if (sectionBlock) {
            sectionBlock.classList.toggle('hidden-section', !hasVisibleField);
        }
    }

    // Central render map
    function renderAll() {
        renderStaticSection('personal', 'table-personal');
        renderStaticSection('family', 'table-family');
        renderStaticSection('contact', 'table-contact');
        renderEducationSection();
        renderOriginSection();
        renderFamilyMembersSection();
    }

    // Bind inputs to fire renderAll
    document.getElementById('biodata-form').addEventListener('input', () => {
        renderAll();
    });

    // Initial render
    renderAll();

    // Photo Upload and Crop Logic
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('biodata-photo');
    const cropperModal = document.getElementById('cropper-modal');
    const cropperImage = document.getElementById('cropper-image');
    const cropCancelBtn = document.getElementById('crop-cancel-btn');
    const cropApplyBtn = document.getElementById('crop-apply-btn');
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    let cropper;

    photoUpload.addEventListener('change', function (e) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (event) {
                cropperImage.src = event.target.result;
                cropperModal.style.display = 'flex';

                // Destroy old cropper instance if exists
                if (cropper) {
                    cropper.destroy();
                }

                // Initialize Cropper
                cropper = new Cropper(cropperImage, {
                    aspectRatio: 1, // 1:1 square crop
                    viewMode: 1,    // Restrict crop box to canvas
                    dragMode: 'move', // Allow panning the image
                    autoCropArea: 0.8,
                    guides: true,
                    center: true,
                });
            };
            reader.readAsDataURL(files[0]);
        }
    });

    // Cancel Cropping
    cropCancelBtn.addEventListener('click', () => {
        cropperModal.style.display = 'none';
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        photoUpload.value = ''; // Clean input
    });

    // Zoom Controls
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (cropper) cropper.zoom(0.1);
        });
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (cropper) cropper.zoom(-0.1);
        });
    }

    // Apply Crop
    cropApplyBtn.addEventListener('click', () => {
        if (!cropper) return;

        // Get cropped canvas
        const canvas = cropper.getCroppedCanvas({
            width: 300,
            height: 300,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        });

        // Set preview image source to cropped data URL
        photoPreview.src = canvas.toDataURL('image/jpeg', 0.9);
        photoPreview.style.display = 'inline-block';

        // Close modal and cleanup
        cropperModal.style.display = 'none';
        cropper.destroy();
        cropper = null;
    });

    // Add Dynamic Education Buttons
    document.getElementById('add-edu-btn').addEventListener('click', () => {
        const container = document.getElementById('education-container');
        const div = document.createElement('div');
        div.className = 'input-grid education-item margin-top';
        div.innerHTML = `
            <div class="input-field">
                <label>Qualification Name (E.g. S.S.C / সমমান)</label>
                <input type="text" class="dyn-edu-name" placeholder="E.g. S.S.C" oninput="this.nextElementSibling.setAttribute('data-edu-label', this.value)" list="edu-name-suggestions">
                <input type="hidden" class="dyn-edu-label-temp" data-edu-label="S.S.C">
            </div>
            <div class="input-field">
                <label>Group / Subject (E.g. Science / বিজ্ঞান)</label>
                <input type="text" class="dyn-edu-stream" placeholder="Science" list="edu-stream-suggestions">
            </div>
            <div class="input-field span-full">
                <label>Result / Grade (E.g. GPA 5.00)</label>
                <input type="text" class="dyn-edu-gpa" placeholder="GPA 5.00">
            </div>
        `;
        container.appendChild(div);
    });

    // Add Dynamic Grandparents Buttons
    const addGpBtn = document.getElementById('add-gp-btn');
    if (addGpBtn) {
        addGpBtn.addEventListener('click', () => {
            const container = document.getElementById('grandparents-container');
            const div = document.createElement('div');
            div.className = 'input-grid gp-item margin-top';
            div.innerHTML = `
                <div class="input-field span-full">
                    <label>Relation Origin (E.g. Fupur Bari)</label>
                    <input type="text" class="dyn-gp-label-temp" placeholder="Fupur Bari" oninput="this.nextElementSibling.setAttribute('data-gp-label', this.value)">
                    <input type="text" class="dyn-gp-input margin-top" data-gp-label="Fupur Bari" placeholder="Sylhet">
                </div>
            `;
            container.appendChild(div);
        });
    }

    // Add Dynamic Family Member Buttons
    const addFamilyBtn = document.getElementById('add-family-member-btn');
    if (addFamilyBtn) {
        addFamilyBtn.addEventListener('click', () => {
            const container = document.getElementById('family-member-container');
            const div = document.createElement('div');
            div.className = 'input-grid family-member-item margin-top';
            div.innerHTML = `
                <div class="input-field">
                    <label>Relation / সম্পর্ক</label>
                    <select class="dyn-fm-relation">
                        <option value="">Select / নির্বাচন করুন</option>
                        <option value="Brother">Brother / ভাই</option>
                        <option value="Sister">Sister / বোন</option>
                        <option value="Dada">Dada (Paternal Grandfather) / দাদা</option>
                        <option value="Dadi">Dadi (Paternal Grandmother) / দাদি</option>
                        <option value="Nana">Nana (Maternal Grandfather) / নানা</option>
                        <option value="Nani">Nani (Maternal Grandmother) / নানি</option>
                    </select>
                </div>
                <div class="input-field">
                    <label>Name / নাম</label>
                    <input type="text" class="dyn-fm-name alpha-only" placeholder="Name">
                </div>
                <div class="input-field span-full">
                    <label>Age / বয়স (Optional)</label>
                    <input type="text" class="dyn-fm-age" placeholder="Age (will show in brackets)">
                </div>
            `;
            // Rebind alpha only validation for new inputs (allows English + Bangla)
            const nameInp = div.querySelector('.dyn-fm-name');
            nameInp.addEventListener('input', function () {
                this.value = this.value.replace(/[^a-zA-Z\u0980-\u09FF\s]/g, '');
            });
            container.appendChild(div);
        });
    }

    // PDF Generation
    const downloadBtn = document.getElementById('download-btn-top');
    downloadBtn.addEventListener('click', () => {
        const genderInput = document.getElementById('gender');
        if (!genderInput.value) {
            alert('Please select a Gender before generating the PDF.');
            genderInput.focus();
            return;
        }

        const element = document.getElementById('biodata-document');

        const opt = {
            margin: 0,
            filename: 'Wedding_Biodata.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        element.classList.add('generating-pdf');

        html2pdf().set(opt).from(element).save().then(() => {
            element.classList.remove('generating-pdf');
        });
    });

    // Feedback Form Submission Limiter via LocalStorage
    const feedbackForm = document.getElementById('web3-feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const messageEl = document.getElementById('feedback-form-message');
            const today = new Date().toLocaleDateString();

            // Get local storage tracking object
            let feedbackTracking = JSON.parse(localStorage.getItem('biodataFeedbackTracking')) || {};

            // Check if this is a new day, clear tracking if so
            if (feedbackTracking.date !== today) {
                feedbackTracking = { date: today, count: 0 };
            }

            // Limit to 3 per day
            if (feedbackTracking.count >= 3) {
                messageEl.textContent = 'You have reached the maximum of 3 feedbacks per day. Please try again tomorrow!';
                messageEl.style.display = 'block';
                return;
            }

            // Allow Submission, but hijacking the submit to do it via fetch instead of redirect
            messageEl.textContent = 'Sending...';
            messageEl.style.color = '#333';
            messageEl.style.display = 'block';

            const formData = new FormData(feedbackForm);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    messageEl.textContent = 'Thank you for your feedback! It was sent successfully.';
                    messageEl.style.color = 'green';

                    // Increment and save tracking limit
                    feedbackTracking.count++;
                    localStorage.setItem('biodataFeedbackTracking', JSON.stringify(feedbackTracking));

                    feedbackForm.reset();
                } else {
                    messageEl.textContent = 'Something went wrong, please try again.';
                    messageEl.style.color = 'red';
                }
            }).catch(err => {
                messageEl.textContent = 'Network error. Please try again later.';
                messageEl.style.color = 'red';
            });
        });
    }
});
