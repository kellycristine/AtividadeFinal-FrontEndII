const express = require('express');
const serve = express();

serve.get('https://rickandmortyapi.com/api')



serve.listen(3000, () => {
    console.log('deu certo')
});