import {  backEndDomain } from '../apiserver'
import axios from "axios";
const jwt = localStorage.getItem('UserToken');

export const endMeeting = async (data) => {
    try {
        let config = {
            url: `${backEndDomain}/webapi/webmeetings/webendmeeting`,
            method: 'put',
            data: { requestid: data },
            headers: {
                'Content-type': 'application/json',
                'token': jwt,
            }
        }
        let res = await axios(config)
        return res.data
    } catch (error) {
        console.error(error)
    }
}