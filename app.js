'use strict';

const _allHorns = [];
const uniqueNames = [];

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

const readJSON = function(){
  const json1 = './page-1.json'
  const json2 = './page-2.json';
  if(top.location.pathname === '/index.html'){
    $.get(json1, data => {
      data.forEach(animal => {
        new Horn(animal);
      })
      findUniqueKeyword();
      filter(uniqueNames);
    }).then(renderAllHorns);
  } else if (top.location.pathname === '/gallery-page2.html'){
    $.get(json2, data => {
      data.forEach(animal => {
        new Horn(animal);
      })
      findUniqueKeyword();
      filter(uniqueNames);
    }).then(renderAllHorns);
  }

}

function filter(array, id) {
  array.forEach(value =>{
    $(id).append('<option class = newItem></option>');
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

$('select').change(function() {
  let $keyWord = $('select option:selected').text();
  $(`img:not([alt=${$keyWord}])`).parent('div').hide();
});


$('.buttonContainer').on('click', 'button', function() {
  console.log(this.value);
  let dataType = this.value;
  console.log('objects before sort', _allHorns)
  _allHorns.sort( (a,b) => {
    let flag = 0;
    if(a[dataType] > b[dataType]){
      flag = -1;
    } else if (a[dataType] < b[dataType]){
      flag = 1;
    }
    return flag;
  })
  console.log('objects after sort', _allHorns)
  renderAllHorns();
});

readJSON();
