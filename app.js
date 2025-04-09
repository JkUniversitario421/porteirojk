import React, { useState, useEffect } from 'react';

const SHEETDB_API = 'https://sheetdb.io/api/v1/SEU_ID_DA_API'; // substitua pelo seu

export default function App() {
  const [numero, setNumero] = useState('');
  const [moradores, setMoradores] = useState<{ nome: string }[]>([]);
  const [moradorSelecionado, setMoradorSelecionado] = useState('');
  const [entregador, setEntregador] = useState('');
  const [origem, setOrigem] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const origens = [
    'Mercado Livre', 'Amazon', 'Shopee', 'Magalu',
    'Panvel', 'Pague Menos', 'Drogasil',
    'iFood', 'Uber Eats', '99Food', 'Outro'
  ];

  useEffect(() => {
    if (numero) {
      fetch(`${SHEETDB_API}/search?numero=${numero}`)
        .then(res => res.json())
        .then(data => setMoradores(data));
    }
  }, [numero]);

  useEffect(() => {
    if (moradorSelecionado && entregador && origem && numero) {
      const texto = `Olá ${moradorSelecionado}, o entregador ${entregador} está em frente ao número ${numero} da Rua Euclides da Cunha com uma encomenda da ${origem}. Por favor, compareça para fazer a retirada.`;
      setMensagem(texto);
    }
  }, [moradorSelecionado, entregador, origem, numero]);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-6" : "bg-white text-black min-h-screen p-6"}>
      <div className="max-w-xl mx-auto font-sans">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-center w-full">Porteiro Digital</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-2 py-1 border rounded text-sm"
          >
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Rua:</label>
          <div className="text-gray-700 dark:text-gray-300">Rua Euclides da Cunha</div>
        </div>

        <div className="mb-4">
          <label className="block font-medium">Número (obrigatório):</label>
          <select
            className="w-full p-2 border rounded text-black"
            value={numero}
            onChange={(e) => {
              setNumero(e.target.value);
              setMoradorSelecionado('');
            }}
          >
            <option value="">Selecione</option>
            <option value="411">411</option>
            <option value="421">421</option>
          </select>
        </div>

        {moradores.length > 0 && (
          <div className="mb-4">
            <label className="block font-medium">Selecione o morador:</label>
            <select
              className="w-full p-2 border rounded text-black"
              value={moradorSelecionado}
              onChange={(e) => setMoradorSelecionado(e.target.value)}
            >
              <option value="">Selecione</option>
              {moradores.map((m, idx) => (
                <option key={idx} value={m.nome}>{m.nome}</option>
              ))}
            </select>
          </div>
        )}

        {moradorSelecionado && (
          <>
            <div className="mb-4">
              <label className="block font-medium">Nome do entregador (obrigatório):</label>
              <input
                className="w-full p-2 border rounded text-black"
                type="text"
                value={entregador}
                onChange={(e) => setEntregador(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-medium">Origem da entrega (obrigatório):</label>
              <select
                className="w-full p-2 border rounded text-black"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {origens.map((o, i) => (
                  <option key={i} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {mensagem && (
          <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-800">
            <p className="mb-2 font-medium">Mensagem pronta:</p>
            <p className="mb-4 text-sm">{mensagem}</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Enviar via WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
    }

