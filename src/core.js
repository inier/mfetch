import { isNumber,process } from './lang'


export const core = {

    processFetch(options, previous) {
        options = previous(options)
        return fetch(options.url, options)
    },

    processRequest(options, previous) {
        return process(options, previous,options => {
            if (isNumber(options.timeout)) {
                const {timeout} = options
                delete options['timeout']
                return this.post('response',
                    new Promise((resolve, reject) => {
                        setTimeout(function () {
                            reject(new Error(`[serve-fetch Error] request "${options.url}" is timeout!`))
                        }, timeout)
                        this.post('fetch', options).then(resolve, reject)
                    })
                )
            }
            return this.post('response', this.post('fetch', options))
        })

    }
}