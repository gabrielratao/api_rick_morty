



var resultValue = 1

function showDisplayValue(number) {
    document.getElementById('total-result').value += number
    display = document.getElementById('total-result')
    
}

function getResult(){
    try {
        const result = eval(document.getElementById("total-result").value);
        document.getElementById("total-result").value = result;
        resultValue = result
        removeAlert()
    } catch (error) {
        document.getElementById("total-result").value = "Há algo errado";
    }
}

function clearAll(){
    document.getElementById('total-result').value = ''
    removeAlert()
}




function getCharacter() {
    $("#characteristics").empty();
    $.ajax({
        url: "https://rickandmortyapi.com/api/character/" + resultValue,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var name = data.name;
            var status = data.status;
            var specie = data.species;
            var img = data.image;
            var origin = data.origin.name;
            
            console.log(name, status, specie, origin)
            addTableRow(name, status, specie, img, origin)
            changeImage(img)
            removeAlert()
        },
        error: function(){
            changeImage('../assets/image-rick.jpeg')
            addAlert()
            
        }
        
        
    });
    
}

function changeImage(img){
    var image = document.getElementById('rick-morty-img')
    image.src = img
    image.alt = "Imgaem Personagem"
    
}

function addTableRow(name, status, specie, img, origin) {
    // Cria uma linha pra tabela
    var row = document.createElement("tr");

    // Cria a célula para a coluna Nome
    var td_name = document.createElement("td");
    td_name.innerHTML = name;

    // Cria a célula para a coluna Nome
    var td_status = document.createElement("td");
    td_status.innerHTML = status;

    // Cria a célula para a coluna Nome
    var td_specie = document.createElement("td");
    td_specie.innerHTML = specie;

    // Cria a célula para a coluna Nome
    var td_origin = document.createElement("td");
    td_origin.innerHTML = origin;

    // Adiciona as células na linha
    row.append(td_name);
    row.append(td_status);
    row.append(td_specie);
    row.append(td_origin);
    

    // Adiciona a linha na tabela no HTML
    $("#characteristics").append(row);
}

function addAlert(){
    var alertParaph = document.createElement("p")
    alertParaph.innerHTML = 'Aparentemente esse personagem não existe.<br> Clique em CE para calcular novamente'
    alertParaph.id = 'alert-paraph'
    var elementoPai = document.getElementById("rick-morty-container"); // Substitua "elementoPai" pelo ID do elemento ao qual você deseja adicionar o parágrafo.
    
    
    elementoPai.appendChild(alertParaph);
}

function removeAlert() {
    var paragrafo = document.getElementById('alert-paraph');
  
    if (paragrafo) {
      paragrafo.remove();
    } else {
      console.error("Parágrafo não encontrado!");
    }
  }