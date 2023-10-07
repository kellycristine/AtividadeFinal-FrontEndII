const apiUrl = "https://rickandmortyapi.com/api/";
const campoBusca = document.getElementById("campoBusca");
const resultado = document.getElementById("resultado");
const opcoesBusca = document.getElementById("opcoesBusca");

axios.get(apiUrl + "character")
    .then(response => {
        const quantidadePersonagens = response.data.info.count;
        const numPer = document.getElementById('nper')
        numPer.innerHTML=`${quantidadePersonagens}`
    })
    .catch(error => {
        console.error("Erro ao obter quantidade de personagens:", error);
    });

axios.get(apiUrl + "location")
    .then(response => {
        const quantidadeLocalizacoes = response.data.info.count;
        const nloc = document.getElementById('nloc')
        nloc.innerHTML = `${quantidadeLocalizacoes}`
    })
    .catch(error => {
        console.error("Erro ao obter quantidade de localizações:", error);
    });

    axios.get(apiUrl + "episode")
    .then(response => {
        const quantidadeEpisodios = response.data.info.count;
        const nep = document.getElementById('nep')
        nep.innerHTML = `${quantidadeEpisodios}`
    })
    .catch(error => {
        console.error("Erro ao obter quantidade de episódios:", error);
    });


async function buscarNomeUltimoEpisodio(urlEpisodio) {
  try {
    const response = await axios.get(urlEpisodio);
    const ultimoEpisodio = response.data;
    return ultimoEpisodio.name;
  } catch (error) {
    console.error("Erro ao obter detalhes do último episódio:", error);
    return "Erro ao obter detalhes do episódio";
  }
}

async function mostrarPersonagem(personagem) {
  const ultimoEpisodioName = await buscarNomeUltimoEpisodio(
    personagem.episode[personagem.episode.length - 1]
  );

  resultado.innerHTML = `
        <h2>${personagem.name}</h2>
        <p>${personagem.status} - ${personagem.species}</p>
        <p>Última localização conhecida:<br>${personagem.location.name}</p>
        <p>Visto pela última vez em:<br>${ultimoEpisodioName}</p>
        <img src="${personagem.image}" alt="${personagem.name}">
    `;
}

function buscarPersonagem(nome) {
  axios
    .get(apiUrl + "character", {
      params: { name: nome },
    })
    .then((response) => {
      const personagens = response.data.results;

      if (personagens.length > 0) {
        mostrarPersonagem(personagens[0]);
      } else {
        resultado.innerHTML = "Personagem não encontrado.";
      }

      exibirOpcoesBusca(personagens);
    })
    .catch((error) => {
      console.error("Erro ao buscar personagem:", error);
      resultado.innerHTML = "Ocorreu um erro ao buscar o personagem.";
    });
}

function exibirOpcoesBusca(personagens) {
  opcoesBusca.innerHTML = "";
  personagens.forEach((personagem) => {
    const opcao = document.createElement("div");
    opcao.textContent = personagem.name;
    opcao.classList.add("opcao-busca");
    opcao.addEventListener("click", () => {
      campoBusca.value = personagem.name;
      buscarPersonagem(personagem.name);
    });
    opcoesBusca.appendChild(opcao);
  });
}

campoBusca.addEventListener("input", () => {
  const nomePersonagem = campoBusca.value.trim();
  if (nomePersonagem !== "") {
    buscarPersonagem(nomePersonagem);
  } else {
    opcoesBusca.innerHTML = "";
    resultado.innerHTML = "";
  }
});
/*
const characters = document.querySelector("#characters");
const totalCharacters = document.querySelector("#personagens");
const totalLocations = document.querySelector("#localizacoes");
const totalEpisodes = document.querySelector("#episodios");
const API_characters = "https://rickandmortyapi.com/api/character";
const API_locations = "https://rickandmortyapi.com/api/location";
const API_episodes = "https://rickandmortyapi.com/api/location";

axios.get(API_characters).then(function (response) {
  const personagens = response.data.results;
  const nextPage = response.data.info.page;

  totalCharacters.innerHTML = response.data.info.count;

  console.log(nextPage);
  console.log(response);
  console.log(personagens);

  personagens.forEach((personagem) => {
    characters.innerHTML += `<article class="card">
      <figure>
        <img src=${personagem.image} alt="" />
      </figure>
      <aside>
        <div>
        <h3>${personagem.name}</h3>
        <div class="status">
            <div class=${personagem.status}></div>
            <h5>${personagem.status} - ${personagem.species}</h5>
        </div>
        </div>
        <div>
        <h4>Ultima localização conhecida:</h4>
        <p>${personagem.location.name}</p>
        </div>
        <div>
        <h4>Visto ultima vez em:</h4>
        <p>...</p>
        </div>
      </aside>
    </article>`;
  });
});

axios.get(API_locations).then(function (response) {
  totalLocations.innerHTML = response.data.info.count;
  console.log(response);
});

axios.get(API_episodes).then(function (response) {
  totalEpisodes.innerHTML = response.data.info.count;
  console.log(response);
});*/
