import * as Yup from 'yup';
import formModels from './invoice.form.model';

const {
    formField: { code, description, unit, quantity, price },
} = formModels.invoiceFormModel;

const invoiceSchema = Yup.object().shape({
    code: Yup.string().required(code.requiredErrorMsg),
    description: Yup.string().required(description.requiredErrorMsg),
    unit: Yup.string().required(unit.requiredErrorMsg),
    quantity: Yup.number().positive(quantity.positiveNumberErrorMsg).required(quantity.requiredErrorMsg),
    price: Yup.number().positive(price.positiveNumberErrorMsg).required(price.requiredErrorMsg),
});
const validationSchemas = {
    invoiceSchema,
};

export default validationSchemas;
