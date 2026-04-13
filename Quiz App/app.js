
let quizType="", index=0, score=0, timer;


function toggle(){
  document.getElementById("signupDiv").classList.toggle("hidden");
  document.getElementById("loginDiv").classList.toggle("hidden");
}

function signup(){
 let user = {
  name: document.getElementById("name").value,
  email: document.getElementById("email").value,
  password: document.getElementById("password").value
};
  localStorage.setItem("user",JSON.stringify(user));
  Swal.fire("Success","Account created","success");
}

function login(){
  let user = JSON.parse(localStorage.getItem("user"));

  if(user && user.email === loginEmail.value && user.password === loginPassword.value){

    localStorage.setItem("username", user.name);

    Swal.fire("Login Success","","success").then(()=>{

      document.getElementById("auth").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");

      document.getElementById("username").innerText =
        "Welcome " + user.name + " 👋";
    });

  } else {
    Swal.fire("Error","Invalid login","error");
  }
}

function logout(){
  localStorage.clear();
  location.reload();
}

function startQuiz(type){
  quizType=type;
  index=0;
  score=0;

  dashboard.classList.add("hidden");
  quiz.classList.remove("hidden");

  loadQuestion();
}




let quizzes = {
  html: [
    {q:"HTML stands for?",o:["Hyper Text Markup Language","High Text language"],a:0},
    {q:"Image tag?",o:["&lt;img&gt;","&lt;pic&gt;"],a:0},
    {q:"Paragraph?",o:["&lt;p&gt;","&lt;para&gt;"],a:0},
    {q:"Heading?",o:["&lt;head&gt;","&lt;h1&gt;"],a:0},
    {q:"Link?",o:["&lt;link&gt;","&lt;a&gt;"],a:0},
    {q:"List?",o:["&lt;ul&gt;","&lt;lii&gt;"],a:0},
    {q:"Break?",o:["&lt;break&gt;","&lt;br&gt;"],a:0},
    {q:"Table?",o:["&lt;table&gt;","&lt;tb&gt;"],a:0},
    {q:"Form?",o:["&lt;form&gt;","&lt;fm&gt;"],a:0},
    {q:"Input?",o:["&lt;in&gt;","&lt;input&gt;"],a:0}
  ],
  css:[
    {q:"CSS stands for?",o:["Cascading Style Sheets","Color Style Sheets"],a:0},
    {q:"Color?",o:["color","bgcolor"],a:0},
    {q:"Background?",o:["bg","background"],a:0},
    {q:"Font size?",o:["font-size","text-size"],a:0},
    {q:"Margin?",o:["space","margin"],a:0},
    {q:"Padding?",o:["padding","gap"],a:0},
    {q:"Flex?",o:["block","flex"],a:0},
    {q:"Border?",o:["line","border"],a:0},
    {q:"Align?",o:["text-align","align"],a:0},
    {q:"Width?",o:["size","width"],a:0}
  ],
  js:[
    {q:"JS stands for?",o:["Java","Javascript"],a:0},
    {q:"Variable?",o:["let","varr"],a:0},
    {q:"Function?",o:["fun","function"],a:0},
    {q:"Alert?",o:["alert()","msg()"],a:0},
    {q:"Console?",o:["console.log","print"],a:0},
    {q:"If?",o:["iff","if"],a:0},
    {q:"Loop?",o:["for","loop"],a:0},
    {q:"Array?",o:["[]","{}"],a:0},
    {q:"Object?",o:["{}","[]"],a:0},
    {q:"DOM?",o:["window","document"],a:0}
  ]
};


function loadQuestion(){
  let q=quizzes[quizType][index];

  question.innerText=q.q;

  let html="";
  q.o.forEach((opt,i)=>{
    html+=`<div class="option" onclick="selectAnswer(this,${i})">${opt}</div>`;
  });

  options.innerHTML=html;

  progress.style.width=((index+1)/10)*100+"%";

  startTimer();
}

function selectAnswer(el,i){
  let correct=quizzes[quizType][index].a;
  let all=document.querySelectorAll(".option");

  all.forEach(opt=>opt.onclick=null);

  if(i===correct){
    el.classList.add("correct");
    el.innerHTML+=" ✔";
    score++;
     document.getElementById("correctSound").play();

  vibrate(200); // 📳 
  } else {
    el.classList.add("wrong");
    el.innerHTML+=" ❌";
    all[correct].classList.add("correct");
    all[correct].innerHTML+=" ✔";
     document.getElementById("wrongSound").play();

  vibrate([100, 50, 100]); // 📳 
  }

  setTimeout(nextQuestion,1500);
}

function nextQuestion(){
  clearInterval(timer);
  index++;
  vibrate(500);

  if(index<10){
    loadQuestion();
  } else {
    Swal.fire("Finished 🎉","Score: "+score+"/10","success")
    .then(()=>location.reload());
  }
}

function startTimer(){
  let time = 5;

  timer = setInterval(() => {
    document.getElementById("timer").innerText = time;
    time--;

    if(time < 0){
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}



function vibrate(ms){
  if (navigator.vibrate) {
    navigator.vibrate(ms);
  }
}