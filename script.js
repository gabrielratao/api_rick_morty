var resultValue = 1

//mostrar os valores no display
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

//eliminar o paragrafo de aviso
function clearAll(){
    document.getElementById('total-result').value = ''
    removeAlert()
}



// request na API
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
            changeImage("./assets/image-rick.jpeg")
            addAlert()
            
        }
        
        
    });
    
}

function changeImage(img){
    var image = document.getElementById('rick-morty-img')
    image.src = img
    image.alt = "Imagem Personagem"
    
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
    var elementoPai = document.getElementById("rick-morty-container"); 
    
    
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

// função para ajustar layout da tela
function verificarLarguraDaTela() {
    const larguraDaTela = window.innerWidth;
    // console.log(`Largura da tela: ${larguraDaTela}px`);
    
    

    if (larguraDaTela <= 900){ //dispositivo móvel
        // console.log('Dispositivo Móvel')
        alert('Esse sistema ainda não está 100% disponível em Mobile. Reduza o Zoom para utilizar')
        var mainSection = document.getElementById('main-section')
        var rickMorty = document.getElementById('rick-morty-container')


        mainSection.style.flexDirection = 'column'
        mainSection.style.height = '180vh'
        mainSection.style.marginLeft = '10px'

        rickMorty.style.width = '440px'
        rickMorty.style.height = '70vh'
        

        
    } 
    else {
      
        // console.log('Não móvel');
        
        mainSection.style.flexDirection = 'row'
        mainSection.style.height = '94vh'
        mainSection.style.marginLeft = 'none'

        rickMorty.style.height = '85vw'
        rickMorty.style.width = '40vw'
    }
  

}
  
  // verificar o tamanho da tela do usuário assim que a página é carregada
  window.addEventListener('load', verificarLarguraDaTela);