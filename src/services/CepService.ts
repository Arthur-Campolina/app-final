export interface CepData {
    rua: string;
    cidade: string;
    uf: string;
    bairro: string;
  }
  
  export async function fetchCep(cep: string): Promise<CepData | null> {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        return null;
      }
      return {
        rua: data.logradouro,
        cidade: data.localidade,
        uf: data.uf,
        bairro: data.bairro,
      };
    } catch (error) {
      console.error("Erro ao consultar CEP:", error);
      return null;
    }
  }
  