var verbs = 
[
    ["abide", "abode", "abode", "demeurer"],
    ["awake", "awoke", "awoken", "(se) réveiller, aussi awake/awoke/awoke"],
    ["be", "was/were", "been", "être"],
    ["bear", "bore", "borne", "porter/supporter/soutenir"],
    ["beat", "beat", "beaten", "battre"],
    ["become", "became", "become", "become"],
    ["beget", "begat", "begotten", "engendrer, aussi beget/begot/begotten"],
    ["begin", "began", "begun", "commencer"],
    ["bend", "bent", "bent", "se courber, etc."],
    ["bereave", "bereft", "bereft", "déposséder/priver"],
    ["bring", "brought", "brought", "apporter"],
    ["build", "built", "built", "construire"],
    ["burn", "burnt", "burnt", "brûler"],
    ["burst", "burst", "burst", "éclater"],
    ["buy", "bought", "", "acheter"],
    ["cast", "cast", "cast", "jeter, etc."],
    ["catch", "caught", "caught", "attraper"],
    ["chide", "chid", "chidden", "gronder/réprimander, aussi chide/chid/chid"],
    ["choose", "chose", "chosen", "choisir"],
    ["cleave", "cleft", "cleft", "fendre/coller, aussi cleave/clove/clove"],
    ["cling", "clung", "clung", "se cramponner"],
    ["come", "came", "come", "venir"],
    ["cost", "cost", "cost", "coûter"],
    ["creep", "crept", "crept", "ramper/se glisser/se hérisser"],
    ["crow", "crew", "crowed", "chanter (un coq)/jubiler"],
    ["cut", "cut", "cut", "couper"],
    ["deal", "dealt", "dealt", "distribuer/traiter"],
    ["dig", "dug", "dug", "bêcher"],
    ["do", "did", "", "faire"],
    ["draw", "drew", "drawn", "tirer/dessiner"],
    ["dream", "dreamt", "dreamt", "rêver"],
    ["drink", "drank", "drunk", "boire"],
    ["drive", "drove", "driven", "conduire"],
    ["dwell", "dwelt", "dwelt", "habiter/rester"],
    ["eat", "ate", "eaten", "manger"],
    ["fall", "fell", "fallen", "tomber"],
    ["feed", "fed", "fed", "nourrir"],
    ["feel", "felt", "felt", "(se) sentir"],
    ["fight", "fought", "fought", "combattre"],
    ["find", "found", "found", "trouver"],
    ["...", "...", "...", "..."]
];

const verbTableBody = document.querySelector("#verbs_table tbody");


