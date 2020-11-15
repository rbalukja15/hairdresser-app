const invoiceFormModel = {
    formId: 'invoice',
    formField: {
        code: {
            name: 'code',
            label: 'Kodi',
            requiredErrorMsg: 'Kodi eshte i detyrueshem',
        },
        description: {
            name: 'description',
            label: 'Pershkrimi',
            requiredErrorMsg: 'Pershkrimi eshte i detyrueshem',
        },
        unit: {
            name: 'unit',
            label: 'Njesia',
            requiredErrorMsg: 'Njesia eshte e detyrueshme',
        },
        quantity: {
            name: 'quantity',
            label: 'Sasia',
            requiredErrorMsg: 'Sasia eshte e detyrueshme',
            positiveNumberErrorMsg: 'Sasia duhet te jete numer pozitiv',
        },
        price: {
            name: 'price',
            label: 'Cmimi',
            requiredErrorMsg: 'Cmimi eshte i detyrueshem',
            positiveNumberErrorMsg: 'Cmimi duhet te jete numer pozitiv',
        },
    },
};

const formModels = {
    invoiceFormModel,
};

export default formModels;
