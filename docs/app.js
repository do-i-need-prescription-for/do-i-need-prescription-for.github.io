// Sample data
const countries = [
    { name: "USA", medications: [{ name: "Aspirin", needsPermission: false }, { name: "Ibuprofen", needsPermission: true }] },
    { name: "Germany", medications: [{ name: "Aspirin", needsPermission: false }, { name: "Codeine", needsPermission: true }] },
    { name: "France", medications: [{ name: "Paracetamol", needsPermission: false }, { name: "Morphine", needsPermission: true }] },
    { name: "Japan", medications: [{ name: "Aspirin", needsPermission: true }, { name: "Ibuprofen", needsPermission: true }] },
    { name: "India", medications: [{ name: "Aspirin", needsPermission: false }, { name: "Codeine", needsPermission: false }] },
    { name: "Italy", medications: [{ name: "Paracetamol", needsPermission: false }, { name: "Ibuprofen", needsPermission: false }] },
    { name: "UK", medications: [{ name: "Aspirin", needsPermission: false }, { name: "Ibuprofen", needsPermission: true }] },
    { name: "Australia", medications: [{ name: "Aspirin", needsPermission: false }, { name: "Morphine", needsPermission: true }] },
    { name: "Canada", medications: [{ name: "Paracetamol", needsPermission: false }, { name: "Codeine", needsPermission: true }] },
    { name: "Mexico", medications: [{ name: "Ibuprofen", needsPermission: false }, { name: "Aspirin", needsPermission: false }] }
];

// Popular countries
const popularCountries = ["USA", "Germany", "France", "Japan", "India"];

// Function to update the list of popular countries
function updateCountryList() {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = '';
    popularCountries.forEach(country => {
        const li = document.createElement('li');
        li.textContent = country;
        countryList.appendChild(li);
    });
}

// Handle the form submission
document.getElementById('medication-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const departureCountry = document.getElementById('departure-country').value;
    const destinationCountries = document.getElementById('destination-countries').value.split(',').map(country => country.trim());
    const mandatoryMedication = document.getElementById('mandatory-medication').value.split(',').map(med => med.trim());
    const optionalMedication = document.getElementById('optional-medication').value.split(',').map(med => med.trim());

    // Update the URL with query parameters
    const params = new URLSearchParams();
    params.append('departureCountry', departureCountry);
    params.append('destinationCountries', destinationCountries.join(','));
    params.append('mandatoryMedication', mandatoryMedication.join(','));
    params.append('optionalMedication', optionalMedication.join(','));
    window.history.pushState({}, '', '?' + params.toString());

    // Display results
    displayResults(mandatoryMedication, optionalMedication, destinationCountries);
});

// Function to display the results
function displayResults(mandatoryMedication, optionalMedication, destinationCountries) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Mandatory Medications Table
    const mandatoryTable = createMedicationTable(mandatoryMedication, destinationCountries, true);
    resultsDiv.appendChild(mandatoryTable);

    // Optional Medications Table
    const optionalTable = createMedicationTable(optionalMedication, destinationCountries, false);
    resultsDiv.appendChild(optionalTable);
}

// Function to create a table of medications
function createMedicationTable(medications, countries, isMandatory) {
    const table = document.createElement('table');
    table.className = 'min-w-full table-auto mt-6 border border-gray-300';

    // Table header
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const medicationHeader = document.createElement('th');
    medicationHeader.textContent = 'Medication';
    headerRow.appendChild(medicationHeader);

    countries.forEach(country => {
        const countryHeader = document.createElement('th');
        countryHeader.textContent = country;
        headerRow.appendChild(countryHeader);
    });

    header.appendChild(headerRow);
    table.appendChild(header);

    // Table body
    const body = document.createElement('tbody');
    medications.forEach(medication => {
        const row = document.createElement('tr');

        // Medication name
        const nameCell = document.createElement('td');
        nameCell.textContent = medication;
        row.appendChild(nameCell);

        countries.forEach(country => {
            const countryCell = document.createElement('td');
            const isAllowed = checkMedicationPermission(country, medication, isMandatory);
            countryCell.textContent = isAllowed ? 'Allowed' : 'Not Allowed';
            row.appendChild(countryCell);
        });

        body.appendChild(row);
    });

    table.appendChild(body);

    return table;
}

// Function to check if a medication is allowed in a given country
function checkMedicationPermission(country, medication, isMandatory) {
    const countryData = countries.find(c => c.name === country);
    if (!countryData) return false;
    const medData = countryData.medications.find(m => m.name === medication);
    if (!medData) return false;
    return isMandatory ? !medData.needsPermission : true;
}

// Initialize the page
updateCountryList();
