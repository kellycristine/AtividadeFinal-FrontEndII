const express = require('express');
const serve = express();


serve.listen(3000, () => {
    console.log('deu certo')
});