import dotenv from 'dotenv';
dotenv.config();

export const SPTRANS_SCD_USERNAME = process.env.SPTRANS_SCD_USERNAME || '';
export const SPTRANS_SCD_PASSWORD = process.env.SPTRANS_SCD_PASSWORD || '';
export const SPTRANS_SCD_URL = process.env.SPTRANS_SCD_URL || '';