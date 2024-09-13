
import { ProductData } from './jason.js';

document.addEventListener('DOMContentLoaded', () => {
    let tabsContainer = document.getElementById('tab-containers');
    let tabsElement = document.getElementById('tabs');

    function loadAllProduct() {
        // Clear existing content
        tabsElement.innerHTML = '';
        tabsContainer.innerHTML = '';

        // Get the names of tabs (keys of the ProductData object)
        let tabsNames = Object.keys(ProductData);
        let firstTabElement = true;

        tabsNames.forEach(tabName => {
            // Create and append tab button
            let tabButton = document.createElement('button');
            tabButton.className = `tab-link ${firstTabElement ? 'active' : ''}`;
            tabButton.textContent = tabName;
            tabButton.onclick = (event) => openTab(event, tabName);

            tabsElement.appendChild(tabButton);

            // Create and append tab content container
            let tabContent = document.createElement('div');
            tabContent.id = tabName;
            tabContent.className = `tab-content ${firstTabElement ? 'active' : ''}`;

            // Create and append products
            let productsContainer = document.createElement('div');
            productsContainer.className = 'products';

            ProductData[tabName].forEach(productDetails => {
                let productDiv = document.createElement('div');
                productDiv.className = 'product';

                let anchor = document.createElement('a');

                let img = document.createElement('img');
                img.src = productDetails.imgSrc;
                img.alt = productDetails.name;

                let h1 = document.createElement('h1');
                h1.textContent = productDetails.name;

                anchor.appendChild(img);
                anchor.appendChild(h1);
                productDiv.appendChild(anchor);
                productsContainer.appendChild(productDiv);
            });

            tabContent.appendChild(productsContainer);
            tabsContainer.appendChild(tabContent);

            firstTabElement = false;
        });
    }

    loadAllProduct();
});
function openTab(event, tabName) {
    console.log('hello')

    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    console.log(event.currentTarget.classList, tabName)

    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    console.log(document.getElementById(tabName).classList)
    event.currentTarget.classList.add('active');
}


// Get the modal
let modal = document.getElementById("orderModal");
let productDetailsModal = document.getElementById('productAmountDetail')




const closeTypeOptions = document.getElementById('closeTypeOptions')

let btn = document.getElementById("openOrderBtn");
let btn2 = document.getElementById("openOrderBtn2");

let span = document.getElementsByClassName("close")[0];

let productArrClass = document.querySelectorAll('.product')
let temporaryData = {}
let orderInfoArr = []

/** 
productBtn.addEventListener('click',()=>{
    console.log('hello is this workign')
}) 
    
 function handleOrderAddBtn(event){
    event.preventDefault();
    console.log(event)
    const productElement = event.currentTarget.closest('.product');

    // Find the h1 element within the product element
    const productTitle = productElement.querySelector('h1').textContent;

    // Log the product title or do something with it
    console.log('Product title:', productTitle);
    
}
*/



productArrClass.forEach(productDiv => productDiv.addEventListener('click', (event) => {

    event.preventDefault();

    const productElement = event.currentTarget.closest('.product')

    const productTitle = productElement.querySelector('h1').textContent
    const imgSuarce = event.target.currentSrc

    productDetailsModal.innerHTML =
        `<div class="modal-content" >
                <span class="close" id="closeOrderdetails">&times;</span>
                <h2>${productTitle}</h2>
                <div class="orderDetails" id="prductDetail">

                    <form id="orderForm">
                        <div class="form-group">
                            <label for="box">Enter box:</label>
                            <input type="number" id="box" name="box" placeholder="Enter quantity in box" min="1" max="100" required>
                        </div>
            
                        <div class="form-group">
                            <label for="size">Select Size:</label>
                            <select id="size" name="size" required>
                                <option value="" disabled selected>Select size</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
            
                        <button type="submit" id="submitBtn">Add to Order</button>
                    </form>

                </div>
            </div>`
    productDetailsModal.style.display = "block"
    document.getElementById("closeOrderdetails").addEventListener('click', () => {productDetailsModal.style.display = "none"})
    document.getElementById('orderForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the page from refreshing

        const box = document.getElementById('box').value;
        const size = document.getElementById('size').value;

        // Append the new order details
        const { imgSuarce, productTitle } = temporaryData

        orderInfoArr.push({
            box: box,
            size: size,
            imgSuarce: imgSuarce,
            productTitle: productTitle
        })
        temporaryData = {}
        // Optionally reset the form fields
        orderForm.reset();
        productDetailsModal.style.display = "none"
    });

    temporaryData = { productTitle: productTitle, imgSuarce: imgSuarce }
}))