function displayTable() 
{
    const tbody = document.getElementById("verbs_table").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ''; // * Clear the table first

    verbs.slice(1).forEach((verb, index) => 
        {
        const row = document.createElement("tr");
        
        // * Add verb data cells
        verb.forEach((data) => {
            const cell = document.createElement("td");
            cell.textContent = data;
            row.appendChild(cell);
        });
        
        // * Add action buttons cell
        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
            <div class="actionCellContainer">
                <button onclick="editVerb(${index})">Edit</button>
                <button onclick="updateVerb(${index})">Update</button>
                <button onclick="deleteVerb(${index})">Delete</button>
            </div>
        `;
        row.appendChild(actionCell);
        tbody.appendChild(row);
    });
}


function hideRightContainer() 
{
    const rightContainerFunction = document.querySelector(".main_page_panel");
    const rightDiv = document.getElementById("containerRight");
    const leftContainer = document.getElementById("containerLeft");
    const panelMargin = document.querySelector(".panel_margin");
    const arrow = document.querySelector(".toggle_right_panel");
    

    if (rightContainerFunction.style.display === "none" || !rightContainerFunction.style.display) 
    {
        rightContainerFunction.style.display = "block";
        leftContainer.style.gridTemplateColumns = "auto";
        rightDiv.style.borderWidth = "4px";
        panelMargin.style.width = "5%";
        arrow.innerHTML = "&#9654;"; // Right arrow (▶)
    }
    else 
    {
        rightContainerFunction.style.display = "none";
        leftContainer.style.gridTemplateColumns = "1fr";
        rightDiv.style.borderWidth = "0px";
        panelMargin.style.width = "100%";
        arrow.innerHTML = "&#9664;"; // Left arrow (◀)
    }
}
function swapDivs()
{
    const container = document.querySelector(".big_div");
    const leftDiv = document.getElementById("containerLeft");
    const rightDiv = document.getElementById("containerRight");

    if(container.firstElementChild === leftDiv)
    {
        container.appendChild(leftDiv);
        container.insertBefore(rightDiv , leftDiv);
        leftDiv.style.marginRight = "12px";
        leftDiv.style.marginLeft = "0px";
        rightDiv.style.marginLeft = "12px";
    }

    else
    {
        container.appendChild(rightDiv);
        container.insertBefore(leftDiv , rightDiv);
        rightDiv.style.marginLeft = "0px" ;
        rightDiv.style.marginRight = "12px";
    }
}



function generateLetterLinks() 
{
    const letterLinksDiv = document.getElementById('letterLinks');
    letterLinksDiv.innerHTML = ''; // * Clear existing links
    
    // * Create a Set of unique first letters and count verbs per letter
    const letters = new Set();
    const letterCounts = {};
    
    verbs.slice(1).forEach(verb => 
        {
        if (verb[0]) 
        {
            const firstLetter = verb[0].charAt(0).toLowerCase();
            letters.add(firstLetter);
            letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
        }
    });

    // * Create links container
    const linksContainer = document.createElement('div');
    linksContainer.style.display = 'flex';
    linksContainer.style.flexDirection = 'column';
    linksContainer.style.gap = '10px'; // * Space between lines

    // * Create and append links for each letter
    Array.from(letters).sort().forEach(letter => 
{
        const linkContainer = document.createElement('div');
        linkContainer.style.whiteSpace = 'nowrap'; // * Prevent line breaks
        
        const link = document.createElement('a');
        link.href = '#';
        link.style.color = 'purple';

        const prefix = document.createElement('span');
        prefix.textContent = "• Here is a link to ";
        prefix.style.color = 'black';
        prefix.style.textDecoration = 'none';

        link.appendChild(prefix);
        link.appendChild(document.createTextNode(` verbs that start with the letter ${letter}`));
        
        link.addEventListener('click', (e) => 
        {
            e.preventDefault();
            
            // * Remove highlight from all rows
            document.querySelectorAll('#verbs_table tbody tr').forEach(row => 
            {
                row.classList.remove('highlighted');
            });
            
            // * Find and scroll to the matching verb
            const rows = document.querySelectorAll('#verbs_table tbody tr');
            for (let row of rows) 
            {
                const firstCell = row.querySelector('td');
                if (firstCell && firstCell.textContent.toLowerCase().startsWith(letter)) 
                {
                    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    row.classList.add('highlighted');
                    break;
                }
            }
        });
        
        linkContainer.appendChild(link);
        linksContainer.appendChild(linkContainer);
    });
    
    letterLinksDiv.appendChild(linksContainer);
}

function statisticsContainer() {
    const statsDiv = document.getElementById("statistics");
    statsDiv.innerHTML = ''; // * Clear existing content
    
    // * Create letter counts object
    const letterCounts = {};
    verbs.slice(1).forEach(verb => 
    {
        if (verb[0]) 
        {
            const firstLetter = verb[0].charAt(0).toLowerCase();
            letterCounts[firstLetter] = (letterCounts[firstLetter] || 0) + 1;
        }
    });
    
    // * Calculate average
    const totalLetters = Object.keys(letterCounts).length;
    
    // * Create statistics text
    const statsText = Object.entries(letterCounts)
        .sort((a, b) => a[0].localeCompare(b[0])) // * Sort alphabetically
        .map(([letter, count]) => `${letter}→${count}`)
        .join('    ');
        
    // * Create and style the container
    const container = document.createElement('div');
    container.style.backgroundColor = 'rgb(168, 233, 253)';
    container.style.padding = '10px';
    container.style.marginTop = '10px';
    
    // * Add the text with proper formatting
    container.textContent = `${totalLetters} verbs on average per letter: ${statsText}`;
    
    // * Add to statistics div
    statsDiv.appendChild(container);
}

function validateInputs(cells) 
{
    const emptyFields = [];
    
    // * Check first 4 cells (excluding action cell)
    for (let i = 0; i < cells.length - 1; i++) 
    {
        const input = cells[i].querySelector('input');
        const value = input ? input.value.trim() : cells[i].textContent.trim();
        
        if (!value) 
        {
            emptyFields.push(i === 0 ? 'Base form' : 
                           i === 1 ? 'Past tense' : 
                           i === 2 ? 'Past Participle' : 
                           'Translation');
        }
    }
    
    if (emptyFields.length > 0) 
    {
        alert(`Please fill in all fields. Empty fields: ${emptyFields.join(', ')}`);
        return false;
    }
    return true;
}

function editVerb(index) 
{
    const tbody = document.querySelector('#verbs_table tbody');
    const row = tbody.children[index];
    const cells = row.querySelectorAll('td');
    
    // * Convert cells to input fields except for the action cell
    for (let i = 0; i < cells.length - 1; i++) 
    {
        const currentValue = cells[i].textContent;
        cells[i].innerHTML = `<input type="text" value="${currentValue}" class="edit-input">`;
    }
    
    // * Show both edit and update buttons
    const actionCell = cells[cells.length - 1];
    actionCell.querySelector('button:nth-child(1)').style.display = 'block'; // * Edit button
    actionCell.querySelector('button:nth-child(2)').style.display = 'block'; // * Update button
}

function updateVerb(index) 
{
    const tbody = document.querySelector('#verbs_table tbody');
    const row = tbody.children[index];
    const cells = row.querySelectorAll('td');
    const newValues = [];

    if (!validateInputs(cells)) 
    {
        return;
    }
    
    // * Get values from input fields
    for (let i = 0; i < cells.length - 1; i++) 
    {
        const input = cells[i].querySelector('input');
        const value = input ? input.value : cells[i].textContent.trim();
        newValues.push(value);
        cells[i].textContent = value; // * Convert back to text
    }
    
    // * Update the verbs array
    verbs[index + 1] = newValues;
    
    // * Keep both buttons visible
    const actionCell = cells[cells.length - 1];
    actionCell.querySelector('button:nth-child(1)').style.display = 'block'; // * Edit button
    actionCell.querySelector('button:nth-child(2)').style.display = 'block'; // * Update button
    
    statisticsContainer(); // * Update statistics after modification
}

function deleteVerb(index) 
{
    if (confirm('Are you sure you want to delete this verb?')) 
    {
        // * Remove from verbs array
        verbs.splice(index + 1, 1);
        
        // * Remove the row directly from the table
        const tbody = document.querySelector('#verbs_table tbody');
        tbody.removeChild(tbody.children[index]);
        
        // * Regenerate letter links
        generateLetterLinks();
        
        // * Update onclick handlers for remaining rows
        const rows = tbody.children;
        for (let i = 0; i < rows.length; i++) 
        {
            const actionCell = rows[i].querySelector('.actionCellContainer');
            actionCell.innerHTML = `
                <button onclick="editVerb(${i})">Edit</button>
                <button onclick="updateVerb(${i})">Update</button>
                <button onclick="deleteVerb(${i})">Delete</button>
            `;
        }
        
        generateLetterLinks();
        statisticsContainer(); // * Update statistics after deletion
    }
}

function addVerb() 
{
    const tbody = document.querySelector('#verbs_table tbody');
    const newIndex = tbody.children.length;
    
    const row = document.createElement('tr');
    
    // * Create cells for the new verb
    for (let i = 0; i < 4; i++) 
    {
        const cell = document.createElement('td');
        cell.innerHTML = '<input type="text" class="edit-input" placeholder="Required">';
        row.appendChild(cell);
    }
    
    // * Add action buttons
    const actionCell = document.createElement('td');
    actionCell.innerHTML = `
        <div class="actionCellContainer">
            <button onclick="editVerb(${newIndex})">Edit</button>
            <button onclick="updateVerb(${newIndex})">Update</button>
            <button onclick="deleteVerb(${newIndex})">Delete</button>
        </div>
    `;
    row.appendChild(actionCell);
    tbody.appendChild(row);

    // * Scroll to the new row
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    statisticsContainer(); // * Update statistics after adding
}

function findVerb() 
{
    const searchTerm = document.getElementById('verbToFind').value.toLowerCase();
    const rows = document.querySelectorAll('#verbs_table tbody tr');
    
    // * To remove any existing highlights
    rows.forEach(row => {
        row.classList.remove('highlighted');
        row.classList.remove('search-result');
    });
    
    // Search through all cells in each row
    for (let row of rows) 
    {
        const cells = row.querySelectorAll('td');
        for (let cell of cells) 
        {
            if (cell.textContent.toLowerCase().includes(searchTerm)) 
            {
                row.classList.add('search-result');
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }
    }
    
    alert('Verb not found!');
}


window.onload = function() 
{
    displayTable();
    generateLetterLinks();
    statisticsContainer();
};

window.onload = function() 
{
    displayTable();
    generateLetterLinks();
    statisticsContainer();
};