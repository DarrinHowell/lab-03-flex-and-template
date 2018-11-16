'use strict';


// ------ Global Variables ------ //


const _allHorns = [];
const uniqueNames = [];


// ------ Constructor Functions  ------ //

function Horn (hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;

  _allHorns.push(this);
}

Horn.prototype.render = function(){
  let photoSource = $('#photo-handlebars').html();
  let photoTemplate = Handlebars.compile(photoSource);
  let photoHTML = photoTemplate(this);

  $('main').append(photoHTML);
  $(`p`).hide();

}

// ------ Helper Functions  ------ //


function readJSON(JSONFile){
  $.get(JSONFile, data => {
    data.forEach(animal => {
      new Horn(animal);
    });
  }).then(renderAllHorns);
}

function filterHorns() {
  uniqueNames.forEach(value =>{
    $('select').append('<option class = newItem></option>');
    let $newOption = $('option[class = "newItem"]');

    $newOption.text(value);

    $newOption.attr('class', '');
  })
}

function renderAllHorns () {
  _allHorns.forEach(animal => {
    animal.render();
  })
}

function findUniqueKeyword(){
  console.log('we mad it in to the function')
  console.log(_allHorns.length);
  for(let i = 0; i < _allHorns.length; i++){
    console.log('we made it into the for loop')
    if (!uniqueNames.includes(_allHorns[i].keyword)){
      uniqueNames.push(_allHorns[i].keyword);
    }
  }
  console.log('these are the ', uniqueNames);
}


// ------ Event Handlers  ------ //

// rendering images based on nav button
$('#navButtons').on('click', 'button', function() {
  event.preventDefault();
  let pageID = this.value;
  if(pageID === 'page2') {
    readJSON('page-2.json');
  }
});

// hide according to select value pressed
$('select').change(function() {
  let $keyWord = $('select option:selected').text();
  $(`img:not([alt=${$keyWord}])`).parent('div').hide();
});


// sort by horns
$('.buttonContainer').on('click', 'button', function() {
  console.log(this.value);
  let dataType = this.value;
  console.log('objects before sort', _allHorns)
  _allHorns.sort( (a,b) => {
    let flag = 0;
    if(a[dataType] > b[dataType]){
      flag = 1;
    } else if (a[dataType] < b[dataType]){
      flag = -1;
    }
    return flag;
  })
  console.log('objects after sort', _allHorns)
  renderAllHorns();
});

if(document.URL.contains('index.html')){
  readJSON('page-1.json');
}

// what we want to do instead of use an if else is to have an eventlistener on the button that
// renders our horns based on the click
