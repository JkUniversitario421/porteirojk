import { useState } from 'react';

const moradores = {
  '411': ['João', 'Maria', 'Carlos'],
  '421': ['Ana', 'Pedro', 'Fernanda'],
};

const empresas = ['iFood', 'Rappi', 'Uber Eats', 'Amazon', 'Mercado Livre', 'Farmácia São João', 'Panvel', 'Outros'];

export default function App() {
  const [numero, setNumero] = useState('');
  const [morador, setMorador] = useState('');
  const [entregador, setEntregador] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [mensagem, setMensagem] = useState('');

  const gerarMensagem = () => {
    if (!numero || !morador || !entregador || !empresa) return alert('Preencha todos os campos');

    const texto = `Olá ${morador}, o entregador ${entregador} está aqui na portaria com uma entrega da ${empresa}. Pode atender?`;
    setMensagem(texto);
  };

  const moradoresDoNumero = moradores[numero as '411' | '421'] || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Porteiro Virtual</h1>

        <label className="block mb-2">Número:</label>
        <select value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">Selecione</option>
          <option value="411">Rua Euclides da Cunha, 411</option>
          <option value="421">Rua Euclides da Cunha, 421</option>
        </select>

        {numero && (
          <>
            <label className="block mb-2">Morador:</label>
            <select value={morador} onChange={(e) => setMorador(e.target.value)} className="w-full p-2 mb-4 border rounded">
              <option value="">Selecione</option>
              {moradoresDoNumero.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </>
        )}

        <label className="block mb-2">Nome do Entregador:</label>
        <input
          type="text"
          value={entregador}
          onChange={(e) => setEntregador(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-2">Empresa:</label>
        <select value={empresa} onChange={(e) => setEmpresa(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">Selecione</option>
          {empresas.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>

        <button
          onClick={gerarMensagem}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Gerar Mensagem
        </button>

        {mensagem && (
          <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded">
            <p>{mensagem}</p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mt-2 block"
            >
              Enviar pelo WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
