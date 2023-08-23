import { aiApiDomain, backEndDomain } from '../apiserver'
import axios from "axios";
const jwt = localStorage.getItem('UserToken')

export const getFaultDesc = async (data) => {
    try {
        let config = {
            method: 'post',
            url: ` ${aiApiDomain}/getFaultDesc`,
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
};

export const getCardDataAi = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `${aiApiDomain}/getCardDataAi?dataname=commonResolution`,
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getCustomerCardDataAi = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `${aiApiDomain}/getCustomerCardDataAi?dataname=commonResolution`,
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getCardData = async (data) => {
    try {
        let config = {
            method: 'post',
            url: `${aiApiDomain}/getCardData?dataname=commonResolution`,
            data: data,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getResolutions = async (id) => {
    let data = ''
    if (sessionStorage.getItem('proType') == 'Non IoT') {
        data = 'NonIOT'
    } else { data = 'IOT' }
    try {
        let config = {
            method: 'get',
            url: `${backEndDomain}/webapi/webAISourceData/viewresolutionlist?tenantId=GAINWELL_01&type=${data}&sourceId=${id}`,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getIcondata = async (iconname, id) => {
    try {
        let config = {
            method: 'get',
            url: `${backEndDomain}/webapi/webAISourceData/viewiconbase?Iconname=${iconname}&SourceFileId=${id}`,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}

export const getCarddataforEdit = async (type, id, path) => {
    try {
        let config = {
            method: 'get',
            url: `${backEndDomain}/webapi/webAISourceData/viewcarddata?SourceFileId=${id}&DataType=${type}&path=${path}`,
            headers: {
                'Content-type': 'application/json',
                'token': jwt
            }
        }
        let res = await axios(config);
        return res
    } catch (error) {
        console.error(error)
    }
}