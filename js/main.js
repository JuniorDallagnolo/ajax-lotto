const LNK = 'https://griffis.edumedia.ca/mad9014/lotto/nums.php';

//Event Handlers
function init() {
  let btnGen = document.getElementById('btnSend');
  let btnNew = document.getElementById('btnBack');
  btnGen.addEventListener('click', genNumbers);
  btnNew.addEventListener('click', refresh);
}

document.addEventListener('DOMContentLoaded', init);

function genNumbers() {
  let digits = document.getElementById('digits').value;
  let max = document.getElementById('max').value;
  let form = new FormData();
  form.append("digits", digits);
  form.append("max", max);
  let req = new Request(LNK, {
    method: 'POST',
    body:form,
    mode:'cors'
  });
  fetch(req)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("HTTP not found or something");
      };
    })
    .then((jsonData) => {
    if (jsonData.code == 0){
      let ul = document.querySelector('.num_list')
      let newDF = new DocumentFragment();
      jsonData.numbers.forEach((num) => {
        let li = document.createElement('li');
        li.textContent = num;
        newDF.appendChild(li);
      });
      ul.appendChild(newDF);
      document.getElementById('home').classList.toggle('active');
      document.getElementById('list').classList.toggle('active');
    } else {
      throw new Error (jsonData.message);
    }
  })
    .catch((err) => {
     console.log("ERROR: ", err.message);
    })
}
function refresh() {
  document.querySelector('.num_list').innerHTML = "";
  document.getElementById('list').classList.toggle('active');
  document.getElementById('home').classList.toggle('active');
}