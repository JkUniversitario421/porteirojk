const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Porteiro JK Online</h1><p>App funcionando com sucesso!</p>');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
