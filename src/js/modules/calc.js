import { getResource } from "../services/requests";

const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result),
          sizeOptions = document.querySelectorAll('#size option'),
          materialOptions = document.querySelectorAll('#material option'),
          optionOptions = document.querySelectorAll('#options option'),

          sum = 0;

    const currentPrices = async (api, selector) => {
        return getResource(api)
            .then(item => {
                setOption(item, sizeOptions);
                setOption(item, materialOptions);
                setOption(item, optionOptions);
            })
    }

    const setOption = (arr, selector) => {
        let obj = arr[0];
        let keys = Object.keys(obj);
        keys.pop()

        const values = [];


        selector.forEach((item, i) => {
            if (i < keys.length) {
                item.value = obj[keys[i]];
                values.push(item.value)

            }
        })

        console.log(values)

    }





     currentPrices('http://localhost:3000/size', sizeOptions);
     currentPrices('http://localhost:3000/material', materialOptions);
    currentPrices('http://localhost:3000/options', optionOptions);



    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
        } else  if (promocodeBlock.value === 'IWANTPOPART'){
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    sizeBlock.addEventListener('change', calcFunc, currentPrices);
    materialBlock.addEventListener('change', calcFunc, currentPrices);
    optionsBlock.addEventListener('change', calcFunc, currentPrices);
    promocodeBlock.addEventListener('input', calcFunc);

};

export default calc;