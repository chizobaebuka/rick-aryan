import Joi from 'joi';
import { InvoiceStatus } from '../../entities/Invoice';

export const invoiceQuerySchema = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).max(100).default(20),
});

export const createInvoiceSchema = Joi.object({
  invoiceNumber: Joi.string().min(3).max(64).required(),
  clientName: Joi.string().min(2).max(200).required(),
  amountNGN: Joi.number().positive().required(),
  status: Joi.string()
    .valid(...Object.values(InvoiceStatus))
    .optional(),
  dueDate: Joi.string().isoDate().optional(),
});
