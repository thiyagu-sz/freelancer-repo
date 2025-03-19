import React, {useEffect, useRef } from 'react';

const TranslateComponent = () => {

const googleTranslateRef = useRef (null);

useEffect(() => {

let intervalld; 

const checkGoogleTranslate = () => {

if (window.google && window.google.translate) {

clearInterval(intervalId);

new window.google.translate.TranslateElement(

{pageLanguage: 'en', layout: window.google.translate. TranslateElement.InlineLayout.SIMPLE }, googleTranslateRef.current

);

};

intervalld = setInterval(checkGoogleTranslate, 100);
}

}, []);
return (

    <div>
    
    <div ref={googleTranslateRef}></div>
    
    </div> 
    );
    };

    
    export default TranslateComponent;