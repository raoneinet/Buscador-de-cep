document.querySelector(".search-btn").addEventListener("click", async (e) => {
    e.preventDefault() //previne comportamento padrão do button

    let cepFiveNumbers = document.querySelector(".cep--five-number").value //armazena valor do input 5 números
    let cepThreeNumbers = document.querySelector(".cep--three-number").value //armazena valor do input 3 números

    let fullCep = cepFiveNumbers + cepThreeNumbers //concatena valores dos inputs 5 + 3 (string)

    if(cepFiveNumbers.length == "" || cepThreeNumbers.length == ""){
        alert("Erro! Obrigatório digitar nos campos.") //se espaços vazios, então alerta de erro
        document.querySelector(".result").innerHTML = ""
    }else{
        //Faz requisição API
        const cepUrl = `https://cep.awesomeapi.com.br/json/${fullCep}`
        const cepRequest = await fetch(cepUrl)
        const json = await cepRequest.json()

        //Verifica se requisição retorna cep existente
        if(cepRequest.ok){
            showInfo({
                cep: json.cep,
                address: json.address,
                city: json.city,
                state: json.state,
                ddd: json.ddd,

            })
            console.log(json)
        }else{
            //Cep inexistente retorna erro
            showWarning(`Erro! O CEP <strong>${fullCep}</strong> não foi encontrado.`)
        }
    }
})

//Renderizar respostas
function showInfo(json){

    let info = document.querySelector(".result")
    info.innerHTML = ""
    let div = document.createElement("div")

        //Exibe dados de resposta Json
        div.innerHTML = `
            <h1>CEP buscado: ${json.cep}</h1>
            <div>
                <p>Endereço: ${json.address}</p>
                <p>Cidade: ${json.city}</p>
                <p>Estado: ${json.state}</p>
                <p>DDD: ${json.ddd}</p>
            </div>
        `

    info.appendChild(div)
}

//Renderiza mensagem de erro
function showWarning(msg){
    document.querySelector(".result").innerHTML = msg
}