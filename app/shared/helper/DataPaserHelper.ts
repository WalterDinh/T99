class DataParserHelper {

    parseNumber = (source: any): number => {
        if(typeof source === 'string') {
            const result = parseInt(source);
            if(isNaN(result)) {
                throw Error('Invalid data source for parseNumber: ' + source);
            }
            return result;
        }
        if (typeof source === 'number') return source;
        throw Error('Invalid data source for parseNumber: ' + source);
    }

    parseNumberNullable = (source: any): number | undefined => {
        if (source === undefined || source === null) return undefined;
        return this.parseNumber(source);
    }

    parseString = (source: any): string => {
        if (typeof source === 'string') return source;
        if (typeof source === 'number') return `${source}`;
        throw Error('Invalid data source for parseString: ' + source);
    }

    parseStringNullable = (source: any): string | undefined => {
        if (source === undefined || source === null) return undefined;
        return this.parseString(source);
    }
}

export default new DataParserHelper();