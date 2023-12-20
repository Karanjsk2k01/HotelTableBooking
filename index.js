//variables

let registerForm = document.getElementById('register-form');
let Table1 = document.getElementById('table1');
let Table2 = document.getElementById('table2');
let Table3 = document.getElementById('table3');

//display the values from api

window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  axios.get('https://crudcrud.com/api/6c0b468a96e94b5a950863a418537d85/tableBooking1')
    .then((res) => {
      let display = res.data
      display.forEach(element => {
        displayInfo(element)
      });
    })
    .catch(err => console.log(err))
})



//register form post request;

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let Amount = document.getElementById('Amount').value;
  let category = document.getElementById('category').value;
  let tableOption = document.getElementById('tableOption').value;

  axios.post('https://crudcrud.com/api/6c0b468a96e94b5a950863a418537d85/tableBooking1',
    {
      Amount: Amount,
      category: category,
      tableOption: tableOption
    }
  ).then((res) => displayInfo(res.data)).catch(err => console.log(err))

  document.getElementById('Amount').value = '';
  document.getElementById('category').value = '';
  document.getElementById('tableOption').value = '';
})


//displaying the object in ui

function displayInfo(data) {
  //create a list item
  let liCreate = document.createElement('li');

  let textNode = document.createTextNode(`OrderName: ${data.category}  Price: ${data.Amount}`);

  // Create buttons
  let btn1 = document.createElement('button');
  btn1.textContent = 'Delete';
  btn1.setAttribute('class', 'btn btn-danger');
  liCreate.setAttribute('class', 'list-group-item')
  liCreate.setAttribute('user_id', data._id)

  liCreate.appendChild(textNode);
  liCreate.appendChild(btn1);

  // Appending the list item to the items element (assuming items is a valid element)
  if (data.tableOption === 'Table1') {
    Table1.appendChild(liCreate);
  }
  else if (data.tableOption === 'Table2') {
    Table2.appendChild(liCreate)
  }
  else {
    Table3.appendChild(liCreate)
  }

}

//delete functionality
Table1.addEventListener('click', deleteItem);
Table2.addEventListener('click', deleteItem);
Table3.addEventListener('click', deleteItem);


function deleteItem(e) {
  e.preventDefault();

  if (e.target.classList.contains('btn')) {
    if (confirm('Are you want to delete ?')) {
      let parentNode = e.target.parentNode;
      let userid = parentNode.getAttribute('user_id');
      axios.delete(`https://crudcrud.com/api/6c0b468a96e94b5a950863a418537d85/tableBooking1/${userid}`)
        .then((res) => parentNode.remove())
        .catch(err => console.log(err))
    }
  }
}


