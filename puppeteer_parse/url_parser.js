let url = 'https://www.cian.ru/cat.php?deal_type=rent&engine_version=2&offer_type=offices&p=2&region=4608'

let param = url.split('?').length == 2 ? url.split('?')[1] : 'undefined'

let param_json = param.split('&')
    .map(param => {
        return {
            p: param.split('=')[0],
            v: param.split('=')[1],
        }
    })

let new_param = param_json.map(item => {
    return `${item.p}=${item.v}`
}).join('&')

console.log(
    'param:\n', param,
    '\nparam_json:\n', param_json,
    '\nnew_param:\n', new_param,
    '\nnew_param === param:\n', new_param === param,
)


