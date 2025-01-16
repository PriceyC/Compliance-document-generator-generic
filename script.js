let companies = {
    "LTD Company": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)."
    ],
    "Partnership": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)."
    ],
    "Trust": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)."
    ],
    "Charity": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)." 
    ],
    "Retirement Benefit Schemes": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)." 
    ],
    "Deceased Client": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)." 
    ],
    "Council": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)." 
    ],
    "Social Housing": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)."
    ],
    "Club/Society": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)." 
    ],
    "Regulated Financial Institutions": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)."
    ],
    "Public Listed Companies": [
        "What is the yearly revenue?",
        "What is the nature of business?",
        "Please provide the email addresses/company numbers for the above individuals or entities.",
        "Is there any further information you would like the compliance team to know? i.e. any overseas individuals, any pending transfers of shares etc.",
        "What is the registered address?",
        "Who is the Instructing officer? Please provide their email address (if listed above please put N/A)."
    ]
};

let templateHTML = `
    <div class="doc-information">
            <h2>Reference Information</h2>
            <p>This information is a requirement to generate a document.</p>
            <div class="user-inputs">
                <label for="first-name">Fee Earner Name: </label>
                <input id="first-name" type="text">
                <label for="last-name">Secretary Name: </label>
                <input id="last-name" type="text">
                <label for="company-name">Client Name: </label>
                <input id="company-name" for="company-name" type="text">
            </div>
        </div>

        <div class="container">
            <h1>Company Information</h1>
            <label for="company-type">Select Client Type:</label>
            <select id="company-type">
                <option value="" disabled selected>Select an option</option>
            </select>

            <div id="questions-container" class="questions"></div>
            
            <button id="preview" type="button">Review your document</button>
        </div>

        <div id="previewModal" class="modal" style="display:none;">
            <div class="modal-content">
                <button id="closeModal">x</button>
                <h2>Preview</h2>
                <p>Please review all information before generating your document</p>
                <div id="previewContent"></div>
                <button id="Generate" type="button">Generate file</button>
            </div>
        </div>
`

let username = '';
let password = '';

// Fetch environment variables from the API
fetch('/api/getEnv')
    .then((response) => response.json())
    .then((env) => {
        username = env.username;
        password = env.password;
    })
    .catch((error) => {
        console.error('Failed to load environment variables:', error);
    });

function startApp(){
    let mainContainer = document.getElementById('main');
    let authenticate = document.getElementById('authentication')
    let log_in = document.getElementById("submit");
    let userInput = document.getElementById("username")
    let passInput = document.getElementById("password")
    
    log_in.addEventListener('click', (event)=>{
        if(userInput.value == username && passInput.value == password){
            event.preventDefault();
            authenticate.remove();
            mainContainer.innerHTML = templateHTML;

            generateDocumentWithDocxtemplater();
            populateCompanies();
            document.getElementById("company-type").addEventListener("change", displayQuestions);
            document.getElementById("preview").addEventListener("click", showPreview);
            document.getElementById("closeModal").addEventListener("click", closeModal);
        } else{
            alert("Incorrect username/password!")
        } 
    })
}

function populateCompanies(){
    const menuContainer = document.getElementById('company-type');
    for(let companyType in companies){
        let option = document.createElement('option');
        option.value = companyType; 
        option.textContent = companyType; 
        menuContainer.appendChild(option);
    }
}

function displayQuestions() {
    const companyType = document.getElementById('company-type').value;
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = ''; // Clear previous questions

    if (companies[companyType]) {
        companies[companyType].forEach((question, index) => {
            const label = document.createElement('label');
            label.setAttribute('for', `question${index + 1}`);
            label.textContent = question;
            label.classList.add('question');

            const textarea = document.createElement('textarea');
            textarea.id = `question${index + 1}`;
            textarea.classList.add('answer');

            questionsContainer.appendChild(label);
            questionsContainer.appendChild(textarea);
        });
    } else {
        questionsContainer.textContent = "No questions available for this company type.";
    }
}

function generateDocumentWithDocxtemplater() {
    document.getElementById("Generate").addEventListener("click", () => {
        if (!validateInputs()) return;

        const companyTypeElement = document.getElementById("company-type");
        const selectedType = companyTypeElement ? companyTypeElement.value : '';

        const questions = [];
        document.querySelectorAll(".answer").forEach((textarea, index) => {
            const questionText = document.querySelectorAll(".question")[index].textContent;
            questions.push({ question: questionText, answer: textarea.value });
        });

        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("last-name").value.trim();
        const companyName = document.getElementById("company-name").value.trim();

        if (selectedType && questions.length > 0) {
            const inputs = { 
                'first-name': firstName || "N/A",
                'last-name': lastName || "N/A",
                'company-name': companyName || "N/A",
                'company-type': selectedType, 
                'questions': questions 
            };

            loadFile('TemplateTest.docx', (error, content) => {
                if (error) {
                    console.error("Error loading template:", error);
                    return;
                }
                const zip = new PizZip(content);
                const doc = new window.docxtemplater(zip, {
                    paragraphLoop: true,
                    linebreaks: true,
                });

                doc.render(inputs);  // Set data into the template

                try {
                    const blob = doc.getZip().generate({
                        type: "blob",
                        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        compression: "DEFLATE",
                    });
                    saveAs(blob, `${companyName}_CIDV-form.docx`);
                    alert("Document generated!");
                    closeModal();
                } catch (error) {
                    console.error('Error generating document:', error);
                }
            });
        } else {
            console.error('Please select a company type and provide answers.');
        }
    });
}

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

function validateInputs() {
    const inputs = document.querySelectorAll("input, select, textarea");
    for (const input of inputs) {
        if (!input.value.trim()) {
            alert("Please fill out all fields.");
            return false;
        }
    }
    return true;
}

function showPreview() {
    if (!validateInputs()) return;

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const companyName = document.getElementById("company-name").value;
    const companyType = document.getElementById("company-type").value;

    // Collect all questions/answers
    const questions = document.querySelectorAll(".question");
    const answers = document.querySelectorAll(".answer");

    let previewHTML = `<p><strong>Fee Earner:</strong> ${firstName}</p>`;
    previewHTML += `<p><strong>Secretary:</strong> ${lastName}</p>`;
    previewHTML += `<p><strong>Client Name:</strong> ${companyName}</p>`;
    previewHTML += `<p><strong>Client Type:</strong> ${companyType}</p>`;
    previewHTML += `<h3>Questions and Answers</h3><ul>`;

    for (let i = 0; i < questions.length; i++) {
        previewHTML += `<li><strong>${questions[i].textContent} : </strong> ${answers[i].value}</li>`;
    }
    previewHTML += `</ul>`;

    document.getElementById("previewContent").innerHTML = previewHTML;

    const modal = document.getElementById("previewModal");
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("previewModal").style.display = "none";
}

startApp();