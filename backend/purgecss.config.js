module.exports = {
    content: ['doppelkopf/templates/**/*.html'],
    css: ['doppelkopf/static/style.css'],
    extractors: [
        {
            extractor: class {
                static extract(content) {
                    return content.match(/[\w-/:]+(?<!:)/g) || []
                }
            },
            extensions: ['html']
        }   
    ]
}
