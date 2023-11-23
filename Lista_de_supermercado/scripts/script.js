

const localStorageName = 'to-do-list-mercado'





function newTask() {


    let input = document.querySelector('.container_input')
    let regexSpaco = input.value.replace(/^(?!\s*$).+/, '');

    if (input.value == regexSpaco) {
        alert('Digite algo')
        input.style.border = '1px solid red'
    } else {
        let values = JSON.parse(localStorage.getItem(localStorageName) || '[]')

        values.push({


            name: input.value,
            done: false,

        })
        input.style.border = 'initial'
        localStorage.setItem(localStorageName, JSON.stringify(values))
        showValues()
    }

    input.value = ''
    input.focus()
}




function showValues() {

    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let list = document.getElementById('listaSupermercado')
    list.innerHTML = ''


    for (let i = 0; i < values.length; i++) {
        let taskId = `${i + 1} `
        list.innerHTML += ` <li id="${taskId}" data-done=${values[i].done} class="container_list__li">
        <span class="task" >${taskId}${values[i].name}</span>

        <div class="buttons">
            <div class="done-btn" >
                 <img  class="icone" src="./src/inserts/sucesso.png"alt="icone do botao">
            </div>
            <button class="edit-btn" onclick='editItem(${i}, prompt("Novo nome:"))' >
                <img class="icone" src="./src/inserts/editar.png"alt="icone do botao"  >
            </button>
            <button class="remove-btn" onclick='removeItem("${values[i].name}")'>
             <img class="icone" src="./src/inserts/remover.png" alt="icone do botao">
            </button>
        </div>
    </li>`
    }


    taskDone()
    showListOfProducts()

}

showValues()


function taskDone() {
    const doneBtn = document.querySelectorAll(".done-btn");

    doneBtn.forEach((btn) => btn.addEventListener("click", (e) => {
        //Cria as constantes
        const li = e.target.parentNode.parentNode;
        const id = parseInt(li.getAttribute("id") - 1);

        const array = JSON.parse(localStorage.getItem(localStorageName) || '[]');

        // se true -> false
        // se false -> true
        !!array[id].done ? li.setAttribute("data-done", "false") : li.setAttribute("data-done", "true");
        array[id].done = !array[id].done;
        localStorage.setItem(localStorageName, JSON.stringify(array));
    }))

}





function editItem(index, novoNome) {
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    if (index >= 0 && index < values.length) {
        if (novoNome !== null) {
            values[index].name = novoNome;
            localStorage.setItem(localStorageName, JSON.stringify(values));
            showValues();

        }
    }
    showListOfProducts()
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
    let index = values.findIndex(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showValues();
    showListOfProducts()
}


function showListOfProducts() {
    let array = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    let productList = document.getElementById('select-item')
    productList.innerHTML = ''
    productList.innerHTML += `<option value="" class="option">Escolha seu produto</option>`;

    for (let i = 0; i < array.length; i++) {
        let taskId = `${i + 1}`;
        productList.innerHTML += `
            <option value="${taskId}" class="option">
                ${taskId} ${array[i].name}
            </option>`;
    }

    productList.addEventListener('change', function () {
        const selectedValue = this.value; // Use this.value para obter o valor selecionado
        const selectedProductParagraph = document.getElementById('selected-product');

        if (selectedValue !== "") {
            const selectedProduct = array[selectedValue - 1];

            if (selectedProduct && selectedProduct.name) {
                selectedProductParagraph.textContent = `Produto Selecionado: ${selectedProduct.name}`;
            } else {
                selectedProductParagraph.textContent = "Produto selecionado inválido";
            }
        } else {
            selectedProductParagraph.textContent = "Nenhum produto selecionado";
        }
    });
}

showListOfProducts()

function searchByInput() {
    let array = JSON.parse(localStorage.getItem(localStorageName) || '[]')
    const inputElement = document.getElementById('searchInput');
    const inputValue = String(inputElement.value);
    const paragraphText = document.getElementById('product-found')
    const foundItem = array.find(item => item.name.includes(inputValue));

    if (inputValue.trim() === '') {
        paragraphText.textContent = "Nenhum produto encontrado";
        return paragraphText.textContent = "Digite algo";
    }

    if (foundItem) {
        paragraphText.textContent = `Produto Selecionado: ${foundItem.name}`;
    } else {
        paragraphText.textContent = "Nenhum produto encontrado";
    }
    inputElement.value = '';

}





function buscarItemPorId() {
    const idInput = document.getElementById('idInput');
    const id = parseInt(idInput.value);

    if (!isNaN(id)) {
        const values = JSON.parse(localStorage.getItem(localStorageName) || '[]');
        const itemEncontrado = values[id - 1];

        if (itemEncontrado) {
            document.getElementById('itemEncontrado').textContent = `Item encontrado: ${itemEncontrado.name}`;
        } else {
            document.getElementById('itemEncontrado').textContent = 'ID inválido. Item não encontrado.';
        }
    } else {
        document.getElementById('itemEncontrado').textContent = 'Por favor, insira um ID válido.';
    }

    idInput.value = ''
}

