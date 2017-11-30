const LNK = 'http://localhost/mad9014-lotto/nums.php';
var numsArray = [];
var digits = 0;
var max = 0;
var flag = false;
document.addEventListener('DOMContentLoaded', init);

//Event Handlers and INIT FUNCTION
function init() {
  document.getElementById('btnSend').addEventListener('click', genNumbers);
  document.getElementById('btnBack').addEventListener('click', swScreen);
}

//EVENT FUNCTION TO HANDLE ERRORS AND FETCH
function genNumbers(ev) {
  digits = parseInt(document.getElementById('digits').value);
  max = parseInt(document.getElementById('max').value);
  switch (true) {
    case isNaN(digits) || isNaN(max) || digits == "" || max == "":
      alert("Please Fill both values with a numerial value.");
      break;
    case max >= digits:
      flag = true;
      let req = genReq(digits, max);
      fetchFunc(req, flag);
      swScreen(ev);
      break;
    default:
      document.getElementById('duplicate').textContent = "Duplicate number values were hidden. Try a new search with a higher range to avoid that"
      fetchFunc(genReq(digits, max), flag);
      swScreen(ev);
  }
}

// FUNCTION TO CHANGE THE PAGE SCREEN
function swScreen(ev) {
  document.getElementById('home').classList.toggle('active');
  document.getElementById('list').classList.toggle('active');
  if (ev.target.id == 'btnBack') {
    document.getElementById('duplicate').innerHTML = "",
      document.querySelector('.num_list').innerHTML = ""
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
function fetchFunc(request, bool) {
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
        numsArray += jsonData.numbers;
        console.log(numsArray);
        if (bool && numsArray.length < digits) {
          let newDigits = numsArray.length - digits;
          let newReq = genReq(newDigits, max);
          fetchFunc(newReq, bool);
        } else {
          genList();
        }
        // COULD NOT MAKE THIS TERNARY WORK SO USED NORMAL IF ELSE if you can I would like to know what's wrong there, tried so many things.
        //        bool ? (
        //          let newDigits = numsArray.length - digits,
        //            fetchFunc(genReq(newDigits, max), bool)
        //        ) : (
        //          genList(numsArray)
        //        );
      } else {
        throw new Error(jsonData.message);
      };
    })
    .catch((err) => {
      console.log("ERROR: ", err.message);
    })
}

//FUNCTION TO Generate Document Fragment
function genList() {
  let ul = document.querySelector('.num_list')
  let newDF = new DocumentFragment();
  console.log(numsArray);
  numsArray.forEach(num => {
    let li = document.createElement('li');
    li.textContent = num;
    newDF.appendChild(li);
  });
  ul.appendChild(newDF);
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
