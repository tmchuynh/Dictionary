function search(ele) {
    if(event.key === 'Enter') {
        alert(ele.value);  
        getData(ele.value);      
    }
}



function getData(searchInput) {
    $.getJSON('https://api.dictionaryapi.dev/api/v2/entries/en/' + searchInput, function(data) {
        console.log(data);
        displayData(data);
    })
}

var main_content = document.querySelector('.main-content');


function displayData(data) {
    var section = document.createElement('section');
    section.classList.add("header");
    section.classList.add("justify-content-between");
    main_content.appendChild(section);

    var flex_column = document.createElement('div');
    flex_column.classList.add("flex-column");
    section.appendChild(flex_column);

    var h1 = document.createElement('h1');
    h1.classList.add("word");
    h1.textContent = data[0].word;
    flex_column.appendChild(h1);

    var code = document.createElement('code');
    code.classList.add("pronouncation");
    code.textContent = data[0].phonetics[1].text;
    flex_column.appendChild(code);

    var play = document.createElement('button');
    play.classList.add("btn");
    play.addEventListener("click", function() {
        playAudio(data[0].phonetics[0].audio);
    })
    var play_icon = document.createElement('i');
    play_icon.classList.add("bi");
    play_icon.classList.add("bi-play-circle-fill");
    play.appendChild(play_icon);
    section.appendChild(play);

    var definitions = document.createElement('div');
    definitions.classList.add("definitions");
    section.appendChild(definitions);

    for (var i = 0; i < data[0].meanings.length; i++) {
        var h6 = document.createElement('h6');
        h6.textContent = data[0].meanings[i].partOfSpeech;
        definitions.appendChild(h6);
        var i = document.createElement('i');
        i.classList.add("text-muted");
        i.textContent = "Meaning"
        definitions.appendChild(i);
    }

    var ul = document.createElement('ul');
    ul.classList.add("definition-bullets");
    definitions.appendChild(ul);

    var def = data[0].meanings[0].definitions;
    for (var j = 0; j < def.length; j++) {
        var li = document.createElement('li');
        li.textContent = def[j].definition;

        ul.appendChild(li);
    }
    main_content.appendChild(section);
}

function playAudio(link) {
    link.play();
}