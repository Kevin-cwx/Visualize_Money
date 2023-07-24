var log = console.log;
var MainValue = 10;
SetMainValue(MainValue);
//log = function () { }


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$("#MainValue").text('FL ' + MainValue);

function SetMainValue(InputData) {
    log(InputData)

    $("#MainValue").text('FL ' + numberWithCommas(InputData));
    MainValue = InputData;
    PerformCalculations();

}

var BillsOf100, BillsOf50, BillsOf25, BillsOf10, BillsOf5, BillsOf1 =0

function PerformCalculations() {

    BillsOf100 = Math.floor(MainValue / 100);
    BillsOf50 = Math.floor((MainValue - (BillsOf100 * 100)) / 50);
    BillsOf25 = Math.floor(((MainValue - (BillsOf100 * 100)) - (BillsOf50 * 50)) / 25);
    BillsOf10 = Math.floor(((MainValue - (BillsOf100 * 100)) - (BillsOf50 * 50) - (BillsOf25 * 25)) / 10);
    BillsOf5 = Math.floor(((MainValue - (BillsOf100 * 100)) - (BillsOf50 * 50) - (BillsOf25 * 25) - (BillsOf10 * 10)) / 5);    
    BillsOf1 = Math.floor(((MainValue - (BillsOf100 * 100)) - (BillsOf50 * 50) - (BillsOf25 * 25) - (BillsOf10 * 10) - (BillsOf5 * 5)) / 1);
    
    log("Main Value: " + MainValue + "\n\n\n\n")
    log("Bills of 100: " + BillsOf100)
    log("Bills of 50: " + BillsOf50)
    log("Bills of 25: " + BillsOf25)
    log("Bills of 10: " + BillsOf10)
    log("Bills of 5: " + BillsOf5)
    log("Bills of 1: " + BillsOf1)

    log("\n\nSum of Bills: " + Number(BillsOf100 * 100 + BillsOf50 * 50 + BillsOf25 * 25 + BillsOf10 * 10 + BillsOf5 * 5 + BillsOf1 * 1));
    //PrintAllBills();


    const sleep = (s) =>
        new Promise((p) => setTimeout(p, (s * 250) | 0))

    async function timeoutHandler() {
        await sleep(1)
        PrintAllBills();
    }

    setTimeout(timeoutHandler, 250)

}

/* */
function PrintN_Times(AmountOfTimes, BillType) {
    for (let index = 0; index < AmountOfTimes; index++) {

        $(".ImageWrapper").append('<img title="BillOfImage" class="BillsOfImage" src=/Media/FL' + BillType + '.png>')
    }
}




function PrintAllBills() {
    $(".ImageWrapper").empty();

    PrintN_Times(BillsOf1, 1)
    PrintN_Times(BillsOf5, 5)
    PrintN_Times(BillsOf10, 10)
    PrintN_Times(BillsOf25, 25)
    PrintN_Times(BillsOf50, 50)
    PrintN_Times(BillsOf100, 100)
}

document.getElementById("InputFieldMainValueID").focus();


//Keeps focus in Inout field
document.getElementById('InputFieldMainValueID').onblur = function (event) {
    var blurEl = this;
    setTimeout(function () {
        blurEl.focus()
    }, 10);
};