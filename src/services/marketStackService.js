const axios = require('axios');

const FMP_API_URL = 'https://financialmodelingprep.com/api/v3/historical-price-full';
const FMP_API_KEY = process.env.FMP_API_KEY || 'la_tua_chiave_api';

/**
 * Effettua una richiesta per ottenere i dati storici di un ETF
 * @param {string} symbol - Simbolo dell'ETF (es: "IWDA" per iShares Core MSCI World UCITS ETF)
 * @param {string} date_from - Data di inizio (formato: YYYY-MM-DD)
 * @param {string} date_to - Data di fine (formato: YYYY-MM-DD)
 * @returns {Promise<Object>} - Dati storici dell'ETF
 */

exports.getETFData = async ({ symbol, date_from, date_to }) => {
    try {
        if (!symbol) {
            throw new Error('Il parametro "symbol" è obbligatorio.');
        }

        const url = `${FMP_API_URL}/${symbol}`;
        const response = await axios.get(url, {
            params: {
                from: date_from,
                to: date_to,
                apikey: FMP_API_KEY,
            },
        });
        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.error('Errore nella chiamata a FinancialModelingPrep:', error.response?.data || error.message);
        return {
            success: false,
            message: error.response?.data?.error?.message || error.message,
        };
    }
};
