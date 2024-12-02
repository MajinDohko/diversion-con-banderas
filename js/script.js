const listaPaises = document.getElementById('countries-list');


//Traemos mediante el async/await la url de las banderas con su información
const imprimirBanderas = async () =>{
    try {
        const response = await fetch ('https://restcountries.com/v3/all');
        if (!response.ok) {
            throw new Error("Ha surgido un problema", response.status);
        }
        const data = await response.json();
        return data;
    }catch (error){
        console.log('Error al obtener los datos', error)
    }
}

const template = ((paises)=>{
    paises.forEach(pais => {
        const imprimirPais = document.createElement('div')
        imprimirPais.classList.add('cuadro-bandera')
        imprimirPais.innerHTML = `<img class="bandera" src="${pais.flags[0]}"/>
        <p>${pais.name.common}</p>`
        listaPaises.appendChild(imprimirPais);
        console.log(pais.name.common, pais.flags[0], pais.capital)

        imprimirPais.addEventListener('click',()=>{
            ventanaEmergente(pais);
        })
    });
})

//Aquí hacemos el sort dentro para ordenar las banderas una vez nos las imprima en pantalla
imprimirBanderas().then((data)=>{
    const paisesOrdenados = data.sort((a, b) =>
         a.name.common.localeCompare(b.name.common));
        template(paisesOrdenados);
});


function ventanaEmergente (pais){
    const popUp = document.getElementById('popUp');
    const paisEmergente = document.getElementById('propiedadesPais');

    const imagen = pais.flags[0];

    paisEmergente.innerHTML = `
    <img class="bandera" src="${imagen}" />
    <p>${pais.name.common}</p>
    <p>Capital: ${pais.capital[0]}</p>
    <p>Población: ${pais.population}</p>`;

    popUp.classList.remove('oculto');

    const popUpBtn = document.getElementById('popUpBtn');
    popUpBtn.addEventListener('click', ()=>popUp.classList.add('oculto'));
}