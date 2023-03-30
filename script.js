let elList = document.querySelector("#list");
let elForm = document.querySelector("#form");
let elDelBtn = document.querySelectorAll("#DeleteBtn");


let todosArr = getLocalStoreg() || [];
elForm.addEventListener("submit", evt => {
    evt.preventDefault()
    let {todo} = evt.target.elements
    let newObject ={
        id:todosArr.length +1,
        todo: todo.value.trim(),
        isComplate: false,
    };
    
    todosArr.unshift(newObject);
    saveLocalStoreg(todosArr);  
    renderingFunc(todosArr,elList);
    todo.value = null;
    
})

function renderingFunc(array, element){
    element.innerHTML=null;
    for(let i=0; i<array.length; i++){
        let newLi =document.createElement("li");
        let newH4=document.createElement("h4");
        let newChecbox=document.createElement("input");
        let newDel=document.createElement("Delete");
        
        if(array[i].isComplate){
            newChecbox.setAttribute("checked" ,"true")
        }
        
        newLi.setAttribute("class", "d-flex justify-content-between  border gap-3","style","width: 330px;" );
        newChecbox.setAttribute( "type","checkbox","style","margin-left:80px");
        newDel.setAttribute("class","btn btn-danger", "type","submit");
        newH4.setAttribute("class","px-2");
        newDel.dataset.todoId = array[i].id;
        newChecbox.dataset.todoId = array[i].id;
        
        
        newDel.addEventListener('click',evt =>{
            let btnId = evt.target.dataset.todoId;
            let foundIndex = todosArr.findIndex((item) => item.id == btnId);
            todosArr.splice(foundIndex, 1);
            saveLocalStoreg(todosArr);
            renderingFunc(todosArr, elList);
        })
        
        
        newChecbox.addEventListener('click',evt =>{
            let btnId = evt.target.dataset.todoId;
            let foundIndex = todosArr.findIndex((item) => item.id == btnId);
            foundTodo.isComplate = !foundTodo.isComplate;
            saveLocalStoreg(todosArr);
            renderingFunc(todosArr, elList);
        })

        newH4.textContent=todosArr[i].todo;
        newDel.textContent="Delete";
        
        newLi.append(newH4);
        newLi.append(newChecbox);
        newLi.append(newDel);
        element.append(newLi);
    }
}

renderingFunc(todosArr, elList);

function saveLocalStoreg(value){
    window.localStorage.setItem("todos", JSON.stringify(value));
}

function getLocalStoreg(){
   return JSON.parse(window.localStorage.getItem("todos"));
}