const balance=document.getElementById("balance")
const income=document.getElementById("income")
const expense=document.getElementById("expense")
const list=document.getElementById("list")
const form=document.getElementById("form")
const text=document.getElementById("text")
const amount=document.getElementById("amount")

let transactions=[];
form.addEventListener("submit",addTransaction);

function addTransaction(e){
    e.preventDefault();

    const transaction={
        id:Date.now(),
        text:text.value,
        amount: +amount.value
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updatesValues();

    text.value="";
    amount.value="";

}
function addTransactionDOM(transaction){
    const sign=transaction.amount<0?"-":"+";
    const item =document.createElement("li");

    item.classList.add(transaction.amount<0?"minus":"plus");

    item.innerHTML=`
    ${transaction.text}
    <span>${sign}${Math.abs(transaction.amount)}</span/>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;

    list.appendChild(item);
}

function updatesValues(){
    const amounts=transactions.map(t=>t.amount);

    const total=amounts.reduce((acc,val)=>acc+val,0);
    const inc=amounts.filter(a=>a>0).reduce((acc,val)=>acc+val,0);
    const exp=amounts.filter(a=>a<0).reduce((acc,val)=>acc+val,0);
    
    balance.innerText=`${total.toFixed(2)}`;
    income.innerText=`${inc.toFixed(2)}`;
    expense.innerText=`${Math.abs(exp).toFixed(2)}`;

}

function removeTransaction(id){
    transactions=transactions.filter(t=>t.id !==id);
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updatesValues();
}