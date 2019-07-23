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

function renderTodo(html) {
  listDo.insertAdjacentHTML('afterBegin', html);
}

function assembleTodo(todo) {
  return `
    <div class="item">${todo}</div>
  `
}

function enumeration(objTodo) {
  return objTodo.reduceRight( (prev, current) => prev += assembleTodo(current.todo), '');
}

function changeStateCase(item) {
  item.classList.toggle('item-complete');
}

function isActive(item, index) {
  if (!item.active) changeStateCase(items[index]);
}

function reOpen() {
  if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    let html = enumeration(todoList);
    console.log(html);
    renderTodo(html);
    items = [].slice.apply(document.querySelectorAll('.item'));
    todoList.forEach(isActive);
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
      item.active = false;
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
