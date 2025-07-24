var log = console.log;
var MainValue = 10;

var InputFieldMainValueID = document.getElementById('InputFieldMainValueID');

const denominations = {
    FL: [100, 50, 25, 10, 5, 1],
    XCG: [200, 100, 50, 20, 10, 5, 1]
};
let currentCurrency = "FL"; // default


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$("#MainValue").text('FL ' + MainValue);

function SetMainValue(InputData) {
    log(InputData);
    $("#MainValue").text(currentCurrency + ' ' + numberWithCommas(InputData));
    MainValue = InputData;
    PerformCalculations();
}

var BillsOf100, BillsOf50, BillsOf25, BillsOf10, BillsOf5, BillsOf1 = 0

// Updated random breakdown logic
function getRandomBreakdown(amount, availableDenoms) {
    const result = {};
    let remaining = amount;
    const isFL = currentCurrency === "FL";

    while (remaining > 0) {
        // Filter denominations that are less than or equal to what's left
        let validDenoms = availableDenoms.filter(d => d <= remaining);

        // For FL, avoid 1 and 5 unless absolutely necessary
        if (isFL) {
            const nonCoinDenoms = validDenoms.filter(d => d > 5);
            if (nonCoinDenoms.length > 0) {
                validDenoms = nonCoinDenoms;
            }
        }

        // Randomly select one from the filtered valid denominations
        const randomDenom = validDenoms[Math.floor(Math.random() * validDenoms.length)];

        if (!result[randomDenom]) result[randomDenom] = 0;
        result[randomDenom]++;
        remaining -= randomDenom;
    }

    return result;
}



function PerformCalculations() {
    let bills = {};
    const denomList = denominations[currentCurrency];

    // 🔥 Use randomized breakdown for both FL and XCG
    bills = getRandomBreakdown(MainValue, denomList);

    log(`Main Value: ${MainValue} (${currentCurrency})`);
    denomList.forEach(d => {
        if (bills[d]) log(`Bills of ${d}: ${bills[d]}`);
    });

    const total = Object.entries(bills).reduce((sum, [k, v]) => sum + (k * v), 0);
    log(`\nSum of Bills: ${total}`);

    // 💾 Store globally for rendering
    window.currentBills = bills;

    setTimeout(() => {
        PrintAllBills();
    }, 150);
}

/* Toggle */
const toggle = document.getElementById('toggle');
const statusText = document.getElementById('status');

// Function to update the status text based on toggle state
function updateStatus() {
    if (toggle.checked) {
        log('New_Bills');
        Folder_Name = "New_Bills";
        currentCurrency = "XCG";
    } else {
        log('Old_Bills');
        Folder_Name = "Bills";
        currentCurrency = "FL";
    }

    // 🔥 Update the currency label immediately
    $("#MainValue").text(currentCurrency + ' ' + numberWithCommas(MainValue)); // ⬅️ NEW LINE

    PerformCalculations();
}

// Event listener to detect changes in toggle state
toggle.addEventListener('change', updateStatus);

// Initial status update
updateStatus();


function PrintN_Times(AmountOfTimes, BillType) {
    for (let index = 0; index < AmountOfTimes; index++) {
        $(".ImageWrapper").append(
            '<img class="BillsOfImage" src=../Media/' + Folder_Name + '/' + currentCurrency + BillType + '.png>'
        );
    }
}

function PrintAllBills() {
    $(".ImageWrapper").empty();
    const bills = window.currentBills;

    for (const denom in bills) {
        PrintN_Times(bills[denom], denom);
    }
}

InputFieldMainValueID.focus();

//Keeps focus in input field
InputFieldMainValueID.onblur = function (event) {
    var blurEl = this;
    setTimeout(function () {
        blurEl.focus()
    }, 10);
};

//allows for only numeric input
InputFieldMainValueID.onkeypress = function (event) {
    return event.charCode >= 48 && event.charCode <= 57;
};

//Changes value on input
InputFieldMainValueID.oninput = function () {
    SetMainValue(InputFieldMainValueID.value);
};

//Disables multiple zeros. Ex 00000
InputFieldMainValueID.addEventListener("input", function () {
    if (this.value.length === 1 && this.value === "0") {
        this.value = "";
    }
});

//Randomize bill selection breakdown
document.getElementById('Dice').addEventListener('click', function () {
    log("🎲 Dice clicked — performing random breakdown for " + currentCurrency);
    PerformCalculations(); // Re-perform with new breakdown
});

SetMainValue(MainValue);
