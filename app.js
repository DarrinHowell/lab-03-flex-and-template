'use strict';

const allHorns = [];
const uniqueNames = [];

function Horn (hornObject) {
  this.image_url = hornObject.image_url;
  this.title = hornObject.title;
  this.description = hornObject.description;
  this.keyword = hornObject.keyword;
  this.horns = hornObject.horns;

  allHorns.push(this);
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
  allHorns.forEach(animal => {
    animal.render();
  })
}

function findUniqueKeyword(){
  console.log('we mad it in to the function')
  console.log(allHorns.length);
  for(let i = 0; i < allHorns.length; i++){
    console.log('we made it into the for loop')
    if (!uniqueNames.includes(allHorns[i].keyword)){
      uniqueNames.push(allHorns[i].keyword);
    }
  }
  console.log('these are the ', uniqueNames);
}

$('select').change(function() {
  let $keyWord = $('select option:selected').text();
  $(`img:not([alt=${$keyWord}])`).parent('div').hide();
});


$('#hornSortButton').click(function() {
  // console.log(this.value);

});

// $('nav').on('click', 'button', function() {
//   $(`div`).hide();
//   const json1 = './page-1.json'
//   const json2 = './page-2.json';
//   (this.value === 'page1') ? readJSON(json1) : readJSON(json2);
//   console.log(this.value);
// });

readJSON();
