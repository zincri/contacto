import axios from 'axios';
import React, {useEffect, useState} from 'react';
const baseUrl = 'http://127.0.0.1:8000/';
export const CallApi = (url,headers) => {
    const result = null;
    fetch(baseUrl + url,headers)
    .then( res => {result = res;})
    .catch(error => {
        console.log(error);
        return error;
    })
    return result;
}

export const useFetch = (url, initialValue, method, parameters) => {
    const [result, setResult] = useState(initialValue);
    useEffect(()=>{
        let config = {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'method':method,
            body: JSON.stringify(parameters) 
        };
        fetch(url,config)
        .then(response => response.json())
        .then(json => {
            setResult(json)
        })
        .catch( error => 
            console.log(error)
        );
    },[]);

    return result;
}
