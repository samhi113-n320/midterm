import GeneratePDF from "./pdfFrame.js";

const myPdf = new GeneratePDF();

function basicSetup(file, backColor, topBarColor) {
    file.setFillingColor("#" + backColor);
    file.addRect(0, 0, 1000, 1000);
    file.setFillingColor("#" + topBarColor);
    file.addRect(0, 0, 1000, 25);

    file.setTextColor("#ddd")
    file.addHeader("Sam's Styles")

    file.setTextColor("#222");
    file.addHeader("Your Invoice", 5, 35);
    file.addText(`Invoice to:`);
    file.addText(document.querySelector("#nameInput").value)
    file.addText(document.querySelector("#emailInput").value)
    file.addText("ACME Inc.")
    file.addText("123 Bomb St.")
    file.addText(" ");

    const date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes()


    file.addText(`Order Date: ${month}-${day}-${year} at ${hours}:${minutes}`)
    file.addText (" ")

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var barcodeLetters = "";
    for (let i = 0; i < 16; i++) {
        barcodeLetters += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    file.addImg(`https://barcodeapi.org/api/39/${barcodeLetters}?&bg=${backColor}&dpi=300`, 5, 270, 86, 20)
}

function finishFile(price, file) {
    price = Math.round(price * 100) / 100
    var tax = Math.round(price * 7) / 100
    var total = Math.round((price + tax) * 100) / 100;

    myPdf.addText(`Subtotal: $${price}`, 5, 200)
    myPdf.addText(`Tax: $${tax}`)
    myPdf.addText(`Total: $${total}`);

    document.querySelector("#pdf-preview").src = file.getPdfUrl();
    document.querySelector("#downloadBtn").onclick = function () {myPdf.save("Invoice");}
    console.log("hi", file.getPdfUrl());
}

document.querySelector("#court").onclick = function () {
    if (document.querySelector("#nameInput").value == "") {
        alert("Invalid entry, please type a name!")
    } else if   (document.querySelector("#emailInput").value == ""
                || !document.querySelector("#emailInput").value.includes("@")) {
        alert("Invalid entry, please type a valid email!")
    } else {
        basicSetup(myPdf, "dddddd", "222222");

        myPdf.addText("1 Court Design");
        myPdf.addText("Standard, Cool-looking, Size L");

        finishFile(19.99, myPdf);
    }
}

document.querySelector("#logo").onclick = function () {
    if (document.querySelector("#nameInput").value == "") {
        alert("Invalid entry, please type a name!")
    } else if   (document.querySelector("#emailInput").value == ""
                || !document.querySelector("#emailInput").value.includes("@")) {
        alert("Invalid entry, please type a valid email!")
    } else {
        basicSetup(myPdf, "dddddd", "222222");

        myPdf.addText("1 Logo Design");
        myPdf.addText("Standard, Cool-looking, Size L");

        finishFile(199.99, myPdf);
    }
    
}