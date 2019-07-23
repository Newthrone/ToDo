let inputDo;
let listDo;
let blockTodo;
let todoList = [];
let items;

function findTodoElements() {
  inputDo = document.querySelector('.newDo');
  listDo = document.querySelector('.listDo');
  blockTodo = document.querySelector('.js-todo');
}

function findOnlyItems() {
  items = [].slice.apply(document.querySelectorAll('.item'));
}

function renderTodo(html) {
  listDo.insertAdjacentHTML('afterBegin', html);
}

function assembleTodo(todo, completeClass) {
  return `
    <div class="item ${completeClass}">${todo}</div>
  `
}

function isInactive(isActive) {
  return (!isActive) ? 'item-complete' : '';
}

function enumeration(objTodo) {
  return objTodo.reduceRight( (prev, current) => {
    const classComplete = isInactive(current.active);
    return prev += assembleTodo(current.todo, classComplete)
  }, '');
}

function changeStateCase(item) {
  item.classList.toggle('item-complete');
}

function reOpen() {
  if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    let html = enumeration(todoList);
    renderTodo(html);
  }
}

function addTask(todo) {
  renderTodo(assembleTodo(todo));
}

function makeObj() {
  return {
    'todo': inputDo.value,
    'active': true,
  }
}

function isEmptyInput() {
  return !inputDo.value;
}

function serialize() {
  localStorage.setItem('todo', JSON.stringify(todoList));
}

function handlerAddDo() {
  if (isEmptyInput()) return;
  let instance = makeObj();
  addTask(instance.todo);
  todoList.push(instance);
  serialize();
  inputDo.value = null;
}

function updateChecked(text) {
  todoList.forEach( item => {
    if (item.todo === text) {
      item.active = !item.active;
      serialize();
    } 
  });
}

function doChecked(item) {
  changeStateCase(item);
  updateChecked(item.textContent);
}

function handlerOnclick(event) {
  let { target } = event;
  if (target.classList.contains('js-add')) handlerAddDo();
  if (target.classList.contains('item')) doChecked(target);
}

function subscribe () {
  inputDo.addEventListener('change', handlerAddDo);
  blockTodo.addEventListener('mousedown', handlerOnclick);
}

function init() {
  findTodoElements();
  reOpen();
  subscribe();
}

window.onload = init();
