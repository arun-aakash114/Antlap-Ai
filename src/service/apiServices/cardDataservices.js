import { aiApiDomain } from '../apiserver'
import axios from "axios";


export const getCardDataAi = async (option, payload) => {
    try {
        let config = {
            method: 'post',
            url: `${aiApiDomain}/getCardDataAi?dataname=${option} `,
            data: payload,
            headers: {
                'Content-type': 'application/json',
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error);
    }
};

export const getCustomerCardDataAi = async (option, payload) => {
    try {
        let config = {
            method: 'post',
            url: `${aiApiDomain}/getCustomerCardDataAi?dataname=${option} `,
            data: payload,
            headers: {
                'Content-type': 'application/json',
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error);
    }
};

export const getCardData = async (option, payload) => {
    try {

        let config = {
            method: 'post',
            url: `${aiApiDomain}/getCardData?dataname=${option} `,
            data: payload,
            headers: {
                'Content-type': 'application/json',

            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}