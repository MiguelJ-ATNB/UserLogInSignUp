// USER LOGIN / SIGNUP

// HTML VARIABLES
let signInBtn = document.getElementById('sign-in-btn');
let signUpBtn = document.getElementById('sign-up-btn');
let usernameInp1 = document.getElementById('usernameInp1');
let passwordInp1 = document.getElementById('passwordInp1');
let conPasswordInp1 = document.getElementById('conPasswordInp1');
let output1 = document.getElementById('output1')
let usernameInp2 =document.getElementById('usernameInp2');
let passwordInp2 = document.getElementById('passwordInp2');
let output2 = document.getElementById('output2')
 
//Other VARS
let users = loadUsers();

// SIGN UP BTN CLICKED
signUpBtn.addEventListener('click', signUpHandler);

function signUpHandler() {
  clearCSS();
  if(passwordInp1.value !== conPasswordInp1.value){
    signUpSignInFailed(1);
  }else{
    checkUsername(usernameInp1, passwordInp1)
  }
  saveUsers();
  console.log(users)
}

// SIGN IN BTN CLICKED
signInBtn.addEventListener('click', signInHandler);

function signInHandler() {
  clearCSS();
  let LoginVar;
  LoginVar = signIn(usernameInp2,passwordInp2)
  if(LoginVar === 'LoginFail'){
    signUpSignInFailed(2);
  }else if(LoginVar === 'LoginSuccess'){
    output2.innerHTML = "Login successful, redirect pending..."
  }
}


//Helpers 
//Create and return User
function newUser(userName,passWord){
  return{
     username: userName,
     password: passWord
  };

};

//SignIn
function signIn(uname,pass){
  let i = findUserIndex(uname);
  if(i === -1){
    return 'LoginFail'
  }else if(pass.value !== users[i].password){
    return 'LoginFail'
  }else if(pass.value === users[i].password){
    return 'LoginSuccess' 
  }
}

//Checks to see if the username has already been taken
function checkUsername(userName,passWord){
  let i = findUserIndex(userName)
  if(i !== -1){
    signUpSignInFailed(3);
  }else{
    output1.innerHTML = "Account Created. Nice!"
    users.push(newUser(userName.value,passWord.value));
  }
}

//Save A User
function saveUsers(){
  localStorage.setItem("user",JSON.stringify(users));
};

//Load User from local storage
function loadUsers() {
  let userStr = localStorage.getItem('user');
  return JSON.parse(userStr) ?? [];
};

//Check if signup/in is correct
function signUpSignInFailed(probNum){
  //Different probnums will output different things
  if(probNum === 1){
    passwordInp1.style.borderColor = "red"
    passwordInp1.style.borderWidth = "2px"
    conPasswordInp1.style.borderColor = "red"
    conPasswordInp1.style.borderWidth = "2px"
    output1.innerHTML = "Passwords dont match"
  }else if(probNum === 2){
    usernameInp2.style.borderColor = "red"
    usernameInp2.style.borderWidth = "2px"
    passwordInp2.style.borderColor = "red"
    passwordInp2.style.borderWidth = "2px"
    output2.innerHTML = "Username or password incorrect."
  }else if(probNum === 3){
    usernameInp1.style.borderColor = "red"
    usernameInp1.style.borderWidth = "2px"
    output1.innerHTML = "Username has already been chosen"
  }
};


function findUserIndex(username){
  for(let i = 0; i < users.length; i++) {
    if(username.value === users[i].username){
      return i;
    }
  }
  return -1;
}


function myIndexOf(array,item){
    let n = array.indexOf(item)
    return n
}

function clearCSS(){
  output1.innerHTML = ""
  output2.innerHTML = ""
  usernameInp1.style.borderColor = "black"
  usernameInp1.style.borderWidth = "1px"
  usernameInp2.style.borderColor = "black"
  usernameInp2.style.borderWidth = "1px"
  passwordInp1.style.borderColor = "black"
  passwordInp1.style.borderWidth = "1px"
  conPasswordInp1.style.borderColor = "black"
  conPasswordInp1.style.borderWidth = "1px"
  passwordInp2.style.borderColor = "black"
  passwordInp2.style.borderWidth = "1px"
}

// //
