
const util = {
  formatCurrency: (value: any) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },
  
  isDesktop: () => {
    return window.innerWidth > 896;
  },
  
  formatarData: (data: Date) => {
    return data.toLocaleDateString('pt-BR');
  },  

  removeMascaraCelular: (value: any) => {
    return value.replace(/\D/g, '');
  },

  transformStringsToUppercase(obj: any, fieldsToIgnore: string[] = []){
    for (let key in obj) {
      if (!fieldsToIgnore.includes(key) && typeof obj[key] === 'string') {
        obj[key] = obj[key].toUpperCase();
      } else if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map((item: any) => util.transformStringsToUppercase(item));
      } else if (typeof obj[key] === 'object') {
        obj[key] = util.transformStringsToUppercase(obj[key]);
      }
    }
    return obj;
  },
  
  validaCNPJ(cnpj: string) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
  
    if (/^(\d)\1+$/.test(cnpj)) return false;
  
    const pesosPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesosSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
    const calcularDigito = (digitos: string, pesos: number[]) => {
      let soma = 0;
      for (let i = 0; i < digitos.length; i++) {
        soma += parseInt(digitos[i]) * pesos[i];
      }
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
  
    const digito1 = calcularDigito(cnpj.slice(0, 12), pesosPrimeiroDigito);
    const digito2 = calcularDigito(cnpj.slice(0, 12) + digito1, pesosSegundoDigito);
  
    return cnpj.slice(-2) === `${digito1}${digito2}`;
  }
}

export default util;