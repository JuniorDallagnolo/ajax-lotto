const LNK = 'https://griffis.edumedia.ca/mad9014/lotto/nums.php';
var numArray = [];
document.addEventListener('DOMContentLoaded', init);

//Event Handlers and INIT FUNCTION
function init() {
  document.getElementById('btnSend').addEventListener('click', genNumbers);
  document.getElementById('btnBack').addEventListener('click', refresh);
}

//MAIN FUNCTION TO GENERATE LOTTERY NUMBERS ON USER BUTTON CLICK
function genNumbers() {
  let digits = document.getElementById('digits').value;
  let max = document.getElementById('max').value;
  if (digits < max) {
    let req = genReq(digits, max);
    numArray = fetchArray(req);
    console.log(req);
    console.log(numArray);
    genList(numArray);
    document.getElementById('duplicates').textContent = "Some of the numbers got duplicates: the range you choose is less than the number of digits."
  } else {
console.log("Opps");
  }

}
// FUNCTION TO CHANGE THE PAGE BACK TO DEFAULT
function refresh() {
  document.querySelector('.num_list').innerHTML = "";
  document.getElementById('list').classList.toggle('active');
  document.getElementById('home').classList.toggle('active');
}
// FUNCTION TO GENERATE A NEW FORM AND REQUEST
function genReq(dig, rng) {
  let form = new FormData();
  form.append("digits", dig);
  form.append("max", rng);
  let req = new Request(LNK, {
    method: 'POST',
    body: form,
    mode: 'cors'
  });
  return req;
}
// FUNCTION TO GENERATE THE REQUESTED NUMBERS ARRAY
function fetchArray(request) {
  fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("HTTP not found or something.");
      };
    })
    .then((jsonData) => {
      if (jsonData.code == 0) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      };
    })
    .catch((err) => {
      console.log("ERROR: ", err.message);
    })
}

//FUNCTION TO Generate Document Fragment
function genList(someArray) {
  let ul = document.querySelector('.num_list')
  let newDF = new DocumentFragment();
//  someArray.forEach((num) => {
//    let li = document.createElement('li');
//    li.textContent = num;
//    newDF.appendChild(li);
//  });
  ul.appendChild(newDF);
  document.getElementById('home').classList.toggle('active');
  document.getElementById('list').classList.toggle('active');
}
