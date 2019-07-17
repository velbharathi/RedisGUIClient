
/**
 * bulk string to json parser - 
 * 
 * IS ONLY IMPLEMENTED TO PARSE `INFO` DATA
 *
 * @param {Stirg} bulkStr
 * @param {String|RegExp} delimiter
 * @param {String|RegExp} lineDelimiter
 * @returns {JSON}
 */
function parser(bulkStr, delimiter, lineDelimiter){
    let json = {};
    let str = bulkStr.split(delimiter);
    console.log(str)
    let val = str.filter(each=>each.trim())
    console.log("valur after tirm", val)
    let label = null
    val.forEach(line=> {
        if(line.startsWith("#")){
            label = line.split(" ")[1].toLowerCase()
        }else{
            let next = line.split(lineDelimiter);
            let nextValue;
            if(!isNaN(next[1])){
                nextValue = (+next[1]);
            }else{
                console.log("next",next)
                nextValue = next[1].includes(",")? parser(next[1], ",", "=") : next[1];
            }
            if(label){
                json[label] = {...json[label], [next[0]]:nextValue}
            }else{
                json = {...json, [next[0]]:nextValue}
            }
            
        }
    })
    console.log(json);
    return json;
}

module.exports = parser;