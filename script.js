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

    // Load Address Suggestions into Datalist from geo-data.js
    const addressDataList = document.getElementById('address-suggestions');
    if (addressDataList && typeof geoPlaces !== 'undefined') {
        const fragment = document.createDocumentFragment();
        geoPlaces.forEach(place => {
            const option = document.createElement('option');
            option.value = place;
            fragment.appendChild(option);
        });
        addressDataList.appendChild(fragment);
    }

    // Religion Logo Logic
    const religionSelect = document.getElementById('religion');
    const religionLogo = document.getElementById('religion-logo');
    const bismillahText = document.querySelector('.bismillah');
    if (religionSelect) {
        religionSelect.addEventListener('change', function () {
            const val = this.value;
            if (val === 'Islam') {
                religionLogo.src = 'biodata page image/islam/vecteezy_mordern-islamic-logo-illustration-black-and-white_.jpg';
                religionLogo.style.display = 'inline-block';
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

    // Render dynamic education section
    function renderEducationSection() {
        const table = document.getElementById('table-education');
        if (!table) return;
        table.innerHTML = '';

        let hasVisibleField = false;
        const items = document.querySelectorAll('.education-item');

        items.forEach(item => {
            const nameInput = item.querySelector('.dyn-edu-name');
            const streamInput = item.querySelector('.dyn-edu-stream');
            const gpaInput = item.querySelector('.dyn-edu-gpa');

            if (nameInput && streamInput && gpaInput && (nameInput.value.trim() !== '' || streamInput.value.trim() !== '' || gpaInput.value.trim() !== '')) {
                hasVisibleField = true;
                const label = nameInput.value.trim() || 'Qualification';

                const parts = [];
                if (streamInput.value.trim()) parts.push(streamInput.value.trim());
                if (gpaInput.value.trim()) parts.push(gpaInput.value.trim());
                const fullValue = parts.join(', ');

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${label}</td>
                    <td class="colon">:</td>
                    <td class="val">${fullValue}</td>
                `;
                table.appendChild(tr);
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

    // Photo Upload Logic
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('biodata-photo');

    photoUpload.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'inline-block';
            }
            reader.readAsDataURL(this.files[0]);
        } else {
            photoPreview.style.display = 'none';
        }
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
});
