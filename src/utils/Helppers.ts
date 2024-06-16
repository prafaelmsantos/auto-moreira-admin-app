export function removeEmptyFields(data: any) {
    Object.keys(data).forEach((key) => {
      if (data[key] === '' ) {
         data[key] = null;
      }
    });
  }

  export const CurrencyFormatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  });

  export const imageTypes = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/jpeg'
  ];

  export const MAX_FILE_SIZE = 10000000;
