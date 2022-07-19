// 유저가 값을 입력한다.
// + 버튼을 클릭하면 아이템이 추가된다. (할일 추가)
// 유저가 휴지통 버튼을 누르면 할일이 삭제 됨.
// 체크 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다.
// 진행 중 끝남 탭을 누르면, 언더바가 이동함.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나옴.
// 전체탭을 누르면 다시 전체아이템으로 돌아옴.


let taskInput = document.querySelector("#task-input");
let addButton = document.querySelector("#add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = "all";



// 언더라인 가져오기
let underLine = document.querySelector("#under-line");
let tabsBar = document.querySelectorAll(".task-tabs div:not(#under-line)");
console.log(tabsBar);

tabsBar.forEach((menu) => 
    menu.addEventListener("click", (e) => tabBar(e))
);


function tabBar(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}



// 메뉴바에 따른 리스트들
let filterList = [];
let taskList = [];

// 엔터키를 눌럿을 때 값이 추가 됨.
taskInput.addEventListener("keyup", function(event){
   if(event.keyCode === 13){
     event.preventDefault();
     addTask();
   }
})

addButton.addEventListener("click", addTask);


for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)
    
    });
}

console.log(tabs);


function addTask(){
    let taskValue = taskInput.value;

    if(taskValue == ""){
        return;
    }else{
        let task = {
            id: randomIDGenerate(), 
            taskContent : taskInput.value,
            isComplete: false,
        }
        taskList.push(task);
        console.log(taskList);
        render();

        taskInput.value =  "";
        taskInput.focus();
    }

}

function render(){
    
    // 임의의 list값을 설정 조건문에 따른 list값을 다르게 넣어준다
    let list = [];

 
    if(mode == "all"){    // 모두를 클릭했을 때 기존 taskList값을 list에 넣어줌.
        list = taskList;
    }else if(mode == "ongoing" || mode == "done"){ // 진행중을 클릭했을 때 기존 filterList값을 list에 넣어줌. 
        list = filterList;
    }


    // 반복문 안에 조건에서 list의 값을 출력하게끔 변경해준다. 리스트는 조건문에 따른 다른값이 적용되어있음.
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += 
            `<div class="task">
                <div class='task-done'>${list[i].taskContent}</div>

                <div>
                    <button class="reload-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-right"></i></button>
                    <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        }else{
            resultHTML +=
            `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button class="check-button" onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check "></i></button>
                    <button class="delete-button" onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`;
        }
    }

    document.querySelector("#task-board").innerHTML = resultHTML;

}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            // !(not)을 사용하여 현재 반대값을 가져오게된다. (true면 false / false면 true)
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}


function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
    
    // 값을 지워준 이후에
    for(let i=0; i<taskList.length; i++){
     if(taskList[i].id == id){
        taskList.splice(i, 1);
        break;
     }
   }
   // UI 업데이트
   render();
}


function filter(event){
    // 이벤트 타겟은 해당 컴포넌트의 값의 위치를 읽는다.
    console.log("filter", event.target.id);

    mode = event.target.id;
    filterList = [];

    if(mode == "all"){
        render();
    }else if(mode == "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode == "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }


    console.log(filterList);
}