btn.addEventListener('click', () => {
    modal.style.display = "block";

    displayOrderSummary(); // Call the function to display order details
})
btn2.addEventListener('click', () => {
    modal.style.display = "block";

    displayOrderSummary(); // Call the function to display order details
})
span.addEventListener('click', () => {
    console.log('is this working')
    modal.style.display = "none";



})


closeTypeOptions.addEventListener('click', () => document.getElementById('typeOptions').style.display = "none")

window.addEventListener('click', (event) => {
    console.log('windows')
    if (event.target == modal || event.target == productDetailsModal) {
        modal.style.display = "none";
        productDetailsModal.style.display = "none";



    }
})

// Function to display order details (example content)
function displayOrderSummary() {
    console.log('the first iteration of the display order details')

    let orderProducts = document.getElementById("orderDetails")
    orderProducts.innerHTML = ''
    console.log(orderInfoArr)

    orderInfoArr.forEach(orderElement => {

        orderProducts.innerHTML += `
                <div class="order-product">
                    <img src="${orderElement.imgSuarce}" alt="${orderElement.productTitle}">
                    <div class="product-details">
                        <h3>${orderElement.productTitle}</h3>
                        <p>Size: ${orderElement.size}</p>
                        <p>box: ${orderElement.box}</p>
                    </div>
                    <div class="product-total">
                        <p>Total</p>
                    </div>
                </div>
                
                 
           `
    })
    orderProducts.innerHTML += '<button class="buttonSumbit" id="placeOrder" onclick="displayTypeOptions()">Place Order</button>'

}
function placeOrder(type) {
    let testedFinalEncodedOrderUrlLink = ''
    let totalNormalText = ''
    orderInfoArr.forEach(item=>{
        testedFinalEncodedOrderUrlLink += `%0AProducts%20name%3A%20${item.productTitle}%0AAmount%3A%20${item.amount}%0Abox%3A%20${item.box}%0ASize%3A%20${item.size}%0A
            `
        totalNormalText += `
            Products name: ${item.productTitle}
            Amount: ${item.amount}
            box: ${item.box}
            Size: ${item.size}
        `
    })

    if (type == 'email') {
        console.log('email is working')
        const email = "recipient@example.com"
        const subject = encodeURIComponent("Order")
        const body = encodeURIComponent(totalNormalText)
        // Construct the mailto link
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`

        // Open the user's default email client with the prewritten email
        window.location.href = mailtoLink;

    }
    else {

        let encodedTestedFinalUrlLink = `https://wa.me/613452735?text=Costumer%20details%0Aname%3A%20james%0Ainfo%3A%20from%20the%20shiz%20company%0A%0A${testedFinalEncodedOrderUrlLink}
            `
        console.log(encodedTestedFinalUrlLink)

        window.open(encodedTestedFinalUrlLink, '_blank');
    }

}


function displayTypeOptions() {
    document.getElementById('typeOptions').style.display = "block"
}





document.querySelector('.modal').style.display = "none"
document.getElementById('orderModal').style.display = 'none'

productDetailsModal.style.display = "none"
document.getElementById('typeOptions').style.display = "none"
