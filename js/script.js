const listaPaises = document.getElementById('countries-list');

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
    });
})

imprimirBanderas().then((data)=>template(data));