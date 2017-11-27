const LNK = 'http://localhost/mad9014-lotto/nums.php';
var numsArray = [];
document.addEventListener('DOMContentLoaded', init);

//Event Handlers and INIT FUNCTION
function init() {
  document.getElementById('btnSend').addEventListener('click', swScreen);
  document.getElementById('btnBack').addEventListener('click', swScreen);
}

//MAIN FUNCTION TO GENERATE LOTTERY NUMBERS ON USER BUTTON CLICK
function genNumbers() {
  let digits = document.getElementById('digits').value;
  let max = parseInt(document.getElementById('max').value);
  if (max >= digits) {
    console.log("Not Yet");
  } else {
    numsArray = fetchArray(genReq(digits, max));
    console.log(numsArray);
    genList(numsArray);
    document.getElementById('duplicate').textContent = "Some of the numbers got duplicates: the range you choose is less than the number of digits."
  }

}

// FUNCTION TO CHANGE THE PAGE SCREEN
function swScreen(ev) {
  
  //document.querySelector('')
  
  switch (ev.target.id) {
    case 'btnSend':
      document.getElementById('home').classList.toggle('active');
      document.getElementById('list').classList.toggle('active');
      genNumbers();
      break;
    case 'btnBack':
      document.getElementById('home').classList.toggle('active');
      document.getElementById('list').classList.toggle('active');
      document.getElementById('duplicate').innerHTML = "";
      document.querySelector('.num_list').innerHTML = "";
      break;
  }
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
  return fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("HTTP not found or something.");
      };
    })
    .then((jsonData) => {
      if (jsonData.code == 0) {
        let arr = jsonData.numbers.slice();
        return arr;
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
  someArray.forEach(num => {
    let li = document.createElement('li');
    li.textContent = num;
    newDF.appendChild(li);
  });
  ul.appendChild(newDF);
  swScreen();
}

//FUNCTION TO FILTER DUPLICATES VALUE FROM ANY ARRAY
Array.prototype.unique = function () {
  return this.reduce(function (accum, current) {
    if (accum.indexOf(current) < 0) {
      accum.push(current);
    }
    return accum;
  }, []);
}

