'use strict';

let allAnimal = [];
let optionArr = ['narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon', 'narwhal', 'narwhal', 'triceratops', 'rhino', 'mouflon', 'lizard', 'dragon', 'unicorn', 'markhor', 'chameleon'];

function Animal(animalObj) {
    this.image_url = animalObj.image_url;
    this.title = animalObj.title;
    this.description = animalObj.description;
    this.keyword = animalObj.keyword;
    this.horns = animalObj.horns;
    allAnimal.push(this);
}

Animal.prototype.render = function () {
    let templete = $('.photo-template').clone();
    $('main').append(templete);
    templete.find('h2').text(this.title);
    templete.find('img').attr('src', this.image_url);
    templete.find('p').text(this.description);
    templete.removeClass('photo-template');
}

var animArr = [];
$.ajax('data/page-1.json')
.then(data=>{
    console.log(data); // array of objects
    data.forEach((val,idx)=>{
        let newAnimal = new Animal(val);
        newAnimal.render();
        if (animArr.indexOf(newAnimal.keyword) === -1) {
            animArr.push(newAnimal.keyword);
          }
    });
    selectItem();
});


function selectItem() {
    animArr.forEach(element => {
        let option = $(`<option value="${element}"> ${element}</option>`);
        console.log(option);
        $('select').append(option);
    });
}

$('select').click(function (event) {

    let selected = $('select').val();
  
    if (event.target.value !== 'default' || event.target.value !== selected) {
      console.log(event.target.value);
     
      $('main').empty();
    //   $('main').append('section');
      $('main').append(`<section class="photo-template">
      <h2></h2>
      <img src="" alt="">
      <p></p>
    </section>`);

      allAnimal.forEach(function (value, indext) {
  
        if (value.keyword === event.target.value) {
          value.render();
        }
      }); 
    }
  });
